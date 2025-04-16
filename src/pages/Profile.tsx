import React from "react";
import Navigation from "@/components/Navigation";
import PixelCard from "@/components/PixelCard";
import BlockButton from "@/components/BlockButton";
import PostCard from "@/components/PostCard";
import { currentUser, posts } from "@/data/mockData";
import { Calendar, MapPin, Users } from "lucide-react";
import { format } from "date-fns";

const Profile: React.FC = () => {
  // Filter posts by current user
  const userPosts = posts.filter(post => post.userId === currentUser.id);
  
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
        {/* Profile header */}
        <PixelCard className="mb-6 overflow-hidden">
          {/* Cover image */}
          <div 
            className="h-48 bg-cover bg-center border-b-2 border-black" 
            style={{ 
              backgroundImage: currentUser.backgroundUrl 
                ? `url(${currentUser.backgroundUrl})` 
                : 'url(/images/backgrounds/default.jpg)' 
            }}
          />
          
          {/* Profile info */}
          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="w-24 h-24 border-4 border-white bg-white rounded-full overflow-hidden -mt-16 mb-4 sm:mb-0 sm:mr-6 pixel-shadow">
                <img 
                  src={currentUser.avatarUrl} 
                  alt={currentUser.username} 
                  className="w-full h-full object-cover"
                  style={{ imageRendering: "pixelated" }}
                />
              </div>
              
              <div className="text-center sm:text-left">
                <h1 className="font-minecraft text-2xl">{currentUser.displayName}</h1>
                <p className="text-gray-600">@{currentUser.username}</p>
              </div>
              
              <div className="mt-4 sm:mt-0 sm:ml-auto">
                <BlockButton variant="stone">Edit Profile</BlockButton>
              </div>
            </div>
            
            {currentUser.bio && (
              <p className="mt-4">{currentUser.bio}</p>
            )}
            
            <div className="flex flex-wrap mt-4 gap-4">
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-1" />
                <span className="text-sm">Joined {format(new Date(currentUser.joinDate), 'MMMM yyyy')}</span>
              </div>
              
              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-1" />
                <span className="text-sm">
                  <span className="font-semibold">{currentUser.following}</span> Following
                </span>
                <span className="mx-1">·</span>
                <span className="text-sm">
                  <span className="font-semibold">{currentUser.followers}</span> Followers
                </span>
              </div>
            </div>
          </div>
        </PixelCard>
        
        {/* Posts */}
        <div className="max-w-2xl mx-auto">
          <h2 className="font-minecraft text-xl mb-4">Posts</h2>
          
          {userPosts.length > 0 ? (
            userPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <PixelCard className="p-6 text-center">
              <p className="mb-4">No posts yet!</p>
              <BlockButton variant="grass">Create Your First Post</BlockButton>
            </PixelCard>
          )}
        </div>
      </main>
      </div>
    </div>
  );
};

export default Profile;
