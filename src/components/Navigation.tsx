
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home, MessageSquare, Users, Bell, User, Menu, X } from "lucide-react";
import Avatar from "./Avatar";
import { currentUser } from "@/data/mockData";
import { useIsMobile } from "@/hooks/use-mobile";

const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { icon: <Home className="w-6 h-6" />, label: "Home", path: "/" },
    { icon: <MessageSquare className="w-6 h-6" />, label: "Messages", path: "/messages" },
    { icon: <Users className="w-6 h-6" />, label: "Biomes", path: "/biomes" },
    { icon: <Bell className="w-6 h-6" />, label: "Notifications", path: "/notifications" },
    { icon: <User className="w-6 h-6" />, label: "Profile", path: "/profile" },
  ];

  const NavContent = () => (
    <>
      <div className="flex items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/images/logo.png" alt="BlockTalk" className="w-8 h-8" />
          <span className="font-minecraft text-xl text-minecraft-grass">BlockTalk</span>
        </Link>
      </div>

      <div className="flex space-x-6">
        {navItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex flex-col items-center text-gray-700 hover:text-minecraft-grass transition-colors"
          >
            {item.icon}
            <span className="text-xs mt-1 font-pixel">{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="flex items-center">
        <Link to="/profile" className="flex items-center space-x-2">
          <Avatar src={currentUser.avatarUrl} alt={currentUser.username} />
          <span className="font-minecraft text-sm hidden md:block">
            {currentUser.displayName}
          </span>
        </Link>
      </div>
    </>
  );

  // Mobile navigation
  if (isMobile) {
    return (
      <>
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b-2 border-black p-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/images/logo.png" alt="BlockTalk" className="w-8 h-8" />
              <span className="font-minecraft text-xl text-minecraft-grass">BlockTalk</span>
            </Link>
            <button onClick={toggleMobileMenu} className="p-2">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-white pt-16 animate-block-build">
            <div className="p-4 flex flex-col space-y-6">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="flex items-center space-x-4 p-2 border-b border-gray-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon}
                  <span className="font-pixel">{item.label}</span>
                </Link>
              ))}
              <Link
                to="/profile"
                className="flex items-center space-x-4 p-2 border-b border-gray-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Avatar src={currentUser.avatarUrl} alt={currentUser.username} />
                <span className="font-minecraft">{currentUser.displayName}</span>
              </Link>
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop navigation
  return (
    <nav className="sticky top-0 bg-white border-b-2 border-black p-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <NavContent />
      </div>
    </nav>
  );
};

export default Navigation;
