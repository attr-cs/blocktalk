
import React, { useEffect, useRef } from 'react';

interface BlockAnimationProps {
  type: 'break' | 'place' | 'pop';
  x: number;
  y: number;
  onComplete?: () => void;
}

const BlockAnimation: React.FC<BlockAnimationProps> = ({ type, x, y, onComplete }) => {
  const animationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animation = animationRef.current;
    
    if (animation) {
      const handleAnimationEnd = () => {
        if (onComplete) onComplete();
      };
      
      animation.addEventListener('animationend', handleAnimationEnd);
      
      return () => {
        animation.removeEventListener('animationend', handleAnimationEnd);
      };
    }
  }, [onComplete]);

  const getAnimationClass = () => {
    switch (type) {
      case 'break':
        return 'minecraft-break';
      case 'place':
        return 'minecraft-place';
      case 'pop':
        return 'minecraft-pop';
      default:
        return 'minecraft-pop';
    }
  };

  const getAnimationContent = () => {
    switch (type) {
      case 'break':
        return Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="absolute w-2 h-2 bg-gray-400 rounded-sm" style={{
            left: `${Math.random() * 20}px`,
            top: `${Math.random() * 20}px`,
            animationDelay: `${i * 0.05}s`
          }}></div>
        ));
      case 'place':
        return <div className="w-6 h-6 bg-minecraft-stone opacity-50"></div>;
      case 'pop':
        return <div className="w-4 h-4 bg-white rounded-full"></div>;
      default:
        return null;
    }
  };

  return (
    <div 
      ref={animationRef}
      className={`fixed z-50 pointer-events-none ${getAnimationClass()}`}
      style={{ left: x, top: y }}
    >
      {getAnimationContent()}
    </div>
  );
};

export default BlockAnimation;
