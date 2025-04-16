import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, MessageSquare, Users, Bell, User } from "lucide-react";
import { playClickSound } from "@/utils/soundEffects";

const MinecraftHotbar: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState(0);
  
  const hotbarItems = [
    { icon: <Home className="w-6 h-6" />, label: "Home", path: "/" },
    { icon: <MessageSquare className="w-6 h-6" />, label: "Messages", path: "/messages" },
    { icon: <Users className="w-6 h-6" />, label: "Biomes", path: "/biomes" },
    { icon: <Bell className="w-6 h-6" />, label: "Notifications", path: "/notifications" },
    { icon: <User className="w-6 h-6" />, label: "Profile", path: "/profile" },
  ];
  
  const handleItemClick = (index: number) => {
    setSelectedSlot(index);
    playClickSound();
    navigate(hotbarItems[index].path);
  };
  
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 select-none hidden md:block">
      <div className="bg-black/70 border-2 border-black rounded-md p-1 flex">
        {hotbarItems.map((item, index) => (
          <div 
            key={index}
            className={`relative w-16 h-16 m-1 flex flex-col items-center justify-center bg-gray-800/80 border-2 
              ${selectedSlot === index ? 'border-white' : 'border-gray-600'} 
              minecraft-interact hover:bg-gray-700/80`}
            onClick={() => handleItemClick(index)}
          >
            <div className="text-white">
              {item.icon}
            </div>
            <span className="text-white text-xs mt-1 font-minecraft">{item.label}</span>
            {selectedSlot === index && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MinecraftHotbar;
