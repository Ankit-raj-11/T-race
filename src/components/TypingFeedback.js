import { useState, useEffect } from 'react';
import { TrendingUp, Target, Zap, Award } from 'lucide-react';

export default function TypingFeedback({ 
  text, 
  userInput, 
  startTime, 
  isActive,
  mode,
  targetWpm 
}) {
  const [stats, setStats] = useState({
    wpm: 0,
    accuracy: 100,
    correctChars: 0,
    incorrectChars: 0,
    totalChars: 0,
    timeElapsed: 0
  });

  const [mistakes, setMistakes] = useState([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (!isActive || !startTime) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const timeElapsed = (now - startTime) / 1000; // seconds
      const minutes = timeElapsed / 60;

      const correctChars = calculateCorrectChars();
      const totalChars = userInput.length;
      const incorrectChars = totalChars - correctChars;
      
      const wpm = minutes > 0 ? Math.round((correctChars / 5) / minutes) : 0;
      const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;

      setStats({
        wpm,
        accuracy,
        correctChars,
        incorrectChars,
        totalChars,
        timeElapsed: Math.round(timeElapsed)
      });

      // Track mistakes
      trackMistakes();
      
      // Calculate streak
      calculateStreak();

    }, 100);

    return () => clearInterval(interval);
  }, [userInput, startTime, isActive, text]);

  const calculateCorrectChars = () => {
    let correct = 0;
    for (let i = 0; i < userInput.length && i < text.length; i++) {
      if (userInput[i] === text[i]) {
        correct++;
      }
    }
    return correct;
  };

  const trackMistakes = () => {
    const newMistakes = [];
    for (let i = 0; i < userInput.length && i < text.length; i++) {
      if (userInput[i] !== text[i]) {
        newMistakes.push({
          position: i,
          expected: text[i],
          typed: userInput[i]
        });
      }
    }
    setMistakes(newMistakes);
  };

  const calculateStreak = () => {
    let currentStreak = 0;
    for (let i = userInput.length - 1; i >= 0 && i < text.length; i--) {
      if (userInput[i] === text[i]) {
        currentStreak++;
      } else {
        break;
      }
    }
    setStreak(currentStreak);
  };

  const getCharacterStyle = (index) => {
    if (index >= userInput.length) {
      return 'text-gray-400'; // Not typed yet
    }
    
    if (userInput[index] === text[index]) {
      return 'text-green-400 bg-green-400/20'; // Correct
    } else {
      return 'text-red-400 bg-red-400/20'; // Incorrect
    }
  };

  const progress = text.length > 0 ? (userInput.length / text.length) * 100 : 0;

  return (
    <div className="space-y-4">
      {/* Real-time Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-yellow-500/20 rounded-xl p-4 text-center shadow-lg hover:shadow-yellow-500/20 transition-all duration-300">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Zap size={18} className="text-yellow-400" />
            </div>
            <span className="text-sm font-medium text-gray-400">WPM</span>
          </div>
          <div className={`text-3xl font-bold ${
            targetWpm && stats.wpm >= targetWpm ? 'text-green-400' : 'text-yellow-400'
          }`}>
            {stats.wpm}
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-blue-500/20 rounded-xl p-4 text-center shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Target size={18} className="text-blue-400" />
            </div>
            <span className="text-sm font-medium text-gray-400">Accuracy</span>
          </div>
          <div className={`text-3xl font-bold ${
            stats.accuracy >= 95 ? 'text-green-400' : 
            stats.accuracy >= 85 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {stats.accuracy}%
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-purple-500/20 rounded-xl p-4 text-center shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <TrendingUp size={18} className="text-purple-400" />
            </div>
            <span className="text-sm font-medium text-gray-400">Streak</span>
          </div>
          <div className="text-3xl font-bold text-purple-400">
            {streak}
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-orange-500/20 rounded-xl p-4 text-center shadow-lg hover:shadow-orange-500/20 transition-all duration-300">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <Award size={18} className="text-orange-400" />
            </div>
            <span className="text-sm font-medium text-gray-400">Time</span>
          </div>
          <div className="text-3xl font-bold text-orange-400">
            {mode === 'untimed' ? `${stats.timeElapsed}s` : `${Math.max(0, 60 - stats.timeElapsed)}s`}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-700/50 rounded-full h-3 mb-6 overflow-hidden border border-gray-600">
        <div 
          className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out shadow-lg"
          style={{ 
            width: `${Math.min(progress, 100)}%`,
            boxShadow: '0 0 20px rgba(34, 211, 238, 0.5)'
          }}
        ></div>
      </div>

      {/* Text Display with Character-level Feedback */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-600 rounded-xl p-6 font-mono text-lg leading-relaxed shadow-lg">
        <div className="text-gray-400 text-sm mb-2 flex items-center gap-2">
          <span>📝</span>
          <span>Practice Text</span>
        </div>
        <div className="text-lg leading-8">
          {text.split('').map((char, index) => (
            <span
              key={index}
              className={`${getCharacterStyle(index)} transition-all duration-200 rounded px-0.5`}
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* Current Mistakes */}
      {mistakes.length > 0 && (
        <div className="bg-gradient-to-r from-red-900/30 to-red-800/30 border border-red-500/50 rounded-xl p-4 shadow-lg">
          <h4 className="text-red-400 font-bold mb-3 flex items-center gap-2">
            <span>⚠️</span>
            Current Mistakes:
          </h4>
          <div className="space-y-2 text-sm">
            {mistakes.slice(-3).map((mistake, index) => (
              <div key={index} className="text-gray-200 bg-red-900/20 p-2 rounded-lg">
                <span className="text-red-300 font-medium">Position {mistake.position + 1}:</span> Expected "{mistake.expected}" but typed "{mistake.typed}"
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Motivation Messages */}
      {streak >= 10 && (
        <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/50 rounded-xl p-4 text-center shadow-lg animate-pulse">
          <div className="text-green-400 font-bold text-lg">
            🔥 AMAZING! {streak} characters streak! Keep it up! 🔥
          </div>
        </div>
      )}

      {targetWpm && stats.wpm >= targetWpm && (
        <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/50 rounded-xl p-4 text-center shadow-lg animate-bounce">
          <div className="text-blue-400 font-bold text-lg">
            🎯 TARGET ACHIEVED! You're typing at {stats.wpm} WPM! 🎯
          </div>
        </div>
      )}
    </div>
  );
}