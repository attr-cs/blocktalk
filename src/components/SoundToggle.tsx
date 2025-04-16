
import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { toggleSound, isSoundEnabled, playClickSound } from '@/utils/soundEffects';

const SoundToggle: React.FC = () => {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());

  const handleToggle = () => {
    playClickSound();
    const newState = toggleSound();
    setSoundOn(newState);
  };

  return (
    <button 
      onClick={handleToggle}
      className="bg-minecraft-stone/80 border-2 border-black p-2 rounded hover:bg-minecraft-stone transition-colors minecraft-interact active-press"
      aria-label={soundOn ? 'Mute sounds' : 'Enable sounds'}
    >
      <div className="relative">
        {soundOn ? (
          <Volume2 className="w-5 h-5 text-white" />
        ) : (
          <VolumeX className="w-5 h-5 text-white" />
        )}
        <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-500"></span>
      </div>
      <span className="sr-only">{soundOn ? 'Sound On' : 'Sound Off'}</span>
    </button>
  );
};

export default SoundToggle;
