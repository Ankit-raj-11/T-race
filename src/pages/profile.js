// src/pages/profile.js

import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import BadgesDisplay from '../components/Badge/BadgesDisplay';
import StreakBanner from '../components/StreakBanner';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';

export default function Profile() {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      const statsRef = doc(db, 'userStats', user.uid);
      try {
        const docSnap = await getDoc(statsRef);
        if (docSnap.exists()) {
          setUserStats(docSnap.data());
        } else {
          console.log('No user stats document found.');
        }
      } catch (error) {
        console.error('Error fetching user stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  if (loading) {
    return <div className="text-center mt-10">Loading profile...</div>;
  }

  if (!user) {
    return <div className="text-center mt-10">Please log in to view your profile.</div>;
  }

  if (!userStats) {
    return (
      <div className="text-center mt-10">
        No stats found. Complete a typing test to get started!
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
        {user.displayName || 'Your'}&apos;s Profile
      </h1>

      <StreakBanner currentStreak={userStats.currentStreak} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-8 text-center">
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Skill Level</p>
          <p className="text-2xl font-bold text-cyan-400">{userStats.skillLevel || 'N/A'}</p>
        </div>
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Longest Streak</p>
          <p className="text-2xl font-bold text-emerald-400">{userStats.longestStreak || 0} days</p>
        </div>
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">XP Points</p>
          <p className="text-2xl font-bold text-purple-400">{userStats.xpPoints || 0}</p>
        </div>
        <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-sm mb-2">Races Completed</p>
          <p className="text-2xl font-bold text-yellow-400">{userStats.racesCompleted || 0}</p>
        </div>
      </div>

      <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
        <BadgesDisplay badges={userStats.badges} />
      </div>
    </div>
  );
}
