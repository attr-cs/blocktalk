import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PixelCard from "./PixelCard";
import BlockButton from "./BlockButton";
import { Users, Info } from "lucide-react";
import { playClickSound } from "@/utils/soundEffects";
import { useToast } from "@/hooks/use-toast";
import type { Biome } from "@/types";

interface BiomeCardProps {
  biome: Biome;
}

const BiomeCard: React.FC<BiomeCardProps> = ({ biome }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleJoinRealm = (e: React.MouseEvent) => {
    e.preventDefault();
    playClickSound();
    
    toast({
      title: "Joining Realm!",
      description: `Welcome to ${biome.name}!`,
    });

    // Navigate immediately without setTimeout
    navigate(`/biomes/${biome.id}`);
  };

  return (
    <PixelCard 
      className="overflow-hidden animate-block-build h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="h-32 bg-cover bg-center border-b-2 border-black transition-transform duration-300"
        style={{ 
          backgroundImage: `url(${biome.imageUrl})`,
          transform: isHovered ? 'scale(1.05)' : 'scale(1)'
        }}
      >
        <div className="w-full h-full bg-black/30 flex items-center justify-center">
          <h3 className="font-minecraft text-xl text-white drop-shadow-lg">{biome.name}</h3>
        </div>
      </div>
      
      <div className="p-4 flex-grow">
        <p className="text-sm mb-4">{biome.description}</p>
        
        <div className="flex items-center space-x-2 text-sm mb-2">
          <Users className={`w-4 h-4 ${isHovered ? 'text-minecraft-grass' : ''}`} />
          <span>{biome.membersCount.toLocaleString()} members</span>
        </div>
        
        <div className="text-sm text-gray-600 mb-4">
          {biome.postsCount.toLocaleString()} posts
        </div>
      </div>
      
      <div className="p-4 border-t-2 border-black mt-auto">
        <BlockButton 
          variant="grass" 
          className="w-full transition-transform duration-200 active:scale-95"
          onClick={handleJoinRealm}
        >
          Join Realm
        </BlockButton>
      </div>
    </PixelCard>
  );
};

export default BiomeCard;
