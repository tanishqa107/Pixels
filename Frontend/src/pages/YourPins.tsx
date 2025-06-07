import React from "react";
import YourPins from "../components/YourPins";
import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";

const YourPinsPage: React.FC = () => {
  return (
    <div className="flex h-screen">
 
      <div className="w-20 bg-white border-r border-gray-300">
        <SideBar />
      </div>

  
      <div className="flex-1 flex flex-col">
     <div className="p-4">
          <SearchBar />
        </div>
        <YourPins/>
      </div>
      
    </div>
  );
};

export default YourPinsPage;
