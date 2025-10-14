import { BADGE_COLLECTION } from '@/lib/badge/badgeCollection';
import { Award, Lock } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import BadgeShowcase from './BadgeShowcase';

export default function BadgeCollection({ showOnlyNearCompletion = false }) {
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBadgeProgress = async () => {
      try {
        // Fetch badge collecting progress
        const progressResponse = await fetch(`/api/badges`);
        const progressResult = await progressResponse.json();

        if (progressResult.success) {
          setProgress(progressResult.progress);
        }
      } catch (error) {
        console.error('Error fetching badge progress:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBadgeProgress();
  }, []);

  const getProgressPercentage = (badgeId) => {
    const badgeProgress = progress[badgeId];
    if (badgeProgress == null || badgeProgress.progress == null) {
      return 0;
    }

    return badgeProgress.progress;
  };

  const isNearCompletion = (badgeId) => {
    const percentage = getProgressPercentage(badgeId);
    return percentage >= 70; // Consider 70%+ as "near completion"
  };

  // Handle badge animation completion - mark badge as viewed
  const handleBadgeAnimationComplete = useCallback(async (animationName, badge) => {
    try {
      if (animationName !== 'badge-bounce' || !badge) {
        return;
      }
      // Call the API to mark the badge as viewed
      const response = await fetch('/api/badges/mark-viewed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          badgeId: badge.badgeId
        })
      });

      if (response.ok) {
        console.log(`Badge ${badge.badgeId} marked as viewed`);
      } else {
        console.error('Failed to mark badge as viewed:', response.statusText);
      }
    } catch (error) {
      console.error('Error marking badge as viewed:', error);
    }
  }, []);

  const filteredBadges = showOnlyNearCompletion
    ? BADGE_COLLECTION.filter(
        (badge) => isNearCompletion(badge.badgeId) && getProgressPercentage(badge.badgeId) < 100
      )
    : BADGE_COLLECTION;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
        <span className="ml-3 text-gray-400">Loading badge progress...</span>
      </div>
    );
  }

  if (filteredBadges.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        {showOnlyNearCompletion ? 'No badges close to completion' : 'No badges available'}
      </div>
    );
  }

  return (
    <BadgeShowcase
      allBadges={filteredBadges}
      userBadges={progress}
      layout="grid"
      showLocked
      // onBadgeClick={handleBadgeClick}
      onBadgeAnimationComplete={handleBadgeAnimationComplete}
      loading={loading}
      error={null}
    />
  );
}
