// lib/gamification.js

// --- 🎯 Achievements & Badges Data ---
export const WPM_BADGES = {
  20: { name: "🎈 Warm-Up Starter", icon: "🎈" },
  30: { name: "🪶 Quick Learner", icon: "🪶" },
  40: { name: "🎯 Focused Fingers", icon: "🎯" },
  50: { name: "🥉 Fast Fingers", icon: "🥉" },
  60: { name: "💫 Typing Enthusiast", icon: "💫" },
  70: { name: "🚀 Speed Challenger", icon: "🚀" },
  80: { name: "🥈 Speedster", icon: "🥈" },
  90: { name: "🔥 Keyboard Ninja", icon: "🔥" },
  100: { name: "⚡ Lightning Hands", icon: "⚡" },
  110: { name: "🏆 Type Master", icon: "🏆" },
  120: { name: "🧠 Typing Virtuoso", icon: "🧠" },
  130: { name: "💥 Legendary Typist", icon: "💥" },
};

// --- 🧠 Skill Levels Data ---
export const SKILL_LEVELS = [
  { wpm: 0, title: "🐢 Beginner" },
  { wpm: 21, title: "✍️ Learner" },
  { wpm: 36, title: "🎯 Skilled" },
  { wpm: 51, title: "⚙️ Experienced" },
  { wpm: 66, title: "⚡ Fast" },
  { wpm: 81, title: "🔥 Advanced" },
  { wpm: 96, title: "🧠 Expert" },
  { wpm: 111, title: "👑 Pro / Legendary" },
];

// --- Helper function to check if two dates are on consecutive days ---
const isConsecutiveDay = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  d1.setDate(d1.getDate() + 1);
  return d1.toDateString() === d2.toDateString();
};

/**
 * Processes a new typing test result and returns updated user stats.
 * @param {object} currentUserStats - The user's current stats from Firestore.
 * @param {number} newWpm - The WPM from the latest typing test.
 * @returns {object} - The new, updated stats object to be saved to Firestore.
 */
export const processTestResult = (currentUserStats, newWpm) => {
  const today = new Date();
  const newStats = { ...currentUserStats };

  // --- ADDED: Logic to track total races completed ---
  newStats.racesCompleted = (currentUserStats.racesCompleted || 0) + 1;

  // --- 🔥 Streaks Logic ---
  const lastTestDate = currentUserStats.lastTestDate?.toDate(); // Convert Firestore Timestamp to JS Date
  if (lastTestDate && isConsecutiveDay(lastTestDate, today) && newWpm >= currentUserStats.lastTestWPM) {
    newStats.currentStreak = (currentUserStats.currentStreak || 0) + 1;
  } else if (currentUserStats.lastTestDate) { // only reset if there was a previous test
    newStats.currentStreak = 1; // Reset or start streak
  } else {
    newStats.currentStreak = 1;
  }
  newStats.longestStreak = Math.max(newStats.longestStreak || 0, newStats.currentStreak);
  newStats.lastTestWPM = newWpm;
  newStats.lastTestDate = today;

  // --- 🎯 Achievements & Badges Logic ---
  const currentBadges = newStats.badges || [];
  const earnedBadges = new Set(currentBadges.map(b => b.name)); // Use a Set for efficient lookup

  for (const wpmKey in WPM_BADGES) {
    const badge = WPM_BADGES[wpmKey];
    if (newWpm >= parseInt(wpmKey) && !earnedBadges.has(badge.name)) {
      currentBadges.push({
        name: badge.name,
        icon: badge.icon,
        dateEarned: today,
      });
    }
  }
  newStats.badges = currentBadges;

  // --- 🧠 Skill Levels Logic ---
  const newSkill = SKILL_LEVELS.slice().reverse().find(level => newWpm >= level.wpm);
  if (newSkill) {
    newStats.skillLevel = newSkill.title;
  }
  
  // (Optional) XP Points Logic
  newStats.xpPoints = (newStats.xpPoints || 0) + Math.round(newWpm);

  return newStats;
};