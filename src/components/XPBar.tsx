
import React from "react";

interface XPBarProps {
  level: number;
  progress: number; // 0 to 100
}

const XPBar: React.FC<XPBarProps> = ({ level, progress }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1">
        <span className="font-minecraft text-sm text-minecraft-grass">Level {level}</span>
        <span className="font-minecraft text-xs">{progress}%</span>
      </div>
      <div className="h-4 bg-black/60 border-2 border-black relative">
        <div 
          className="h-full bg-minecraft-grass transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default XPBar;
