import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import multer from 'multer';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios'
import { WebSocketServer } from "ws";
import http from "http";

dotenv.config();

const app = express();
app.use(express.json()); 
app.use(cors());

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!,{
    auth: { persistSession: false },
})

const upload = multer({ storage: multer.memoryStorage() });


//@ts-ignore
app.post("/api/v1/store-content", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const { title, description, link, board, tag, username } = req.body;

    const file = req.file;
    const fileName = `${Date.now()}_${file.originalname}`;

    const { data, error } = await supabase.storage
      .from("photosandvideos")
      .upload(`public/${fileName}`, file.buffer, {
        contentType: file.mimetype,
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from("photosandvideos")
      .getPublicUrl(`public/${fileName}`);

    await supabase.from("metadata").insert([
      {
        file_name: fileName,
        file_url: publicUrlData.publicUrl,
        title,
        description,
        link,
        board,
        tag,
        username, 
        uploaded_at: new Date(),
      },
    ]);

    res.status(200).json({ publicUrl: publicUrlData.publicUrl });
  } catch (error) {
    console.error("Upload Failed:", error);
    res.status(500).json({ error: "File upload failed." });
  }
});

app.get("/api/v1/user-pins/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const { data, error } = await supabase
      .from("metadata")
      .select("*")
      .eq("username", username);

    if (error) throw error;

    res.status(200).json({ pins: data });
   
  } catch (error) {
    console.error("Fetch pins error:", error);
    res.status(500).json({ error: "Failed to fetch user pins" });
  }
});




app.get("/api/v1/get-content", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("metadata")
            .select("file_url, file_name, title, description,link,board, uploaded_at");

        if (error) throw error;

        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching videos:", error);
        res.status(500).json({ error: "Failed to fetch videos" });
    }
});


app.get("/api/pexels", async (req, res) => {
    const page = req.query.page || 1;
  try {
     const response = await axios.get(`https://api.pexels.com/v1/curated?page=${page}&per_page=30`, {
      headers: {
        Authorization: process.env.API_KEY,
      },
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch from Pexels" });
  }
});


//@ts-ignore
app.post('/api/create-username', async (req, res) => {
  const { username } = req.body;

  if (!username || username.trim() === '') {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const { data: existingUser, error: selectError } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .maybeSingle()

    if (selectError) {
      console.error(selectError);
      return res.status(500).json({ error: 'Error checking username' });
    }

    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const { data: insertedUsers, error: insertError } = await supabase
      .from('users')
      .insert([{ username }])
      .select(); 

    if (insertError || !insertedUsers || insertedUsers.length === 0) {
      return res.status(500).json({ error: 'Failed to create username' });
    }

    return res.status(201).json({
      message: 'Username created successfully',
      user: insertedUsers[0],
    });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

//@ts-ignore
app.get("/api/v1/get-users", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('username');

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ users: data });
  } catch (err) {
    console.error("Server Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});



const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const clients = new Map();

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", async (data) => {
  try {
    const parsed = JSON.parse(data.toString());
    const { from, to, message } = parsed;

    // Save to Supabase
    await supabase.from("messages").insert([{ from, to, message }]);

    // Forward the message
    for (let [clientUsername, clientWs] of clients.entries()) {
      if (clientUsername === to && clientWs.readyState === ws.OPEN) {
        clientWs.send(JSON.stringify({ from, message }));
      }
    }
  } catch (err) {
    console.error("Invalid message format:", err);
  }
});

  ws.on("close", () => {
    for (let [key, clientWs] of clients.entries()) {
      if (clientWs === ws) {
        clients.delete(key);
        break;
      }
    }
    console.log("Client disconnected");
  });

  const fakeUsername = "user_" + Math.floor(Math.random() * 1000);
  clients.set(fakeUsername, ws);
  console.log("Client registered as:", fakeUsername);
});



//@ts-ignore
app.get("/api/v1/messages/:user1/:user2", async (req, res) => {
  const { user1, user2 } = req.params;

  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .or(`from.eq.${user1},from.eq.${user2}`)
    .or(`to.eq.${user1},to.eq.${user2}`)
    .order("timestamp", { ascending: true });

  if (error) return res.status(500).json({ error });
  res.json({ messages: data });
});



server.listen(3000, ()=>{
    console.log("Server is running on PORT 3000")
})