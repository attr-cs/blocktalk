import React, { useState, useRef, useEffect } from "react";
import Navigation from "@/components/Navigation";
import PixelCard from "@/components/PixelCard";
import Avatar from "@/components/Avatar";
import ChatMessage from "@/components/ChatMessage";
import BlockButton from "@/components/BlockButton";
import { messages, users, currentUser } from "@/data/mockData";
import { Search, Send } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Messages: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState(users[1]);
  const location = useLocation();
  const [messagesList, setMessagesList] = useState<Record<string, Message[]>>({
    'user-2': [
      {
        id: "msg-1",
        senderId: "user-2",
        senderName: "Alex",
        senderAvatar: "/images/avatars/minecraft_alex.png",
        content: "Hey! Want to join my survival server?",
        timestamp: new Date().toISOString(),
        isCurrentUser: false
      },
      {
        id: "msg-2",
        senderId: "user-1",
        senderName: "Steve",
        senderAvatar: "/images/avatars/minecraft_steve.png",
        content: "Sure! Send me the IP.",
        timestamp: new Date().toISOString(),
        isCurrentUser: true
      }
    ],
    'user-3': [
      {
        id: "msg-3",
        senderId: "user-3",
        senderName: "Pete",
        senderAvatar: "/images/avatars/minecraft_enderman.png",
        content: "Found some rare diamonds!",
        timestamp: new Date().toISOString(),
        isCurrentUser: false
      },
      {
        id: "msg-4",
        senderId: "user-1",
        senderName: "Steve",
        senderAvatar: "/images/avatars/minecraft_steve.png",
        content: "Nice! Where at?",
        timestamp: new Date().toISOString(),
        isCurrentUser: true
      }
    ],
    'user-4': [
      {
        id: "msg-5",
        senderId: "user-4",
        senderName: "Sam",
        senderAvatar: "/images/avatars/minecraft_creeper.png",
        content: "Sssssup?",
        timestamp: new Date().toISOString(),
        isCurrentUser: false
      },
      {
        id: "msg-6",
        senderId: "user-1",
        senderName: "Steve",
        senderAvatar: "/images/avatars/minecraft_steve.png",
        content: "Please don't explode my house again...",
        timestamp: new Date().toISOString(),
        isCurrentUser: true
      }
    ]
  });

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesList, selectedUser]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const optimisticMessage: Message = {
      id: `temp-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.displayName,
      senderAvatar: currentUser.avatarUrl,
      content: newMessage,
      timestamp: new Date().toISOString(),
      isCurrentUser: true
    };

    setMessagesList(prev => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), optimisticMessage]
    }));
      setNewMessage("");

    // Simulate response after 1 second
    setTimeout(() => {
      const responseMessage: Message = {
        id: `temp-${Date.now() + 1}`,
        senderId: selectedUser.id,
        senderName: selectedUser.displayName,
        senderAvatar: selectedUser.avatarUrl,
        content: getRandomResponse(selectedUser.username),
        timestamp: new Date().toISOString(),
        isCurrentUser: false
      };

      setMessagesList(prev => ({
        ...prev,
        [selectedUser.id]: [...(prev[selectedUser.id] || []), responseMessage]
      }));
    }, 1000);
  };

  // Helper function for random responses
  const getRandomResponse = (username: string) => {
    const responses = [
      "That's cool!",
      "Interesting...",
      "Want to go mining together?",
      "Have you found any diamonds lately?",
      "Watch out for creepers!",
      "Nice build!",
      "Want to trade some items?",
      "Did you see the new update?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };
  
  const handleUserSelect = (user) => {
    setSelectedUser(user);
    // Update URL without full page refresh
    window.history.pushState({}, '', `/messages?user=${user.id}`);
  };

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
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Contacts list */}
            <div className="md:col-span-1">
              <PixelCard className="h-[calc(100vh-150px)]">
                <div className="p-4 border-b-2 border-black">
                  <h2 className="font-minecraft text-lg">Contacts</h2>
                </div>
                
                  <div className="overflow-y-auto minecraft-scrollbar">
                    {users.filter(user => user.id !== currentUser.id).map((user) => (
                    <div 
                      key={user.id}
                      className={`flex items-center p-4 border-b border-gray-200 hover:bg-gray-50 ${
                        selectedUser.id === user.id ? 'bg-minecraft-grass/10' : ''
                      }`}
                      onClick={() => handleUserSelect(user)}
                    >
                      <Avatar src={user.avatarUrl} alt={user.username} className="mr-3" />
                      <div>
                        <h3 className="font-minecraft text-sm">{user.displayName}</h3>
                        <p className="text-xs text-gray-500">@{user.username}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </PixelCard>
            </div>
            
            {/* Chat area */}
            <div className="md:col-span-2">
              <PixelCard className="h-[calc(100vh-150px)] flex flex-col">
                <div className="p-4 border-b-2 border-black flex items-center">
                    <Avatar src={selectedUser.avatarUrl} alt={selectedUser.username} className="mr-3" />
                  <div>
                      <h2 className="font-minecraft text-lg">{selectedUser.displayName}</h2>
                      <p className="text-xs text-gray-500">@{selectedUser.username}</p>
                  </div>
                </div>
                
                  <div className="flex-grow overflow-y-auto p-4 minecraft-scrollbar">
                    {(messagesList[selectedUser.id] || []).map((message) => (
                    <ChatMessage key={message.id} message={message} />
                  ))}
                    <div ref={messagesEndRef} />
                </div>
                
                <div className="p-4 border-t-2 border-black">
                  <form onSubmit={handleSendMessage} className="flex items-center">
                    <input 
                      type="text" 
                      placeholder="Type a message..." 
                      className="flex-grow border-2 border-black p-2 focus:outline-none focus:ring-2 focus:ring-minecraft-grass"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <BlockButton 
                      type="submit" 
                      variant="grass"
                      className="ml-2"
                      disabled={!newMessage.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </BlockButton>
                  </form>
                </div>
              </PixelCard>
            </div>
          </div>
        </div>
      </main>
      </div>
    </div>
  );
};

export default Messages;
