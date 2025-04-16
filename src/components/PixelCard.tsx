
import React from "react";
import { cn } from "@/lib/utils";

interface PixelCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "grass" | "stone" | "dirt" | "wood" | "water";
  padding?: "none" | "sm" | "md" | "lg";
  border?: boolean;
  shadow?: boolean;
}

const PixelCard: React.FC<PixelCardProps> = ({ 
  children, 
  className, 
  variant = "default", 
  padding = "md", 
  border = true,
  shadow = true,
  ...props 
}) => {
  const baseClasses = "relative";
  
  const variantClasses = {
    default: "bg-white",
    grass: "bg-minecraft-grass",
    stone: "bg-minecraft-stone",
    dirt: "bg-minecraft-dirt",
    wood: "bg-minecraft-wood",
    water: "bg-minecraft-water",
  };
  
  const paddingClasses = {
    none: "p-0",
    sm: "p-2",
    md: "p-4",
    lg: "p-6",
  };
  
  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        paddingClasses[padding],
        border && "border-2 border-black",
        shadow && "pixel-shadow",
        className
      )}
      {...props}
    >
      {children}
      {border && (
        <span className="absolute inset-0 border-t-2 border-l-2 border-white/30 border-r-2 border-b-2 border-black/20 pointer-events-none"></span>
      )}
    </div>
  );
};

export default PixelCard;
