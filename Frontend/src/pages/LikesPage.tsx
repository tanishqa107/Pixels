import React from "react";
import Likes from "../components/Likes";
import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";

const CreatePinPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-20 bg-white border-r border-gray-300">
        <SideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Search Bar */}
        <div className="p-4">
          <SearchBar />
        </div>

        {/* Scrollable content container */}
        <div className="flex-1 overflow-y-auto p-4 bg-black">
          <Likes />
        </div>
      </div>
    </div>
  );
};

export default CreatePinPage;
