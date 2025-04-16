import React, { useState } from "react";
import PixelCard from "./PixelCard";
import Avatar from "./Avatar";
import { Heart, MessageSquare, Share } from "lucide-react";
import { Post } from "@/data/mockData";
import { formatDistanceToNow } from "date-fns";
import { playLikeSound, playPopSound } from "@/utils/soundEffects";
import { useToast } from "@/hooks/use-toast";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [liked, setLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showAnimation, setShowAnimation] = useState(false);
  const { toast } = useToast();

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
      playPopSound();
    } else {
      setLikesCount(likesCount + 1);
      playLikeSound();
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 700);
    }
    setLiked(!liked);
  };

  const handleShare = () => {
    playPopSound();
    toast({
      title: "Shared!",
      description: "Post has been shared to your timeline.",
    });
  };

  const handleComment = () => {
    playPopSound();
    toast({
      title: "Comments",
      description: "Comment functionality coming soon!",
    });
  };

  // Add fallback for missing avatar
  const avatarUrl = post.avatarUrl || "/images/avatars/minecraft_steve.png";

  return (
    <PixelCard className="mb-6 overflow-hidden animate-block-build w-full max-w-2xl mx-auto relative">
      {showAnimation && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="minecraft-pop w-20 h-20 flex items-center justify-center">
            <Heart className="fill-red-500 text-red-500 w-12 h-12" />
          </div>
        </div>
      )}
      
      <div className="flex items-start p-4">
        <Avatar 
          src={avatarUrl} 
          alt={post.username} 
          className="mr-3 hover-grow"
          onError={(e) => {
            // If avatar fails to load, use fallback
            const target = e.target as HTMLImageElement;
            target.src = "/images/avatars/minecraft_steve.png";
          }}
        />
        <div>
          <div className="flex items-center">
            <h3 className="font-minecraft text-sm">{post.username}</h3>
            <span className="mx-2 text-gray-500">•</span>
            <span className="text-gray-500 text-xs">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </span>
          </div>
          <p className="my-2">{post.content}</p>
        </div>
      </div>

      {post.imageUrl && (
        <div className="border-t-2 border-b-2 border-black minecraft-interact">
          <img 
            src={post.imageUrl} 
            alt="Post content" 
            className="w-full object-cover" 
            style={{ maxHeight: "500px" }}
          />
        </div>
      )}

      <div className="p-4 flex justify-between">
        <button 
          onClick={handleLike}
          className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors minecraft-interact active-press"
        >
          <Heart className={`w-5 h-5 ${liked ? "fill-red-500 text-red-500" : ""}`} />
          <span>{likesCount}</span>
        </button>
        <button 
          onClick={handleComment}
          className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors minecraft-interact active-press"
        >
          <MessageSquare className="w-5 h-5" />
          <span>{post.comments}</span>
        </button>
        <button 
          onClick={handleShare}
          className="flex items-center space-x-1 text-gray-600 hover:text-green-500 transition-colors minecraft-interact active-press"
        >
          <Share className="w-5 h-5" />
        </button>
      </div>
    </PixelCard>
  );
};

export default PostCard;
