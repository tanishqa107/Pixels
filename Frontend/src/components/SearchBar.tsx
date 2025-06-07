import { useState, useEffect } from "react";

const SearchBar: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username2");
    setUsername(storedUsername);
  }, []);

  // Function to get initials from username
  const getInitials = (name: string | null) => {
    if (!name) return "?";
    const parts = name.split(" ");
    if (parts.length === 1) return name.charAt(0).toUpperCase();
    return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
  };

  return (
    <div className="flex items-center justify-between gap-4 w-full px-4">
      <input
        type="text"
        placeholder="Search"
        className="flex-1 p-4 rounded-xl bg-gray-200 outline-none text-sm"
      />
      
      <div className="relative group">
        {/* Always show initials in circle */}
        <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-semibold hover:bg-gray-300 hover:cursor-pointer transition">
          {getInitials(username)}
        </button>
        
        {/* Full username appears on hover/focus for larger screens */}
        <div className="absolute right-0 top-full mt-2 px-3 py-2 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
          {username || "Anonymous"}
        </div>
        
        {/* For mobile, show username in a tooltip on click */}
        <div className="sm:hidden absolute right-0 top-full mt-2 px-3 py-2 bg-gray-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-focus:opacity-100 transition-opacity pointer-events-none">
          {username || "Anonymous"}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;