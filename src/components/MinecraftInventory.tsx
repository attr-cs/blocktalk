import React, { useState } from "react";
import PixelCard from "./PixelCard";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { playClickSound } from "@/utils/soundEffects";
import BlockButton from "./BlockButton";

const MinecraftInventory: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  
  const inventoryItems = [
    { id: 1, name: "Grass Block", imageUrl: "/images/blocks/grassore.webp", link: "/biomes/biome-forest" },
    { id: 2, name: "Diamond Ore", imageUrl: "/images/blocks/diamondore.jfif", link: "/biomes/biome-diamond" },
    { id: 3, name: "Oak Wood", imageUrl: "/images/blocks/woodore.jfif", link: "/biomes/biome-forest" },
    { id: 4, name: "Stone", imageUrl: "/images/blocks/stoneore.jfif", link: "/biomes/biome-mountain" },
    { id: 5, name: "Sand", imageUrl: "/images/blocks/sandore.jfif", link: "/biomes/biome-desert" },
    { id: 6, name: "Water", imageUrl: "/images/blocks/waterore.jfif", link: "/biomes/biome-ocean" },
  ];

  const handleToggleMinimize = () => {
    playClickSound();
    setIsMinimized(!isMinimized);
  };

  const handleItemClick = () => {
    playClickSound();
  };

  return (
    <PixelCard className="sticky top-24">
      <div className="p-4 border-b-2 border-black flex justify-between items-center">
        <h2 className="font-minecraft text-lg">Inventory</h2>
        <BlockButton 
          variant="stone"
          size="sm"
          onClick={handleToggleMinimize}
          className="minecraft-interact px-2 py-1"
        >
          {isMinimized ? (
            <div className="flex items-center">
              <ChevronDown className="w-4 h-4 mr-1" />
              <span className="text-xs">Show</span>
            </div>
          ) : (
            <div className="flex items-center">
              <ChevronUp className="w-4 h-4 mr-1" />
              <span className="text-xs">Hide</span>
            </div>
          )}
        </BlockButton>
      </div>
      
      {!isMinimized && (
        <>
          <div className="p-4">
            <div className="grid grid-cols-3 gap-2">
              {inventoryItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.link}
                  className="relative aspect-square border-2 border-black bg-gray-800/50 hover:bg-minecraft-stone/30 transition-colors minecraft-interact"
                  onClick={handleItemClick}
                >
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-contain p-1"
                  />
                  <div className="absolute bottom-0 right-0 text-xs bg-black/70 text-white px-1 font-minecraft">
                    {item.id}
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-4 border-t-2 border-black pt-4">
              <Link 
                to="/biomes"
                className="flex items-center justify-center font-minecraft text-sm text-minecraft-grass hover:underline active-press"
                onClick={handleItemClick}
              >
                View All Biomes
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </>
      )}
    </PixelCard>
  );
};

export default MinecraftInventory;
