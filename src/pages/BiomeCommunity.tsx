import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from "@/components/Navigation";
import PixelCard from "@/components/PixelCard";
import PostCard from "@/components/PostCard";
import CreatePostForm from "@/components/CreatePostForm";
import BlockButton from "@/components/BlockButton";
import { biomes, posts as allPosts, currentUser, users } from "@/data/mockData";
import { Users, MessageSquare, Star, Share2 } from "lucide-react";
import { playClickSound } from "@/utils/soundEffects";
import { useToast } from "@/hooks/use-toast";
import type { Post, Biome, User } from "@/types";

const BiomeCommunity: React.FC = () => {
  const { biomeId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isMember, setIsMember] = useState(false);
  
  const biome = biomes.find(b => b.id === biomeId);

  useEffect(() => {
    if (!biome) {
      navigate('/biomes');
      return;
    }
    // Filter posts for this biome (simulated)
    const biomePosts = allPosts.filter(() => Math.random() > 0.5);
    setPosts(biomePosts);
  }, [biomeId, biome, navigate]);

  const handleNewPost = (post: Post) => {
    setPosts(prev => [post, ...prev]);
    playClickSound();
  };

  const handleJoinLeave = () => {
    playClickSound();
    setIsMember(!isMember);
    toast({
      title: isMember ? "Left Realm" : "Joined Realm",
      description: isMember 
        ? `You have left ${biome?.name}` 
        : `Welcome to ${biome?.name}!`,
    });
  };

  const handleShare = () => {
    playClickSound();
    // Simulate share functionality
    toast({
      title: "Share Link Copied!",
      description: "Invite link has been copied to clipboard.",
    });
  };

  if (!biome) return null;

  return (
    <div className="min-h-screen relative">
      <div 
        className="fixed inset-0 z-0" 
        style={{ 
          // backgroundImage: 'url(/background.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: '1'
        }} 
      />
      <div className="relative z-10">
        <Navigation />
        <main className="container mx-auto px-4 py-6">
          {/* Biome Header */}
          <PixelCard className="mb-6 overflow-hidden">
            <div 
              className="h-48 bg-cover bg-center border-b-2 border-black" 
              style={{ backgroundImage: `url(${biome.imageUrl})` }}
            >
              <div className="w-full h-full bg-black/30 flex items-center justify-center">
                <h1 className="font-minecraft text-4xl text-white drop-shadow-lg">{biome.name}</h1>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2 text-minecraft-grass" />
                    <span className="font-minecraft">{biome.membersCount.toLocaleString()}</span>
                    <span className="ml-1 text-gray-600">members</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-minecraft-grass" />
                    <span className="font-minecraft">{biome.postsCount.toLocaleString()}</span>
                    <span className="ml-1 text-gray-600">posts</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <BlockButton
                    variant={isMember ? "stone" : "grass"}
                    onClick={handleJoinLeave}
                    className="flex items-center"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    {isMember ? 'Leave Realm' : 'Join Realm'}
                  </BlockButton>
                  <BlockButton
                    variant="stone"
                    onClick={handleShare}
                    className="flex items-center"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </BlockButton>
                </div>
              </div>
              
              <p className="mt-4 text-lg">{biome.description}</p>
              
              {/* Active Members */}
              <div className="mt-6">
                <h3 className="font-minecraft text-sm mb-2">Active Members</h3>
                <div className="flex -space-x-2 overflow-hidden">
                  {users.slice(0, 5).map(user => (
                    <img
                      key={user.id}
                      src={user.avatarUrl}
                      alt={user.username}
                      className="w-8 h-8 rounded-full border-2 border-white inline-block"
                      style={{ imageRendering: "pixelated" }}
                    />
                  ))}
                  {biome.membersCount > 5 && (
                    <div className="w-8 h-8 rounded-full bg-minecraft-stone/20 border-2 border-white flex items-center justify-center">
                      <span className="text-xs font-minecraft">+{biome.membersCount - 5}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </PixelCard>

          {/* Posts Section */}
          <div className="max-w-2xl mx-auto">
            {isMember && <CreatePostForm onPost={handleNewPost} />}
            
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <PixelCard className="p-6 text-center">
                <p className="mb-4 font-minecraft">No posts in this realm yet!</p>
                {isMember ? (
                  <BlockButton variant="grass" onClick={() => document.querySelector('textarea')?.focus()}>
                    Create First Post
                  </BlockButton>
                ) : (
                  <BlockButton variant="grass" onClick={handleJoinLeave}>
                    Join to Post
                  </BlockButton>
                )}
              </PixelCard>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default BiomeCommunity; 