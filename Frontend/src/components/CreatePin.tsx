import React, { useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";

const CreatePin: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [board, setBoard] = useState("");
  const [topics, setTopics] = useState("");

  const publish = async () => {

     const username = localStorage.getItem("username2");
  

  if (!username) {
    toast.error("User not logged in.");
    return;
  }


    if (!file) {
      toast.error("Please select a an image to upload");
      return;
    }

    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (!description.trim()) {
      toast.error("Please enter a description");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("link", link);
    formData.append("board", board);
    formData.append("topics", topics);
     formData.append("username", username);

    try {
      const res = await axios.post("https://pixels-2umr.onrender.com/api/v1/store-content", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        toast.success("Image uploaded successfully");
        // Reset form if needed
        setFile(null);
        setImage(null);
        setTitle("");
        setDescription("");
        setLink("");
        setBoard("");
        setTopics("");
      }
    } catch (error) {
      toast.error("Upload failed!");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImage(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <div className="min-h-screen p-8 bg-white">
      <div className="flex justify-between items-center mb-8 border-b border-t border-gray-300 p-5">
        <h2 className="text-3xl font-semibold">Create Pin</h2>
        <div className="flex items-center gap-3">
         
          <button
            onClick={publish}
            className="bg-black hover:cursor-pointer text-white px-5 py-2 rounded-full"
          >
            Publish
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Upload Section */}
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 rounded-3xl p-4 relative h-120">
          <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full text-gray-500">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <span className="text-lg font-medium">Click to upload</span>
          </label>

          {image && (
            <>
             <img
  src={image}
  alt="Preview"
  className="absolute inset-0 w-full h-full object-cover rounded-3xl"
/>


              <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow">
                ✎
              </button>
            </>
          )}
        </div>

        {/* Form Fields */}
        <div className="flex-1 flex flex-col gap-5">
          <div>
            <label className="block font-medium text-sm mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a title"
              className="w-full p-3 border border-gray-300 rounded-xl outline-none"
            />
          </div>

          <div>
            <label className="block font-medium text-sm mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a detailed description"
              className="w-full p-3 border border-gray-300 rounded-xl outline-none h-32 resize-none"
            />
          </div>

          <div>
            <label className="block font-medium text-sm mb-1">Link</label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Add a link"
              className="w-full p-3 border border-gray-300 rounded-xl outline-none"
            />
          </div>

          <div>
            <label className="block font-medium text-sm mb-1">Board</label>
            <select
              value={board}
              onChange={(e) => setBoard(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl outline-none"
            >
              <option value="">Choose a board</option>
              <option value="travel">Travel</option>
              <option value="food">Food</option>
              <option value="design">Design</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-sm mb-1">Tagged topics (0)</label>
            <input
              type="text"
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              placeholder="Search for a tag"
              className="w-full p-3 border border-gray-300 rounded-xl outline-none"
            />
            <p className="text-sm text-gray-500 mt-1">Don’t worry, people won’t see your tags</p>
          </div>

          <button className="text-left text-sm text-gray-600 mt-3 hover:underline">
            More options ⌄
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
