// components/StreakBanner.js
export default function StreakBanner({ currentStreak }) {
  if (!currentStreak || currentStreak < 2) {
    return null; // Don't show the banner for streaks less than 2
  }

  return (
    <div className="streak-banner">
      🔥 You’re on a <strong>{currentStreak}-day</strong> Speed Streak!
    </div>
  );
}
