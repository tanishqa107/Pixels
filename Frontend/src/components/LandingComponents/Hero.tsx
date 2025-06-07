import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ImagesSlider } from '../ui/images-slider';
import { motion } from "motion/react";
import { BackgroundLines } from '../ui/bg-lines';
import { useNavigate } from 'react-router-dom';

const Hero: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate()

  const handleGetStarted = () => {
    setShowModal(true);
  };

  const handleSubmit = async () => {
    if (!username.trim()) {
      setError("Username cannot be empty.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/create-username", { username });
      if(response.status === 201){
        navigate("/homepage")
        localStorage.setItem("username2",username);
      }
      setShowModal(false);
      setUsername("");
      setError("");
    } catch (err: any) {
      if (err.response?.status === 409) {
        setError("Username already exists. Please choose another.");
      } else {
        setError("Something went wrong. Try again.");
      }

      
    }

    
  };

  // ✅ Disable scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [showModal]);

  const images = [
    "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <section id='home' className="pt-24 md:pt-12 md:pb-24">
      <div className="container mx-auto px-4">
        <div  className="max-w-4xl mx-auto text-center">
          <BackgroundLines className="flex items-center justify-center gap-5 w-full flex-col px-4">
            <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
              Get your next Creative Idea
            </h2>
            <p   id='startbtn' className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
              Discover recipes, home inspiration, style ideas and other ideas to try.
            </p>
          </BackgroundLines>
          <button
        
            onClick={handleGetStarted}
            className="w-full sm:w-auto px-8 py-3 rounded-full bg-white text-black hover:bg-gray-200 hover:cursor-pointer transition-all font-medium text-lg"
          >
            Get Started
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16">
        <ImagesSlider className="h-[40rem]" images={images}>
          <motion.div
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="z-50 flex flex-col justify-center items-center"
          >
            {/* Optional content here */}
          </motion.div>
        </ImagesSlider>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[90%] max-w-md">
            <h3 className="text-xl font-semibold mb-4">Create Username</h3>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              className="w-full px-4 py-2 border rounded-lg mb-2"
              placeholder="Your username"
            />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => {
                  setShowModal(false);
                  setUsername("");
                  setError("");
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-black text-white rounded hover:cursor-pointer"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
