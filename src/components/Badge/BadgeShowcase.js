import { Filter, Grid, List, Search, Trophy } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import Badge from './Badge';
import BadgeReactTooltip from './BadgeReactTooltip';

export default function BadgeShowcase({
  allBadges = [],
  userBadges = {},
  layout = 'grid',
  showLocked = true,
  onBadgeClick,
  onBadgeAnimationComplete,
  loading = false,
  error = null
}) {
  const handleBadgeClick = (badge) => {
    onBadgeClick?.(badge);
  };

  if (loading) {
    return (
      <div className="w-full">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
          <span className="ml-3 text-gray-400">Loading badges...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-center">
          <p className="text-red-400">Failed to load badges: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Badge Grid/List */}
      {allBadges.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No badges found</h3>
        </div>
      ) : (
        <div
          className={
            layout === 'grid'
              ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'
              : 'space-y-3'
          }
        >
          {allBadges.map((badge) => {
            const userBadge = userBadges[badge.badgeId];
            const isUnlocked = userBadge?.unlocked;
            const unlockedAt = userBadge?.unlockedAt;
            const isNewlyUnlocked = isUnlocked && !userBadge?.isViewed;
            const progress =
              !isUnlocked && userBadge?.progress != null
                ? {
                    progress: userBadge.progress,
                    currentValue: userBadge.currentValue,
                    targetValue: userBadge.targetValue
                  }
                : undefined;

            return (
              <BadgeWrapper
                key={badge.badgeId}
                badge={badge}
                unlockedAt={unlockedAt}
                isUnlocked={isUnlocked}
                isNewlyUnlocked={isNewlyUnlocked}
                progress={progress}
                layout={layout}
                onClick={handleBadgeClick}
                onAnimationComplete={onBadgeAnimationComplete}
                userBadge={userBadge}
              />
            );
          })}
        </div>
      )}
      <BadgeReactTooltip />
    </div>
  );
}

// Wrapper component to handle individual badge rendering
function BadgeWrapper({
  badge,
  unlockedAt,
  isUnlocked,
  isNewlyUnlocked,
  progress,
  layout,
  onClick,
  onAnimationComplete,
  userBadge
}) {
  if (layout === 'list') {
    return (
      <div className="flex items-center gap-4 p-4 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors">
        <div className="flex-shrink-0">
          <Badge
            badge={badge}
            unlockedAt={unlockedAt}
            isUnlocked={isUnlocked}
            isNewlyUnlocked={isNewlyUnlocked}
            progress={progress}
            showTooltip={isUnlocked}
            onClick={onClick}
            onAnimationComplete={onAnimationComplete}
          />
        </div>
        <div className="flex-grow min-w-0">
          <h3 className={`font-semibold ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>
            {badge.name}
          </h3>
          <p className={`text-sm ${isUnlocked ? 'text-gray-300' : 'text-gray-600'}`}>
            {badge.description}
          </p>
          {userBadge && (
            <p className="text-xs text-cyan-400 mt-1">
              Unlocked {new Date(userBadge.unlockedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <Badge
      badge={badge}
      unlockedAt={unlockedAt}
      isUnlocked={isUnlocked}
      isNewlyUnlocked={isNewlyUnlocked}
      progress={progress}
      showTooltip
      onClick={onClick}
      onAnimationComplete={onAnimationComplete}
    />
  );
}
