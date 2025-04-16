import React, { useState } from "react";
import PixelCard from "./PixelCard";
import Avatar from "./Avatar";
import BlockButton from "./BlockButton";
import { currentUser } from "@/data/mockData";
import { Camera, Send, X } from "lucide-react";

const CreatePostForm: React.FC = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      
      // Create a preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim() && !image) return;

    // Create optimistic post
    const optimisticPost: Post = {
      id: `temp-${Date.now()}`,
      userId: currentUser.id,
      username: currentUser.username,
      avatarUrl: currentUser.avatarUrl,
      content: content,
      imageUrl: imagePreview || undefined,
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
      isLiked: false
    };

    // Add to posts list immediately (you'll need to implement this with your state management)
    // For example, if using a context or state management:
    // addPost(optimisticPost);
    
    // Reset form
    setContent("");
    setImage(null);
    setImagePreview(null);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  return (
    <PixelCard className="mb-6 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="flex p-4">
          <Avatar src={currentUser.avatarUrl} alt={currentUser.username} className="mr-3" />
          <div className="flex-grow">
            <textarea
              className="w-full border-2 border-black p-3 h-24 focus:outline-none focus:ring-2 focus:ring-minecraft-grass"
              placeholder="What's on your mind, miner?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
            
            {imagePreview && (
              <div className="relative mt-2 border-2 border-black">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="max-h-48 max-w-full mx-auto" 
                />
                <button 
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="border-t-2 border-black p-4 flex justify-between items-center">
          <label className="flex items-center text-gray-600 hover:text-minecraft-grass transition-colors">
            <Camera className="w-5 h-5 mr-1" />
            <span className="text-sm">Add Image</span>
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageChange}
            />
          </label>
          
          <BlockButton 
            type="submit" 
            variant="grass" 
            disabled={!content.trim() && !image}
            className="flex items-center"
          >
            <Send className="w-4 h-4 mr-2" />
            Post
          </BlockButton>
        </div>
      </form>
    </PixelCard>
  );
};

export default CreatePostForm;
