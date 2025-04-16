import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import CreatePostForm from "@/components/CreatePostForm";
import PostCard from "@/components/PostCard";
import { posts as initialPosts } from "@/data/mockData";
import FloatingIsland from "@/components/FloatingIsland";
import SoundToggle from "@/components/SoundToggle";
import MinecraftInventory from "@/components/MinecraftInventory";

const Index: React.FC = () => {
  const [posts, setPosts] = useState(initialPosts);

  const handleNewPost = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  return (
    <div className="min-h-screen relative">
      <div 
        className="fixed inset-0 z-0" 
        style={{ 
          // backgroundImage: 'url(/background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: '0.15' // Adjust opacity as needed
        }} 
      />
      <div className="relative z-10">
        <Navigation />
        
        <main className="container mx-auto px-4 py-6 pt-24 md:pt-6 relative z-20">
          <div className="flex justify-end mb-4">
            <SoundToggle />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left sidebar */}
            <div className="hidden md:block">
              <MinecraftInventory />
            </div>
            
            {/* Main content */}
            <div className="md:col-span-2">
              <CreatePostForm onPost={handleNewPost} />
              
              {posts.map((post, index) => (
                <div 
                  key={post.id}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  className="animate-block-build"
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
