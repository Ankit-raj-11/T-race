import { Clock, Home, RotateCcw, Target, TrendingUp, Trophy, X, Zap } from 'lucide-react';
import React from 'react';

export default function PerformanceModal({
  isOpen,
  onClose,
  performance,
  onTryAgain,
  onBackToPractice
}) {
  if (!isOpen) return null;

  const {
    wpm = 0,
    accuracy = 0,
    totalTime = 0,
    correctChars = 0,
    totalChars = 0,
    errors = 0
  } = performance || {};

  // Generate personalized tips based on performance
  const generateTips = () => {
    const tips = [];

    if (wpm < 30) {
      tips.push({
        icon: '🎯',
        title: 'Focus on Accuracy First',
        description:
          'Start slower and focus on hitting the right keys. Speed will come naturally with practice.'
      });
    } else if (wpm < 50) {
      tips.push({
        icon: '⚡',
        title: 'Build Muscle Memory',
        description:
          'Practice common letter combinations and frequent words to improve your typing flow.'
      });
    } else if (wpm < 70) {
      tips.push({
        icon: '🚀',
        title: 'Increase Consistency',
        description: 'Great speed! Now work on maintaining this pace throughout longer texts.'
      });
    } else {
      tips.push({
        icon: '👑',
        title: 'Excellent Speed!',
        description: "You're typing like a pro! Consider challenging yourself with harder content."
      });
    }

    if (accuracy < 85) {
      tips.push({
        icon: '🎲',
        title: 'Slow Down for Accuracy',
        description:
          'Focus on reducing errors. Each mistake costs more time than typing slightly slower.'
      });
    } else if (accuracy < 95) {
      tips.push({
        icon: '📍',
        title: 'Fine-tune Precision',
        description:
          "You're close to excellent accuracy! Pay attention to your most common mistakes."
      });
    } else {
      tips.push({
        icon: '💎',
        title: 'Exceptional Accuracy!',
        description: 'Your precision is outstanding! You can now focus on increasing speed.'
      });
    }

    // Add specific technique tips
    if (errors > totalChars * 0.1) {
      tips.push({
        icon: '✋',
        title: 'Hand Positioning',
        description:
          'Keep your hands in the home row position and use all fingers, not just index fingers.'
      });
    }

    if (wpm > 0 && accuracy > 90) {
      tips.push({
        icon: '🎵',
        title: 'Find Your Rhythm',
        description:
          'Try to maintain a steady rhythm. Consistent typing is often faster than bursts.'
      });
    }

    return tips.slice(0, 3); // Show maximum 3 tips
  };

  const tips = generateTips();

  // Performance level calculation
  const getPerformanceLevel = () => {
    const score = (wpm * accuracy) / 100;
    if (score >= 60) return { level: 'Expert', color: 'from-purple-400 to-pink-400', emoji: '👑' };
    if (score >= 45) return { level: 'Advanced', color: 'from-blue-400 to-cyan-400', emoji: '🚀' };
    if (score >= 30)
      return { level: 'Intermediate', color: 'from-green-400 to-emerald-400', emoji: '📈' };
    if (score >= 20)
      return { level: 'Beginner', color: 'from-yellow-400 to-orange-400', emoji: '🌟' };
    return { level: 'Learning', color: 'from-gray-400 to-gray-500', emoji: '🎯' };
  };

  const performanceLevel = getPerformanceLevel();

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-600">
        {/* Header */}
        <div className="relative p-6 pb-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>

          <div className="text-center">
            <div
              className={`inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r ${performanceLevel.color} rounded-xl mb-4`}
            >
              <span className="text-2xl">{performanceLevel.emoji}</span>
              <div className="text-white">
                <h2 className="text-xl font-bold">Session Complete!</h2>
                <p className="text-sm opacity-90">{performanceLevel.level} Level</p>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="px-6 pb-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-4 text-center">
              <Zap className="mx-auto mb-2 text-cyan-400" size={24} />
              <div className="text-2xl font-bold text-white">{Math.round(wpm)}</div>
              <div className="text-sm text-gray-300">WPM</div>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-4 text-center">
              <Target className="mx-auto mb-2 text-green-400" size={24} />
              <div className="text-2xl font-bold text-white">{Math.round(accuracy)}%</div>
              <div className="text-sm text-gray-300">Accuracy</div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4 text-center">
              <Clock className="mx-auto mb-2 text-purple-400" size={24} />
              <div className="text-2xl font-bold text-white">{Math.round(totalTime)}s</div>
              <div className="text-sm text-gray-300">Time</div>
            </div>

            <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-4 text-center">
              <Trophy className="mx-auto mb-2 text-orange-400" size={24} />
              <div className="text-2xl font-bold text-white">
                {correctChars}/{totalChars}
              </div>
              <div className="text-sm text-gray-300">Characters</div>
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="bg-gray-700/50 rounded-xl p-4 mb-6 border border-gray-600">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <TrendingUp className="text-cyan-400" size={20} />
              Detailed Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">Correct Characters:</span>
                <span className="text-green-400 font-medium">{correctChars}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Total Errors:</span>
                <span className="text-red-400 font-medium">{errors}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Characters per Second:</span>
                <span className="text-cyan-400 font-medium">
                  {totalTime > 0 ? Math.round((correctChars / totalTime) * 10) / 10 : 0}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Error Rate:</span>
                <span className="text-yellow-400 font-medium">
                  {totalChars > 0 ? Math.round((errors / totalChars) * 1000) / 10 : 0}%
                </span>
              </div>
            </div>
          </div>

          {/* Tips for Improvement */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              💡 Tips for Improvement
            </h3>
            <div className="space-y-3">
              {tips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-gray-700/70 to-gray-600/70 rounded-lg p-4 border border-gray-600"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{tip.icon}</span>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{tip.title}</h4>
                      <p className="text-gray-300 text-sm">{tip.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onTryAgain}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25"
            >
              <RotateCcw size={18} />
              Try Again
            </button>

            <button
              onClick={onBackToPractice}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25"
            >
              <Home size={18} />
              Back to Practice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
