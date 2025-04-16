import React, { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import BiomeCard from "@/components/BiomeCard";
import { biomes } from "@/data/mockData";
import { Search } from "lucide-react";
import SoundToggle from "@/components/SoundToggle";

const Biomes: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBiomes, setFilteredBiomes] = useState(biomes);
  const [animatedBiomes, setAnimatedBiomes] = useState<string[]>([]);

  useEffect(() => {
    // Filter biomes based on search query
    const filtered = biomes.filter(biome => 
      biome.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      biome.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBiomes(filtered);
  }, [searchQuery]);

  useEffect(() => {
    // Animate biomes appearing one by one
    const timerIds: NodeJS.Timeout[] = [];
    
    filteredBiomes.forEach((biome, index) => {
      const timer = setTimeout(() => {
        setAnimatedBiomes(prev => [...prev, biome.id]);
      }, index * 100);
      
      timerIds.push(timer);
    });
    
    return () => {
      timerIds.forEach(id => clearTimeout(id));
    };
  }, [filteredBiomes]);

  return (
    <div className="min-h-screen relative">
      <div 
        className="fixed inset-0 z-0" 
        style={{ 
          // backgroundImage: 'url(/background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: '0.15'
        }} 
      />
      <div className="relative z-10">
        <Navigation />
        <main className="container mx-auto px-4 py-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8">
              <h1 className="font-minecraft text-3xl mb-4 md:mb-0">Explore Biomes</h1>
              
              <div className="flex items-center gap-4">
                <div className="relative w-full md:w-64">
                  <input 
                    type="text" 
                    placeholder="Search biomes..." 
                    className="w-full border-2 border-black p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-minecraft-grass"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                </div>
                
                <SoundToggle />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBiomes.map((biome) => (
                <div 
                  key={biome.id}
                  className={`transition-opacity duration-300 ${
                    animatedBiomes.includes(biome.id) ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <BiomeCard biome={biome} />
                </div>
              ))}
              
              {filteredBiomes.length === 0 && (
                <div className="col-span-3 text-center py-10">
                  <p className="font-minecraft text-lg">No biomes match your search</p>
                  <p>Try searching for different terms</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Biomes;
