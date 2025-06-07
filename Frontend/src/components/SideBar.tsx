import { Home, Heart, Plus, MessageCircle, Compass } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SideBar: React.FC = () => {
  const navigate = useNavigate();

  // Helper component for each icon + tooltip
  const IconButton = ({
    label,
    onClick,
    children,
  }: {
    label: string;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <div
      onClick={onClick}
      className="relative p-3 hover:bg-gray-200 hover:cursor-pointer rounded-xl flex items-center justify-center group"
    >
      {children}

      {/* Tooltip */}
      <span className="
        absolute left-full ml-3
        whitespace-nowrap
        bg-gray-900 text-white text-xs rounded-md px-2 py-1
        opacity-0 group-hover:opacity-100
        pointer-events-none
        transition-opacity
        select-none
        z-10
        "
      >
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col items-center gap-8 pt-6">
      <IconButton label="Home" onClick={() => navigate("/homepage")}>
        <Home className="w-6 h-6" />
      </IconButton>

      <IconButton label="Your Pins" onClick={() => navigate("/yourpinspage")}>
        <Compass className="w-6 h-6" />
      </IconButton>

      <IconButton label="Create Pin" onClick={() => navigate("/createpinpage")}>
        <Plus className="w-6 h-6" />
      </IconButton>

      <IconButton label="Messages" onClick={() => navigate("/messagingpage")}>
        <MessageCircle className="w-6 h-6" />
      </IconButton>

      <IconButton label="Likes" onClick={() => navigate("/likespage")}>
        <Heart className="w-6 h-6" />
      </IconButton>

   
    </div>
  );
};

export default SideBar;
