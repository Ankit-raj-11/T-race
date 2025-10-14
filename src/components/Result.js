import { useAuth } from '@/context/AuthContext';
import { processTestResult } from '@/lib/gamification';
import { AlertCircle, ArrowLeft, Award, RotateCcw, Star } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Results({ stats, onNextRound, onBackHome }) {
  const { wpm, accuracy, mistakes, timeElapsed, correctChars, totalChars } = stats;
  const { user } = useAuth();

  const [gamificationUpdate, setGamificationUpdate] = useState(null);

  useEffect(() => {
    if (user && wpm > 0) {
      const updateUserStats = async () => {
        try {
          const response = await fetch('/api/badges/user-stat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ wpm })
          });
          const data = await response.json();
          if (data.newBadges.length > 0 || data.levelUp) {
            setGamificationUpdate({
              newBadges: data.newBadges,
              levelUp: data.levelUp,
              newSkill: data.stat.skillLevel
            });
          }
        } catch (error) {
          console.error('Error creating or updating user stats:', error);
        }
      };

      updateUserStats();
    } else {
      console.log('Skipping stats save: User is not available or WPM is zero.');
    }
  }, [user, wpm]);

  // ... (The rest of your component remains the same) ...
  const commonMistakes = Object.entries(mistakes)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBackHome}
          className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Home</span>
        </button>
        <button
          onClick={onNextRound}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors cursor-pointer"
        >
          <RotateCcw size={16} />
          Next Round
        </button>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Race Completed!
        </h1>
        <p className="text-lg text-gray-400">Completed in {formatTime(timeElapsed)}</p>
      </div>

      <div className="max-w-4xl mx-auto">
        {gamificationUpdate && (
          <div className="my-6 bg-gray-800 border border-purple-500 rounded-lg p-4 text-center">
            {gamificationUpdate.levelUp && (
              <div className="flex items-center justify-center gap-2 text-lg text-yellow-400 mb-2">
                <Star size={20} />
                <span>
                  You leveled up! New rank: <strong>{gamificationUpdate.newSkill}</strong>
                </span>
              </div>
            )}
            {gamificationUpdate.newBadges.map((badge, i) => (
              <div key={i} className="flex items-center justify-center gap-2 text-lg text-cyan-400">
                <Award size={20} />
                <span>
                  New badge unlocked: <strong>{badge.name}</strong>
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-300 mb-3">Words Per Minute</h2>
          <div className="text-7xl font-bold text-cyan-400">{wpm}</div>
        </div>

        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-300 mb-3">Accuracy</h2>
          <div className="text-7xl font-bold text-emerald-400">{accuracy}%</div>
          <p className="text-gray-500">
            {correctChars} / {totalChars} characters correct
          </p>
        </div>

        {commonMistakes.length > 0 ? (
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <AlertCircle className="text-red-400" size={24} />
              <h2 className="text-2xl font-semibold text-gray-300">Common Mistakes</h2>
            </div>
            <div className="flex justify-center gap-6 flex-wrap">
              {commonMistakes.map(([char, count], idx) => (
                <div key={idx} className="text-center">
                  <div className="text-5xl font-mono text-red-400 mb-2">
                    {char === ' ' ? '␣' : char}
                  </div>
                  <div className="text-sm text-gray-400">{count} mistakes</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-5xl mb-3">🎯</div>
            <h2 className="text-2xl font-semibold text-emerald-400 mb-2">Perfect Round!</h2>
            <p className="text-gray-400">No mistakes detected</p>
          </div>
        )}
      </div>
    </>
  );
}
