
import React from 'react';

interface FloatingIslandProps {
  size?: 'sm' | 'md' | 'lg';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  children?: React.ReactNode;
  className?: string;
}

const FloatingIsland: React.FC<FloatingIslandProps> = ({ 
  size = 'md', 
  position = 'bottom-right',
  children,
  className
}) => {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-40 h-40'
  };
  
  const positionClasses = {
    'top-left': 'top-10 left-10',
    'top-right': 'top-10 right-10',
    'bottom-left': 'bottom-10 left-10',
    'bottom-right': 'bottom-10 right-10'
  };
  
  return (
    <div className={`fixed ${positionClasses[position]} ${sizeClasses[size]} pointer-events-none float-animation z-10 ${className}`}>
      <div className="relative w-full h-full">
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-minecraft-grass rounded-b-sm"></div>
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-minecraft-dirt rounded-b-sm"></div>
        <div className="absolute inset-x-4 bottom-0 h-1/3 bg-minecraft-stone rounded-b-sm"></div>
        {children && (
          <div className="absolute inset-0 flex items-center justify-center">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingIsland;
