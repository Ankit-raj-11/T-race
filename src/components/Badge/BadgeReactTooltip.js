import { Lock, Target, Trophy } from 'lucide-react';
import React, { useEffect } from 'react';
import { Tooltip } from 'react-tooltip';

/**
 * ReactTooltip component for badge tooltips Provides accessible tooltips for locked badges with
 * custom styling
 */
export default function BadgeReactTooltip() {
  // Handle escape key to close tooltip and return focus to trigger element
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        // Find the currently focused element or the element that triggered the tooltip
        const tooltipTrigger = document.querySelector(
          '[data-tooltip-id="badge-tooltip"]:hover, [data-tooltip-id="badge-tooltip"]:focus'
        );
        if (tooltipTrigger) {
          tooltipTrigger.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const formatCriteria = (criteria) => {
    if (!criteria) return 'Complete specific requirements';

    const { type, threshold, condition } = criteria;

    switch (type) {
      case 'wpm':
        return `Achieve ${threshold}+ words per minute`;
      case 'accuracy':
        return `Achieve ${threshold}% accuracy`;
      case 'games_played':
        return `Complete ${threshold} typing sessions`;
      case 'time_played':
        return `Play over ${threshold} minutes`;
      case 'streak':
        return `Maintain ${threshold} consecutive high-performance (>=95% accuracy) sessions`;

      default:
        return `Meet ${type} requirement: ${threshold}`;
    }
  };

  const formatProgress = ({ progress, currentValue, targetValue }) => {
    return (
      <>
        {progress != null && (
          <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 bg-gradient-to-r from-cyan-500 to-blue-500`}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        {/* {currentValue != null && targetValue != null && (
          <span>
            {currentValue} / {targetValue}
          </span>
        )} */}
      </>
    );
  };

  const renderTooltipContent = ({ content }) => {
    if (!content) return null;

    let badge;
    try {
      badge = typeof content === 'string' ? JSON.parse(content) : content;
    } catch (error) {
      console.error('Error parsing badge tooltip content:', error);
      return <div className="text-red-400 text-xs">Error loading badge information</div>;
    }

    if (!badge) return null;

    let rarityColor;
    switch (badge.rarity) {
      case 'legendary':
        rarityColor = 'text-yellow-400';
        break;
      case 'epic':
        rarityColor = 'text-purple-400';
        break;
      case 'rare':
        rarityColor = 'text-blue-400';
        break;
      default:
        rarityColor = 'text-gray-400';
        break;
    }

    return (
      <div className="relative max-w-xs">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          {badge.isUnlocked ? (
            <Trophy className={rarityColor} size={16} aria-hidden="true" />
          ) : (
            <Lock className="text-gray-400" size={16} aria-hidden="true" />
          )}

          <h4 className="font-semibold text-white text-sm">{badge.name}</h4>
        </div>

        {/* Description */}
        {badge.description && (
          <p className="text-gray-300 text-xs mb-3 leading-relaxed">{badge.description}</p>
        )}

        {/* Requirements */}
        {!badge.isUnlocked && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Target className="text-cyan-400" size={14} aria-hidden="true" />
              <span className="text-xs font-medium text-cyan-400">Requirements:</span>
            </div>
            <p className="text-gray-300 text-xs pl-5">{formatCriteria(badge.criteria)}</p>
            {/* Progress */}
            {badge.progress != null && (
              <div className="text-gray-300 text-xs pl-5">{formatProgress(badge.progress)}</div>
            )}
          </div>
        )}

        {/* Rarity */}
        {!badge.isUnlocked && badge.rarity && (
          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-700">
            <Trophy className={`${rarityColor}`} size={14} aria-hidden="true" />
            <span className="text-xs text-gray-400">Rarity:</span>
            <span className={`text-xs font-medium capitalize ${rarityColor}`}>{badge.rarity}</span>
          </div>
        )}

        {/* Keyboard hint */}
        <div className="mt-3 pt-2 border-t border-gray-700">
          <p className="text-xs text-gray-500">Press Esc to close</p>
        </div>
      </div>
    );
  };

  return (
    <Tooltip
      id="badge-tooltip"
      place="top"
      delayShow={300}
      delayHide={100}
      clickable={false}
      noArrow={false}
      render={renderTooltipContent}
      style={{
        backgroundColor: '#1f2937', // bg-gray-800
        border: '1px solid #4b5563', // border-gray-600
        borderRadius: '0.5rem', // rounded-lg
        padding: '1rem', // p-4
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', // shadow-xl
        zIndex: 50,
        maxWidth: '20rem' // max-w-xs
      }}
      className="badge-tooltip"
      role="tooltip"
      aria-live="polite"
      aria-atomic="true"
      // Additional accessibility and interaction settings
      events={['hover', 'focus']}
      positionStrategy="absolute"
      // Handle mobile touch interactions
      globalCloseEvents={{
        escape: true,
        scroll: true,
        resize: true,
        clickOutsideAnchor: true
      }}
    />
  );
}
