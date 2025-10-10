import { useState, useEffect, useCallback } from 'react';
import { Award, Lock } from 'lucide-react';
import { BADGE_COLLECTION } from '@/lib/badge/badgeCollection';
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
  const handleBadgeAnimationComplete = useCallback(async (badge) => {
    try {
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
      // onBadgeAnimationComplete={handleBadgeAnimationComplete}
      loading={loading}
      error={null}
    />
  );

  // return (
  //   <div className="space-y-4">
  //     {showOnlyNearCompletion && (
  //       <h3 className="text-lg font-semibold text-white mb-4">Almost There! 🎯</h3>
  //     )}

  //     {filteredBadges.map((badge) => {
  //       const percentage = getProgressPercentage(badge.badgeId);
  //       const isUnlocked = percentage >= 100;
  //       const badgeProgress = progress[badge.badgeId];

  //       return (
  //         <div
  //           key={badge.badgeId}
  //           className={`p-4 rounded-lg border transition-all ${
  //             isUnlocked
  //               ? 'bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-500/30'
  //               : 'bg-gray-800 border-gray-700 hover:border-gray-600'
  //           }`}
  //         >
  //           <div className="flex items-center gap-4">
  //             <div
  //               className={`w-12 h-12 rounded-full flex items-center justify-center ${
  //                 isUnlocked ? 'bg-gradient-to-br from-yellow-400 to-orange-500' : 'bg-gray-600'
  //               }`}
  //             >
  //               {isUnlocked ? (
  //                 <Award className="text-white" size={24} />
  //               ) : (
  //                 <Lock className="text-gray-300" size={20} />
  //               )}
  //             </div>

  //             <div className="flex-1">
  //               <div className="flex items-center justify-between mb-1">
  //                 <h4 className={`font-semibold ${isUnlocked ? 'text-yellow-400' : 'text-white'}`}>
  //                   {badge.name}
  //                 </h4>
  //                 <span className="text-sm text-gray-400">{percentage.toFixed(0)}%</span>
  //               </div>

  //               <p className="text-sm text-gray-300 mb-2">{badge.description}</p>

  //               {/* Progress Bar */}
  //               <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
  //                 <div
  //                   className={`h-2 rounded-full transition-all duration-300 ${
  //                     isUnlocked
  //                       ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
  //                       : 'bg-gradient-to-r from-cyan-500 to-blue-500'
  //                   }`}
  //                   style={{ width: `${percentage}%` }}
  //                 />
  //               </div>

  //               {/* Progress Text */}
  //               {badgeProgress && !isUnlocked && (
  //                 <div className="flex items-center justify-between text-xs text-gray-400">
  //                   <span>
  //                     {badgeProgress.currentValue} / {badgeProgress.targetValue}
  //                   </span>
  //                   <div className="flex items-center gap-2">
  //                     <span className="px-2 py-1 bg-purple-600 text-white rounded">
  //                       {badge.category}
  //                     </span>
  //                     <span className="px-2 py-1 bg-gray-600 text-gray-300 rounded">
  //                       {badge.rarity}
  //                     </span>
  //                   </div>
  //                 </div>
  //               )}

  //               {isUnlocked && (
  //                 <div className="flex items-center gap-2 text-xs">
  //                   <span className="text-yellow-400 font-semibold">✓ UNLOCKED</span>
  //                   <span className="px-2 py-1 bg-purple-600 text-white rounded">
  //                     {badge.category}
  //                   </span>
  //                   <span className="px-2 py-1 bg-gray-600 text-gray-300 rounded">
  //                     {badge.rarity}
  //                   </span>
  //                 </div>
  //               )}
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     })}
  //   </div>
  // );
}
