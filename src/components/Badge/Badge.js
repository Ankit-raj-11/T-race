import { Lock } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

// Hook to detect reduced motion preference
function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

export default function Badge({
  badge,
  showTooltip = false,
  isUnlocked = false,
  isNewlyUnlocked = false,
  progress,
  animationEnabled = true,
  /** When isNewlyUnlocked animation completes, this will be called */
  onAnimationComplete,
  onClick
}) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const badgeRef = useRef(null);

  // Respect user's motion preferences
  const shouldAnimate = animationEnabled && !prefersReducedMotion;

  // Handle animation completion
  useEffect(() => {
    const badgeElement = badgeRef.current;
    if (!badgeElement || !onAnimationComplete) return;

    const handleAnimationEnd = (event) => {
      // Only trigger for animations on this specific element
      if (event.target === badgeElement) {
        onAnimationComplete(event.animationName, badge);
      }
    };

    badgeElement.addEventListener('animationend', handleAnimationEnd);

    return () => {
      badgeElement.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [onAnimationComplete, badge]);

  // Generate tooltip content
  const getTooltipContent = () => {
    if (!showTooltip) return null;

    return JSON.stringify({
      name: badge.name,
      description: badge.description,
      criteria: badge.criteria,
      rarity: badge.rarity,
      isUnlocked,
      progress
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    onClick?.(badge);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  // Base classes for the badge container with optimized transitions
  const baseClasses =
    'relative flex flex-col items-center p-4 rounded-lg border cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50 will-change-transform';

  // Enhanced styling for unlocked badges with glow effects and full color display
  const unlockedClasses = isUnlocked
    ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-gray-600 shadow-lg shadow-cyan-400/10 backdrop-blur-sm'
    : '';

  // Enhanced styling for locked badges with greyscale/dimmed appearance
  const lockedClasses = !isUnlocked
    ? 'bg-gray-900/20 border-gray-800/50 opacity-50 grayscale contrast-75'
    : '';

  // Smooth transitions for all states (optimized for 60fps)
  const transitionClasses = 'transition-all duration-300 ease-out';

  const hoverClasses =
    isHovered && isUnlocked && shouldAnimate ? 'border-cyan-400 shadow-xl shadow-cyan-400/25' : '';

  // Bouncing animation for newly unlocked badges
  const bounceClasses = isNewlyUnlocked && shouldAnimate ? 'badge-bounce' : '';

  return (
    <div
      ref={badgeRef}
      className={`${baseClasses} ${transitionClasses} ${unlockedClasses} ${lockedClasses} ${hoverClasses} ${bounceClasses}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${badge?.name || 'Badge'} - ${isUnlocked ? 'Unlocked' : 'Locked'}${
        badge?.description ? `. ${badge.description}` : ''
      }`}
      data-tooltip-id="badge-tooltip"
      data-tooltip-content={getTooltipContent()}
      style={{
        // CSS custom properties for enhanced performance
        '--badge-glow': isUnlocked ? 'rgba(34, 211, 238, 0.15)' : 'transparent',
        '--badge-scale': isHovered && isUnlocked && shouldAnimate ? '1.05' : '1'
      }}
    >
      {/* Badge Icon/Image with enhanced styling */}
      <div
        className={`w-16 h-16 mb-3 rounded-full flex items-center justify-center transition-all duration-300 ${
          isUnlocked
            ? 'bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-400/30'
            : 'bg-gray-700/50 grayscale brightness-50'
        } ${
          isHovered && isUnlocked && shouldAnimate
            ? 'shadow-xl shadow-cyan-400/50 brightness-110'
            : ''
        }`}
      >
        {badge?.iconUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={badge.iconUrl}
            alt={badge.name}
            className={`w-10 h-10 transition-all duration-300 ${
              !isUnlocked
                ? 'grayscale opacity-40 brightness-75'
                : isHovered && shouldAnimate
                  ? 'brightness-110 drop-shadow-lg'
                  : 'brightness-100'
            }`}
          />
        ) : (
          <div
            className={`text-2xl transition-all duration-300 ${
              isUnlocked
                ? isHovered && shouldAnimate
                  ? 'text-white drop-shadow-lg scale-110'
                  : 'text-white'
                : 'text-gray-500 opacity-60'
            }`}
          >
            {isUnlocked ? '🏆' : <Lock size={24} />}
          </div>
        )}
      </div>

      {/* Badge Name with enhanced styling */}
      <h3
        className={`text-sm font-semibold text-center mb-1 transition-all duration-300 ${
          isUnlocked
            ? isHovered && shouldAnimate
              ? 'text-cyan-300 drop-shadow-sm'
              : 'text-white'
            : 'text-gray-500 opacity-70'
        }`}
      >
        {badge?.name || 'Badge Name'}
      </h3>

      {/* Badge Rarity Indicator with enhanced styling */}
      {badge?.rarity && (
        <div
          className={`text-xs px-2 py-1 rounded-full transition-all duration-300 ${
            isUnlocked
              ? badge.rarity === 'legendary'
                ? 'bg-yellow-500/30 text-yellow-300 shadow-sm shadow-yellow-400/20'
                : badge.rarity === 'epic'
                  ? 'bg-purple-500/30 text-purple-300 shadow-sm shadow-purple-400/20'
                  : badge.rarity === 'rare'
                    ? 'bg-blue-500/30 text-blue-300 shadow-sm shadow-blue-400/20'
                    : 'bg-gray-500/30 text-gray-300 shadow-sm shadow-gray-400/20'
              : 'bg-gray-700/20 text-gray-600 opacity-50'
          } ${isHovered && isUnlocked && shouldAnimate ? 'brightness-125 shadow-md' : ''}`}
        >
          {badge.rarity}
        </div>
      )}

      {/* Enhanced Unlock Glow Effect */}
      {isUnlocked && (
        <div
          className={`absolute inset-0 rounded-lg pointer-events-none transition-all duration-300 ${
            isHovered && shouldAnimate
              ? 'bg-gradient-to-br from-cyan-400/20 to-blue-500/20 shadow-inner'
              : 'bg-gradient-to-br from-cyan-400/8 to-blue-500/8'
          }`}
        />
      )}

      {/* Pulse Animation Overlay for Hover Effect */}
      {isUnlocked && isHovered && shouldAnimate && (
        <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyan-400/5 to-blue-500/5 animate-pulse pointer-events-none" />
      )}
    </div>
  );
}
