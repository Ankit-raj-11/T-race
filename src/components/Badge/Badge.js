import { useIntersectionObserver } from '@/hooks/intersection-observer';
import React, { useEffect, useRef, useState } from 'react';
import { BadgePic, BadgeRarity } from './BadgeHelper';

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
  unlockedAt,
  isNewlyUnlocked = false,
  progress,
  animationEnabled = true,
  /** When isNewlyUnlocked animation completes, this will be called */
  onAnimationComplete,
  onClick
}) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [badgeRef, badgeVisible] = useIntersectionObserver(
    // Start animation only when 80% of element is visible
    { threshold: 0.8 }
  );

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
  }, [onAnimationComplete, badge, badgeRef]);

  // Generate tooltip content
  const getTooltipContent = () => {
    if (!showTooltip) return null;

    return JSON.stringify({
      name: badge.name,
      description: badge.description,
      criteria: badge.criteria,
      rarity: badge.rarity,
      unlockedAt,
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
  const baseClasses = [
    'relative flex flex-col items-center p-4',
    'rounded-lg border cursor-pointer',
    'focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50',
    // Add scroll margin, so it will clear the top banner
    'will-change-transform scroll-mt-18'
  ].join(' ');

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
  const bounceClasses = badgeVisible && isNewlyUnlocked && shouldAnimate ? 'badge-bounce' : '';

  return (
    <div
      ref={badgeRef}
      id={badge.badgeId}
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
      <BadgePic
        className="mb-3"
        badge={badge}
        isUnlocked={isUnlocked}
        isHovered={isHovered}
        shouldAnimate={shouldAnimate}
      />

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
      <BadgeRarity
        badge={badge}
        isUnlocked={isUnlocked}
        isHovered={isHovered}
        shouldAnimate={shouldAnimate}
      />

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
