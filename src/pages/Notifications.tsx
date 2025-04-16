
import React from "react";
import Navigation from "@/components/Navigation";
import PixelCard from "@/components/PixelCard";
import Avatar from "@/components/Avatar";
import { users } from "@/data/mockData";
import { formatDistanceToNow } from "date-fns";

interface Notification {
  id: string;
  userId: string;
  type: "like" | "comment" | "follow" | "mention";
  content: string;
  timestamp: string;
  read: boolean;
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    userId: "user-2",
    type: "like",
    content: "liked your post about your new castle build",
    timestamp: "2023-04-15T15:30:00Z",
    read: false
  },
  {
    id: "notif-2",
    userId: "user-3",
    type: "comment",
    content: "commented on your post: 'That's amazing! How long did it take?'",
    timestamp: "2023-04-15T14:45:00Z",
    read: false
  },
  {
    id: "notif-3",
    userId: "user-4",
    type: "follow",
    content: "started following you",
    timestamp: "2023-04-14T20:15:00Z",
    read: true
  },
  {
    id: "notif-4",
    userId: "user-2",
    type: "mention",
    content: "mentioned you in a comment: 'You should check out @steve_miner's builds!'",
    timestamp: "2023-04-13T18:30:00Z",
    read: true
  }
];

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
  const user = users.find(u => u.id === notification.userId);
  
  if (!user) return null;
  
  return (
    <div className={`p-4 border-b border-gray-200 ${notification.read ? "" : "bg-minecraft-grass/5"}`}>
      <div className="flex items-start">
        <Avatar src={user.avatarUrl} alt={user.username} className="mr-3" />
        <div>
          <p>
            <span className="font-minecraft text-sm">{user.displayName}</span>
            {" "}
            <span>{notification.content}</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
          </p>
        </div>
      </div>
    </div>
  );
};

const Notifications: React.FC = () => {
  const unreadCount = mockNotifications.filter(n => !n.read).length;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-minecraft-grass/10 to-minecraft-stone/10">
      <Navigation />
      
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-minecraft text-3xl">Notifications</h1>
            
            {unreadCount > 0 && (
              <div className="bg-minecraft-grass text-white px-2 py-1 rounded-full text-sm font-medium">
                {unreadCount} unread
              </div>
            )}
          </div>
          
          <PixelCard>
            {mockNotifications.length > 0 ? (
              mockNotifications.map(notification => (
                <NotificationItem key={notification.id} notification={notification} />
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500">No notifications yet</p>
              </div>
            )}
          </PixelCard>
        </div>
      </main>
    </div>
  );
};

export default Notifications;
