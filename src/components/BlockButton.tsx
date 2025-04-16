
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { playClickSound } from "@/utils/soundEffects";

interface BlockButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "grass" | "stone" | "dirt" | "wood";
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  soundEffect?: "click" | "place" | "break" | "pop" | "none";
}

const BlockButton: React.FC<BlockButtonProps> = ({ 
  children, 
  className, 
  variant = "primary", 
  size = "md",
  animated = true,
  soundEffect = "click",
  onClick,
  ...props 
}) => {
  const [isPressed, setIsPressed] = useState(false);
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Play sound effect
    if (soundEffect !== "none") {
      playClickSound();
    }
    
    // Trigger animation
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200);
    
    // Call original onClick handler
    if (onClick) onClick(e);
  };
  
  const baseClasses = "relative font-minecraft transition-transform active:translate-y-1 focus:outline-none minecraft-interact";
  
  const variantClasses = {
    primary: "bg-minecraft-stone text-white hover:bg-minecraft-stone/90",
    secondary: "bg-minecraft-dirt text-white hover:bg-minecraft-dirt/90",
    accent: "bg-minecraft-diamond text-white hover:bg-minecraft-diamond/90",
    grass: "bg-minecraft-grass text-white hover:bg-minecraft-grass/90",
    stone: "bg-minecraft-stone text-white hover:bg-minecraft-stone/90",
    dirt: "bg-minecraft-dirt text-white hover:bg-minecraft-dirt/90",
    wood: "bg-minecraft-wood text-white hover:bg-minecraft-wood/90",
  };
  
  const sizeClasses = {
    sm: "text-xs px-3 py-1",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3",
  };
  
  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        "border-2 border-black pixel-shadow",
        animated && "active-press hover-grow",
        isPressed && "transform scale-95",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute inset-0 border-t-2 border-l-2 border-white/30 border-r-2 border-b-2 border-black/50"></span>
    </button>
  );
};

export default BlockButton;
