import React from "react";
import Messaging from "../components/messaging";
import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";

const MessagingPage: React.FC = () => {
  return (
    <div className="flex h-screen">
 
      <div className="w-20 bg-white border-r border-gray-300">
        <SideBar />
      </div>

  
      <div className="flex-1 flex flex-col">
       
        <div className="p-4 ">
          <SearchBar />
        </div>
        <Messaging/>
      </div>
      
    </div>
  );
};

export default MessagingPage;
