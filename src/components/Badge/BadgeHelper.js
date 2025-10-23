import { Lock } from 'lucide-react';
import React from 'react';

/** Badge Icon/Image with enhanced styling */
export function BadgePic({ className, badge, isUnlocked, isHovered, shouldAnimate }) {
  return (
    <div
      className={[
        'w-16 h-16 rounded-full',
        'flex items-center justify-center',
        'transition-all duration-300',
        isUnlocked
          ? 'bg-gradient-to-br from-cyan-400 to-blue-500 shadow-lg shadow-cyan-400/30'
          : 'bg-gray-700/50 grayscale brightness-50',
        isHovered && isUnlocked && shouldAnimate
          ? 'shadow-xl shadow-cyan-400/50 brightness-110'
          : '',
        className
      ].join(' ')}
    >
      {badge?.iconType === 'url' && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={badge.icon}
          alt={badge.name}
          className={[
            'w-10 h-10 transition-all duration-300',
            !isUnlocked ? 'grayscale opacity-40 brightness-75' : '',
            isUnlocked && isHovered && shouldAnimate
              ? 'brightness-110 drop-shadow-lg'
              : 'brightness-100'
          ].join(' ')}
        />
      )}
      {badge?.iconType === 'string' && (
        <div
          className={[
            'text-2xl transition-all duration-300',
            !isUnlocked ? 'text-gray-500 opacity-60' : '',
            isUnlocked && isHovered && shouldAnimate
              ? 'text-white drop-shadow-lg scale-110'
              : 'text-white'
          ].join(' ')}
        >
          {isUnlocked ? (badge?.icon ?? '🏆') : <Lock size={24} />}
        </div>
      )}
    </div>
  );
}

/** Badge Rarity Indicator with enhanced styling */
export function BadgeRarity({ className, badge, isUnlocked, isHovered, shouldAnimate }) {
  if (!badge?.rarity) {
    return null;
  }

  let rarityClass = '';
  if (isUnlocked) {
    switch (badge.rarity) {
      case 'legendary':
        rarityClass = 'bg-yellow-500/30 text-yellow-300 shadow-sm shadow-yellow-400/20';
        break;
      case 'epic':
        rarityClass = 'bg-purple-500/30 text-purple-300 shadow-sm shadow-purple-400/20';
        break;
      case 'rare':
        rarityClass = 'bg-blue-500/30 text-blue-300 shadow-sm shadow-blue-400/20';
        break;
      default:
        rarityClass = 'bg-gray-500/30 text-gray-300 shadow-sm shadow-gray-400/20';
        break;
    }
  }

  return (
    <div
      className={[
        'text-xs px-2 py-1 rounded-full transition-all duration-300',
        'text-nowrap',
        rarityClass,
        !isUnlocked ? 'bg-gray-700/20 text-gray-600 opacity-50' : '',
        isHovered && isUnlocked && shouldAnimate ? 'brightness-125 shadow-md' : '',
        className
      ].join(' ')}
    >
      {badge.rarity}
    </div>
  );
}
