
import React from "react";
import { Message } from "@/data/mockData";
import Avatar from "./Avatar";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div 
      className={cn(
        "flex items-start mb-4",
        message.isCurrentUser ? "justify-end" : "justify-start"
      )}
    >
      {!message.isCurrentUser && (
        <Avatar src={message.senderAvatar} alt={message.senderName} size="sm" className="mr-2" />
      )}
      
      <div 
        className={cn(
          "max-w-xs sm:max-w-md",
          message.isCurrentUser 
            ? "bg-minecraft-grass text-white rounded-tl-lg rounded-bl-lg rounded-br-lg" 
            : "bg-gray-100 rounded-tr-lg rounded-bl-lg rounded-br-lg",
          "p-3 pixel-shadow"
        )}
      >
        {!message.isCurrentUser && (
          <div className="font-minecraft text-xs mb-1">
            {message.senderName}
          </div>
        )}
        <p className="text-sm">{message.content}</p>
        <div className="text-xs opacity-70 mt-1 text-right">
          {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
        </div>
      </div>
      
      {message.isCurrentUser && (
        <Avatar src={message.senderAvatar} alt={message.senderName} size="sm" className="ml-2" />
      )}
    </div>
  );
};

export default ChatMessage;
