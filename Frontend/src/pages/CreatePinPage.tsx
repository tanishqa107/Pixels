import React from "react";
import CreatePin from "../components/CreatePin";
import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";

const CreatePinPage: React.FC = () => {
  return (
    <div className="flex h-screen">
 
      <div className="w-20 bg-white border-r border-gray-300">
        <SideBar />
      </div>

  
      <div className="flex-1 flex flex-col">
       
        <div className="p-4 ">
          <SearchBar />
        </div>
        <CreatePin/>
      </div>
      
    </div>
  );
};

export default CreatePinPage;
