import { cn } from "@/lib/utils";
import React, { useState } from "react";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
  border?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  src = "/images/avatars/minecraft_steve.png",
  alt = "Avatar",
  size = "md",
  border = true,
  className,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc("/images/avatars/minecraft_steve.png");
  };

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        sizeClasses[size],
        border && "border-2 border-black pixel-shadow",
        className
      )}
      {...props}
    >
      <img
        src={imgSrc}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ imageRendering: "pixelated" }}
        onError={handleError}
      />
      {border && (
        <span className="absolute inset-0 border-t-2 border-l-2 border-white/30 border-r-2 border-b-2 border-black/20 pointer-events-none"></span>
      )}
    </div>
  );
};

export default Avatar;
