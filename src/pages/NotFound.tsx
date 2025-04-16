
import React from "react";
import { useLocation } from "react-router-dom";
import PixelCard from "@/components/PixelCard";
import BlockButton from "@/components/BlockButton";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-minecraft-dirt/10 to-minecraft-stone/20 flex items-center justify-center p-4">
      <PixelCard className="max-w-md w-full text-center p-8">
        <h1 className="font-minecraft text-4xl mb-4">404</h1>
        <div className="pixel-art mb-6 mx-auto w-24 h-24 bg-minecraft-stone border-2 border-black relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-minecraft text-white text-xl">?</span>
          </div>
          <span className="absolute inset-0 border-t-2 border-l-2 border-white/30 border-r-2 border-b-2 border-black/20"></span>
        </div>
        <p className="text-xl mb-2 font-minecraft">Chunk not found</p>
        <p className="mb-6">The page at {location.pathname} has gone missing or was never generated.</p>
        <Link to="/">
          <BlockButton variant="grass" className="mx-auto">
            Return to Home
          </BlockButton>
        </Link>
      </PixelCard>
    </div>
  );
};

export default NotFound;
