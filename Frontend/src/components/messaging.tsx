"use client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MessageCircle, ChevronLeft, Send, Loader2 } from "lucide-react";

interface Message {
  id: string;
  from: string;
  to: string;
  message: string;
  timestamp: string;
}

const username = localStorage.getItem("username2") || "anonymous";
const currentUser = username;

const Messaging = () => {
  const [users, setUsers] = useState<{ username: string }[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const socket = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch users once
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3000/api/v1/get-users");
        setUsers(res.data.users);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Setup WebSocket connection once
  useEffect(() => {
    socket.current = new WebSocket("ws://localhost:3000");

    socket.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (
          (data.from === selectedUser && data.to === currentUser) ||
          (data.from === currentUser && data.to === selectedUser)
        ) {
          setMessages((prev) => [...prev, data]);
        }
      } catch (err) {
        console.error("Failed to parse WS message", err);
      }
    };

    socket.current.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      socket.current?.close();
    };
  }, [selectedUser]);

  // Fetch chat history whenever selectedUser changes
  useEffect(() => {
    const fetchChatHistory = async () => {
      if (!selectedUser) {
        setMessages([]);
        return;
      }
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/messages/${currentUser}/${selectedUser}`
        );
        setMessages(res.data.messages);
      } catch (err) {
        console.error("Error fetching chat history:", err);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChatHistory();
  }, [selectedUser]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message handler
  const handleSendMessage = () => {
    if (!message.trim() || !selectedUser || !socket.current) return;

    const payload = {
      id: crypto.randomUUID(),
      from: currentUser,
      to: selectedUser,
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    socket.current.send(JSON.stringify(payload));
    setMessages((prev) => [...prev, payload]);
    setMessage("");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">Messages</h1>
          <p className="text-sm text-gray-500">Select a user to start chatting</p>
        </div>
        
        {loading && users.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="animate-spin h-6 w-6 text-gray-400" />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {users.map((user) => (
              <div
                key={user.username}
                onClick={() => setSelectedUser(user.username)}
                className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 ${
                  selectedUser === user.username ? "bg-blue-50" : ""
                }`}
              >
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 font-medium flex-shrink-0">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{user.username}</p>
                  <p className="text-xs text-gray-500">
                    {selectedUser === user.username ? "Active now" : "Click to chat"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 bg-white flex items-center">
              <button
                onClick={() => setSelectedUser(null)}
                className="md:hidden mr-2 p-1 rounded-full hover:bg-gray-100"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div className="flex items-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-600 font-medium flex-shrink-0">
                  {selectedUser.charAt(0).toUpperCase()}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{selectedUser}</p>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            {loading ? (
              <div className="flex-1 flex items-center justify-center">
                <Loader2 className="animate-spin h-6 w-6 text-gray-400" />
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <MessageCircle className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No messages yet</h3>
                    <p className="text-gray-500 mt-1">
                      Start the conversation with {selectedUser}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.from === currentUser ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            msg.from === currentUser
                              ? "bg-blue-600 text-white"
                              : "bg-white text-gray-800 border border-gray-200"
                          }`}
                        >
                          {msg.from !== currentUser && (
                            <p className="text-xs font-medium text-gray-500 mb-1">
                              {msg.from}
                            </p>
                          )}
                          <p className="text-sm">{msg.message}</p>
                          <p
                            className={`text-xs mt-1 ${
                              msg.from === currentUser
                                ? "text-blue-100"
                                : "text-gray-400"
                            }`}
                          >
                            {new Date(msg.timestamp).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>
            )}

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-2">
                <textarea
                  rows={1}
                  className="flex-grow border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50">
            <MessageCircle className="h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">
              Select a conversation
            </h2>
            <p className="text-gray-500 text-center max-w-md">
              Choose a user from the sidebar to start messaging or view your
              existing conversations.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messaging;