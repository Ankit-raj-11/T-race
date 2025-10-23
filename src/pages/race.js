import { showBadgeToast, showLevelUpToast } from '@/components/Badge/toast';
import Results from '@/components/Result.js';
import Timer from '@/components/Timer';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, RotateCcw, Settings } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

export default function Race() {
  const { user, saveTypingStat } = useAuth();
  const [sentence, setSentence] = useState('');
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [timerKey, setTimerKey] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const inputRef = useRef(null);

  // --- NEW: State for managing race completion and stats ---
  const [raceStatus, setRaceStatus] = useState('in-progress'); // 'in-progress' or 'completed'
  const [stats, setStats] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const router = useRouter();

  // --- NEW: State for difficulty and race settings ---
  const [difficulty, setDifficulty] = useState('medium');
  const [showSettings, setShowSettings] = useState(false);
  const [sentenceInfo, setSentenceInfo] = useState(null);

  // Fetch random sentence on component mount and when difficulty changes
  useEffect(() => {
    fetchNewSentence();
  }, [difficulty]);

  useEffect(() => {
    if (!loading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [loading, raceStatus]); // Focus input when a new race starts

  const fetchNewSentence = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/sentences?difficulty=${difficulty}&type=mixed`);
      const data = await response.json();
      setSentence(data.sentence);
      setSentenceInfo(data);
    } catch (error) {
      console.error('Failed to fetch sentence:', error);
      setSentence('Failed to load sentence. Please try again.');
      setSentenceInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const endRace = async () => {
    setTimerActive(false);

    // --- Calculate stats ---
    const endTime = Date.now();
    const timeElapsed = (endTime - startTime) / 1000; // in seconds

    let correctChars = 0;
    let mistakes = {};
    for (let i = 0; i < userInput.length; i++) {
      if (i < sentence.length) {
        if (userInput[i] === sentence[i]) {
          correctChars++;
        } else {
          const char = sentence[i];
          mistakes[char] = (mistakes[char] || 0) + 1;
        }
      }
    }

    const wpm = timeElapsed > 0 ? Math.round(correctChars / 5 / (timeElapsed / 60)) : 0;
    const accuracy = sentence.length > 0 ? Math.round((correctChars / userInput.length) * 100) : 0;

    /**
     * Save user statistic and process achievements
     *
     * We don't have to wait until this operation finishes before displaying the results
     */
    saveTypingStat(wpm, accuracy, timeElapsed)
      .then((typingStat) => {
        if (typingStat) {
          const { gamification, newBadges } = typingStat;

          /**
           * Display toasts:
           *
           * - For each new badge earned
           * - For skill level upgrade
           */
          newBadges.forEach((badgeId) => showBadgeToast(badgeId));
          if (gamification.levelUp) {
            showLevelUpToast(gamification.stat.skillLevel);
          }
        }
      })
      .catch((error) => {
        console.error('Error creating or updating user stats:', error);
      });

    setStats({
      wpm,
      accuracy,
      mistakes,
      timeElapsed,
      correctChars,
      totalChars: sentence.length
    });
    setRaceStatus('completed');
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!timerActive && value.length > 0) {
      setTimerActive(true);
      setStartTime(Date.now()); // Start timer on first keypress
    }
    setUserInput(value);
    if (value.length >= sentence.length) {
      endRace();
    }
  };

  const handleNextRound = () => {
    setRaceStatus('in-progress');
    setUserInput('');
    setTimerActive(false);
    setStats(null);
    setStartTime(null);
    setTimerKey((prev) => prev + 1); // Reset timer
    fetchNewSentence();
  };

  // --- Conditional Rendering: Show Results or Race ---
  if (raceStatus === 'completed' && stats) {
    return (
      <div className="min-h-screen bg-gray-900 text-white relative py-8 px-4">
        <Results stats={stats} onNextRound={handleNextRound} onBackHome={() => router.push('/')} />
      </div>
    );
  }

  // ... (The rest of your component for rendering the race UI)
  const getCharacterStatus = (index) => {
    if (index >= userInput.length) return 'untyped';
    if (userInput[index] === sentence[index]) return 'correct';
    return 'incorrect';
  };

  const renderSentence = () => {
    // ... (This function remains exactly the same)
    const chars = sentence.split('');
    const extraChars = userInput.length > sentence.length ? userInput.slice(sentence.length) : '';

    return (
      <div className="text-lg leading-relaxed font-mono flex flex-wrap">
        {chars.map((char, index) => {
          const status = getCharacterStatus(index);
          let colorClass = 'text-white';

          if (status === 'correct') {
            colorClass = 'text-emerald-400';
          } else if (status === 'incorrect') {
            colorClass = 'text-red-300 bg-red-500/20 rounded px-0.5';
          }

          const isCurrentChar = index === userInput.length;
          const cursorClass = isCurrentChar ? 'border-l-2 border-cyan-400' : '';

          return (
            <span
              key={index}
              className={`${colorClass} ${cursorClass} ${char === ' ' ? 'mx-0.5' : ''}`}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          );
        })}
        {extraChars && (
          <span className="text-red-400 bg-red-400/30 rounded px-1 border-b-2 border-red-500">
            {extraChars.split('').map((char, i) => (
              <span key={`extra-${i}`}>{char === ' ' ? '\u00A0' : char}</span>
            ))}
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)'
          }}
        ></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>

          <div className="flex items-center gap-3">
            {/* Difficulty Selector */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-300">Difficulty:</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="px-3 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:outline-none focus:border-cyan-400"
                disabled={loading}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <button
              onClick={handleNextRound}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors cursor-pointer"
              disabled={loading}
            >
              <RotateCcw size={16} />
              New Sentence
            </button>
          </div>
        </div>

        {/* Title and Timer - Centered */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
            Typing Race
          </h1>

          {/* Difficulty Info */}
          {sentenceInfo && (
            <div className="mb-4 text-sm text-gray-400">
              <span className="capitalize bg-gray-800 px-3 py-1 rounded-full border border-gray-600">
                {difficulty} Difficulty
              </span>
              {sentenceInfo.totalWords && (
                <span className="ml-2">
                  • {sentenceInfo.totalWords.toLocaleString()} words available
                </span>
              )}
            </div>
          )}

          {/* Timer below title */}
          <Timer
            key={timerKey}
            duration={60}
            onFinish={endRace} // Updated to call endRace
            isActive={timerActive}
          />
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Words Box */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-300">
              Type the following sentence:
            </h2>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 min-h-[120px] flex items-center">
              {loading ? (
                <div className="flex items-center justify-center w-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
                  <span className="ml-3 text-gray-400">Loading sentence...</span>
                </div>
              ) : (
                renderSentence()
              )}
            </div>
          </div>

          {/* Typing Input Field with Neon Underline */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-3 text-gray-300">Start typing here:</h3>
            <div className="relative group">
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={handleInputChange}
                placeholder="Start typing the sentence above..."
                disabled={loading}
                className="w-full px-0 py-3 bg-transparent text-lg font-mono text-white placeholder-gray-500 border-0 border-b-2 border-gray-600 focus:border-transparent focus:outline-none transition-all duration-300 disabled:opacity-50"
              />
              {/* Neon underline effect */}
              <div className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-cyan-400 to-blue-500 transform scale-x-0 origin-left transition-transform duration-300 group-focus-within:scale-x-100"></div>
            </div>

            {/* Progress Info */}
            <div className="mt-4 flex justify-between text-sm text-gray-400">
              <span>
                Progress: {userInput.length} / {sentence.length} characters
              </span>
              <span>
                Words: {userInput.split(' ').filter((word) => word.length > 0).length} /{' '}
                {sentence.split(' ').length}
              </span>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
            <h4 className="text-lg font-medium mb-2 text-cyan-400">Instructions:</h4>
            <ul className="text-gray-300 space-y-1">
              <li>• Type the sentence exactly as shown above</li>
              <li>
                • Choose your difficulty level: Easy (common words), Medium (intermediate), or Hard
                (advanced)
              </li>
              <li>• Click &quot;New Sentence&quot; to practice with different text</li>
              <li>• Each difficulty level offers thousands of unique words for endless practice</li>
              <li>• Focus on accuracy and speed to improve your typing skills</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
