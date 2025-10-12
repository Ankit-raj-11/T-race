import React, { useState } from 'react';
import BadgeShowcase from './BadgeShowcase';
import { BADGE_COLLECTION } from '@/lib/badge/badgeCollection';
import { Trophy, Filter, Grid, List, Search } from 'lucide-react';

// Sample user badges progress
const sampleUserBadges = {
  ['lightning_fingers_80']: {
    unlocked: false,
    progress: 75,
    currentValue: 20,
    targetValue: 80,
    unlockedAt: '2025-10-10T14:06:04.340Z',
    isViewed: false
  },
  ['accuracy_expert_95']: {
    unlocked: true,
    progress: 100,
    unlockedAt: '2025-10-10T14:06:04.340Z',
    isViewed: false
  },
  ['first_steps']: {
    unlocked: true,
    progress: 100,
    unlockedAt: '2025-10-10T14:06:04.340Z',
    isViewed: false
  },
  ['marathon_runner']: {
    unlocked: false,
    progress: 20,
    currentValue: 20,
    targetValue: 100,
    isViewed: false
  },
  ['aim_high']: {
    unlocked: false,
    progress: 40,
    currentValue: 4,
    targetValue: 10,
    isViewed: false
  }
};

export default function BadgeDemo() {
  const [showLocked, setShowLocked] = useState(true);
  const [userBadges, setUserBadges] = useState(sampleUserBadges);
  const [celebrationMode, setCelebrationMode] = useState(false);
  const [activeLayout, setActiveLayout] = useState('grid');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter and search badges
  const filteredBadges = BADGE_COLLECTION.filter((badge) => {
    const matchesCategory = filterCategory === 'all' || badge.category === filterCategory;
    const matchesSearch =
      !searchTerm ||
      badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      badge.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const shouldShow = showLocked || userBadges[badge.badgeId]?.unlocked;

    return matchesCategory && matchesSearch && shouldShow;
  });

  // Get unique categories for filter
  const categories = ['all', ...new Set(BADGE_COLLECTION.map((badge) => badge.category))];

  const handleBadgeClick = (badge) => {
    console.log('Badge clicked:', badge);
  };

  const handleBadgeAnimationComplete = (badge) => {
    console.log('Animation completed for badge:', badge.name);
    // Update the badge to mark it as viewed
    setUserBadges((prev) => ({
      ...prev,
      [badge.badgeId]: {
        ...prev[badge.badgeId],
        isViewed: true
      }
    }));
  };

  // Function to simulate unlocking a new badge with celebration
  const simulateUnlock = (badgeId) => {
    const badge = BADGE_COLLECTION.find((b) => b.badgeId === badgeId);
    if (!badge) return;

    // Check if badge is already unlocked
    const isAlreadyUnlocked = userBadges[badgeId]?.unlocked;
    if (isAlreadyUnlocked) {
      // Re-trigger animation by marking as not viewed
      setUserBadges((prev) => ({
        ...prev,
        [badgeId]: {
          ...prev[badgeId],
          isViewed: false
        }
      }));
    } else {
      // Add new badge
      setUserBadges((prev) => ({
        ...prev,
        [badgeId]: {
          badgeId: badgeId,
          unlocked: true,
          unlockedAt: new Date().toISOString(),
          isViewed: false
        }
      }));
    }
  };

  // Reset all badges to locked state
  const resetBadges = () => {
    setUserBadges({});
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">Badge System Demo</h1>

        {/* Demo Controls */}
        <div className="bg-gray-800 rounded-lg p-4 mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Demo Controls</h2>
          <div className="flex flex-wrap gap-4 mb-4">
            <label className="flex items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={showLocked}
                onChange={(e) => setShowLocked(e.target.checked)}
                className="rounded"
              />
              Show Locked Badges
            </label>
          </div>

          {/* Celebration Animation Testing */}
          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-lg font-medium text-white mb-3">Test Celebration Animations</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {BADGE_COLLECTION.map((badge) => (
                <button
                  key={badge.badgeId}
                  onClick={() => simulateUnlock(badge.badgeId)}
                  className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                    badge.rarity === 'legendary'
                      ? 'bg-yellow-600 hover:bg-yellow-500 text-white'
                      : badge.rarity === 'epic'
                      ? 'bg-purple-600 hover:bg-purple-500 text-white'
                      : badge.rarity === 'rare'
                      ? 'bg-blue-600 hover:bg-blue-500 text-white'
                      : 'bg-gray-600 hover:bg-gray-500 text-white'
                  }`}
                >
                  Unlock {badge.name}
                  <br />
                  <span className="text-xs opacity-75">({badge.rarity})</span>
                </button>
              ))}
            </div>
            <button
              onClick={resetBadges}
              className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded font-medium"
            >
              Reset All Badges
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Trophy className="text-cyan-400" size={24} />
            <h2 className="text-2xl font-bold text-white">Badge Collection</h2>
            <span className="text-sm text-gray-400">
              ({Object.keys(userBadges).length}/{BADGE_COLLECTION.length})
            </span>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                type="text"
                placeholder="Search badges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all'
                    ? 'All Categories'
                    : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            {/* Layout Toggle */}
            <div className="flex border border-gray-600 rounded-lg overflow-hidden">
              <button
                onClick={() => setActiveLayout('grid')}
                className={`p-2 transition-colors ${
                  activeLayout === 'grid'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
                aria-label="Grid layout"
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setActiveLayout('list')}
                className={`p-2 transition-colors ${
                  activeLayout === 'list'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:text-white'
                }`}
                aria-label="List layout"
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Badge Showcase */}
        <BadgeShowcase
          allBadges={filteredBadges}
          userBadges={userBadges}
          layout={activeLayout}
          showLocked={showLocked}
          onBadgeClick={handleBadgeClick}
          onBadgeAnimationComplete={handleBadgeAnimationComplete}
          loading={false}
          error={null}
        />
      </div>
    </div>
  );
}
