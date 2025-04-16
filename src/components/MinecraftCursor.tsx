
import React, { useState, useEffect } from 'react';
import { Pickaxe, Hammer, Hand } from 'lucide-react';

type CursorType = 'pickaxe' | 'hammer' | 'hand';

const MinecraftCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState<CursorType>('pickaxe');
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Hide the default cursor
    document.body.style.cursor = 'none';

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Change cursor type randomly when clicking on different elements
    const handleElementClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.tagName === 'BUTTON') {
        setCursorType('hammer');
      } else if (target.tagName === 'A' || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        setCursorType('hand');
      } 
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('click', handleElementClick);

    return () => {
      document.body.style.cursor = '';
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('click', handleElementClick);
    };
  }, []);

  // Get the appropriate cursor icon based on the cursor type
  const getCursorIcon = () => {
    switch (cursorType) {
      case 'pickaxe':
        return <Pickaxe size={24} className="text-minecraft-stone" />;
      case 'hammer':
        return <Hammer size={24} className="text-minecraft-wood" />;
      case 'hand':
        return <Hand size={24} className="text-minecraft-sand" />;
      default:
        return <Pickaxe size={24} className="text-minecraft-stone" />;
    }
  };

  return (
    <div 
      className={`fixed z-[9999] pointer-events-none transition-transform duration-75 ${isClicking ? 'scale-90' : 'scale-100'}`}
      style={{ 
        left: position.x - 12, 
        top: position.y - 12,
        transform: `${isClicking ? 'scale(0.9)' : 'scale(1)'}`,
      }}
    >
      {getCursorIcon()}
    </div>
  );
};

export default MinecraftCursor;
