import { useState, useEffect } from 'react';
import soundEffects from '../utils/soundEffects';

const CountdownAnimation = ({ 
  onComplete, 
  isActive = false, 
  duration = 4000, // Total duration in ms (4 seconds for 3-2-1-Go)
  showAnimation = true,
  enableSound = true // New prop to control sound effects
}) => {
  const [currentCount, setCurrentCount] = useState(3);
  const [isVisible, setIsVisible] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('idle'); // 'idle', 'counting', 'go', 'complete'

  useEffect(() => {
    if (!isActive || !showAnimation) {
      setCurrentCount(3);
      setIsVisible(false);
      setAnimationPhase('idle');
      return;
    }

    setIsVisible(true);
    setAnimationPhase('counting');
    
    const countdownInterval = duration / 4; // Divide by 4 for 3-2-1-Go
    let timeouts = [];

    // Start with 3
    setCurrentCount(3);
    if (enableSound) soundEffects.playCountdownBeep(3);
    
    // Countdown sequence: 3 -> 2 -> 1 -> Go
    timeouts.push(setTimeout(() => {
      setCurrentCount(2);
      if (enableSound) soundEffects.playCountdownBeep(2);
    }, countdownInterval));
    
    timeouts.push(setTimeout(() => {
      setCurrentCount(1);
      if (enableSound) soundEffects.playCountdownBeep(1);
    }, countdownInterval * 2));
    
    timeouts.push(setTimeout(() => {
      setCurrentCount(0); // 0 represents "Go!"
      setAnimationPhase('go');
      if (enableSound) soundEffects.playStartSound();
    }, countdownInterval * 3));
    
    // Complete animation
    timeouts.push(setTimeout(() => {
      setAnimationPhase('complete');
      setIsVisible(false);
      onComplete?.();
    }, duration));

    // Cleanup function
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [isActive, showAnimation, duration, onComplete]);

  if (!isVisible || !showAnimation) {
    return null;
  }

  const getDisplayText = () => {
    if (currentCount > 0) return currentCount.toString();
    return "GO!";
  };

  const getAnimationClasses = () => {
    const baseClasses = "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm";
    
    if (animationPhase === 'go') {
      return `${baseClasses} animate-pulse`;
    }
    
    return baseClasses;
  };

  const getTextClasses = () => {
    const baseClasses = "font-bold select-none transition-all duration-300 ease-out";
    
    if (animationPhase === 'go') {
      return `${baseClasses} text-8xl md:text-9xl lg:text-[12rem] text-green-400 animate-bounce drop-shadow-2xl`;
    }
    
    if (currentCount === 3) {
      return `${baseClasses} text-7xl md:text-8xl lg:text-[10rem] text-red-400 animate-pulse drop-shadow-2xl`;
    }
    
    if (currentCount === 2) {
      return `${baseClasses} text-7xl md:text-8xl lg:text-[10rem] text-yellow-400 animate-pulse drop-shadow-2xl`;
    }
    
    if (currentCount === 1) {
      return `${baseClasses} text-7xl md:text-8xl lg:text-[10rem] text-orange-400 animate-pulse drop-shadow-2xl`;
    }
    
    return baseClasses;
  };

  const getGlowEffect = () => {
    if (animationPhase === 'go') {
      return "filter drop-shadow-[0_0_30px_rgba(34,197,94,0.8)] drop-shadow-[0_0_60px_rgba(34,197,94,0.4)]";
    }
    
    if (currentCount === 3) {
      return "filter drop-shadow-[0_0_30px_rgba(248,113,113,0.8)] drop-shadow-[0_0_60px_rgba(248,113,113,0.4)]";
    }
    
    if (currentCount === 2) {
      return "filter drop-shadow-[0_0_30px_rgba(250,204,21,0.8)] drop-shadow-[0_0_60px_rgba(250,204,21,0.4)]";
    }
    
    if (currentCount === 1) {
      return "filter drop-shadow-[0_0_30px_rgba(251,146,60,0.8)] drop-shadow-[0_0_60px_rgba(251,146,60,0.4)]";
    }
    
    return "";
  };

  return (
    <div className={getAnimationClasses()}>
      <div className="text-center">
        {/* Main countdown text */}
        <div className={`${getTextClasses()} ${getGlowEffect()}`}>
          {getDisplayText()}
        </div>
        
        {/* Subtitle */}
        <div className="mt-4 text-xl md:text-2xl text-gray-300 font-medium animate-fade-in">
          {animationPhase === 'go' ? 'Start Typing!' : 'Get Ready...'}
        </div>
        
        {/* Animated circles for visual enhancement */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full animate-ping opacity-60`}
              style={{
                left: `${20 + i * 12}%`,
                top: `${30 + (i % 2) * 40}%`,
                backgroundColor: animationPhase === 'go' ? '#22c55e' : 
                  currentCount === 3 ? '#f87171' :
                  currentCount === 2 ? '#facc15' : '#fb923c',
                animationDelay: `${i * 200}ms`,
                animationDuration: '2s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountdownAnimation;
