import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Biomes from "./pages/Biomes";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";
import MinecraftHotbar from "./components/MinecraftHotbar";
import { useState, useEffect } from "react";
import BiomeCommunity from './pages/BiomeCommunity';

const queryClient = new QueryClient();

const App = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/biomes" element={<Biomes />} />
            <Route path="/biomes/:biomeId" element={<BiomeCommunity />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {!isMobile && <MinecraftHotbar />}
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
