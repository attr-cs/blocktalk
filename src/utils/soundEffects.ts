// Collection of sound effects for Minecraft-themed interactions

// Volume control (0.0 to 1.0)
let soundVolume = 0.2;

export const setSoundVolume = (volume: number) => {
  soundVolume = Math.max(0, Math.min(1, volume));
};

export const getSoundVolume = () => soundVolume;

// Toggle sound on/off
let soundEnabled = true;

export const toggleSound = () => {
  soundEnabled = !soundEnabled;
  return soundEnabled;
};

export const isSoundEnabled = () => soundEnabled;

// Play sound utility function
const playSound = (url: string) => {
  if (!soundEnabled) return;
  
  const audio = new Audio(url);
  audio.volume = 0.3; // Increase volume
  
  console.log('Playing sound:', url); // Add logging
  
  audio.addEventListener('error', (e) => {
    console.error('Error playing sound:', e);
  });
  
  return audio.play().catch(error => {
    console.warn('Audio playback was prevented:', error);
  });
};

// Sound effect functions
export const playClickSound = () => playSound('/sounds/teleport.mp3');
export const playPopSound = () => playSound('/sounds/pop.mp3');
export const playPlaceSound = () => playSound('/sounds/door.mp3');
export const playBreakSound = () => playSound('/sounds/break.mp3');
export const playNotificationSound = () => playSound('/sounds/notification.mp3');
export const playLikeSound = () => playSound('/sounds/orb.mp3');
export const playWalkSound = () => playSound('/sounds/walk.mp3');
export const playEatSound = () => playSound('/sounds/eat.mp3');
export const playExperienceSound = () => playSound('/sounds/experience.mp3');
export const playDoorSound = () => playSound('/sounds/door.mp3');
export const playTeleportSound = () => playSound('/sounds/teleport.mp3');
export const playEatingSound = () => playSound('/sounds/eating.mp3');
