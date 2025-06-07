import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { LikedImagesProvider } from "./components/LikedImagesContext";

export const App: React.FC = () => {
  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');

          body, html {
            font-family: 'Poppins', sans-serif;
            overflow-x: hidden;  /* Remove horizontal scrollbar */
          }
        `}
      </style>
<LikedImagesProvider>
      <BrowserRouter>
        
          <div className="min-h-screen bg-black">
            <Toaster
              position="bottom-left"
              toastOptions={{
                className: "",
                style: {
                  background: "#333",
                  color: "#fff",
                },
              }}
            />
            <AppRoutes />
          </div>
        
      </BrowserRouter>
      </LikedImagesProvider>
    </>
  );
};

export default App;
