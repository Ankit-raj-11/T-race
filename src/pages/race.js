import { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import Timer from '../components/Timer';
import ShowResults from '../components/Result';
import { useAuth } from '../context/AuthContext';

export default function Race() {
  const [sentence, setSentence] = useState("");
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [timerKey, setTimerKey] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const inputRef = useRef(null);
  const [caretPos, setCaretPos] = useState({ left: 0, top: 0, height: 0 });
  const charRefs = useRef([]);
  const [showResults, setShowResults] = useState(false);
  /**
   * Not using state because we don't want component to re-render when the
   * metrics are being gathered
   */
  const metricsRef = useRef({
    correctChars: 0,
    totalChars: 0,
    mistakes: {},
    startTime: null,
    endTime: null
  });
  const { user, updateUserScore, saveTypingStat } = useAuth();

  // Helper function wrapped in useCallback for stability
  const resetRace = useCallback(() => {
    setUserInput('');
    setTimerActive(false);
    setShowResults(false);
    setTimerKey((prev) => prev + 1);
    metricsRef.current = {
      correctChars: 0,
      totalChars: 0,
      mistakes: {},
      startTime: null,
      endTime: null
    };
  }, [setUserInput, setTimerActive, setShowResults, setTimerKey]);

  // Fetch random sentence wrapped in useCallback for dependency management
  const fetchNewSentence = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/sentences");
      const data = await response.json();
      setSentence(data.sentence);
      resetRace();
    } catch (error) {
      console.error("Failed to fetch sentence:", error);
      setSentence("Failed to load sentence. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [resetRace]); // fetchNewSentence depends on the stable resetRace function

  // Fetch random sentence on component mount (FIX: Added fetchNewSentence dependency)
  useEffect(() => {
    fetchNewSentence();
  }, [fetchNewSentence]);

  useEffect(() => {
    if (!loading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [loading]);

  // Force cursor to the end whenever userInput changes
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.selectionStart = userInput.length;
      inputRef.current.selectionEnd = userInput.length;
    }
  }, [userInput]);

  const handleKeyDown = (e) => {
    if (loading) return;

    // Prevent cursor movement with arrow keys
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(e.key)) {
      e.preventDefault();
      return;
    }

    if (e.key === 'Backspace') {
      e.preventDefault();
      if (userInput.length > 0) {
        setUserInput((prev) => prev.slice(0, -1));
      }
      return;
    }

    // printable character
    if (e.key.length === 1) {
      e.preventDefault();
      const newInput = userInput + e.key;

      if (!timerActive) {
        setTimerActive(true);
        metricsRef.current.startTime = Date.now();
      }

      const position = userInput.length;
      const expectedChar = sentence[position] || 'extra';
      const isCorrect = e.key === expectedChar;

      const prev = metricsRef.current;
      metricsRef.current = {
        ...prev,
        correctChars: prev.correctChars + (isCorrect ? 1 : 0),
        totalChars: prev.totalChars + 1,
        mistakes: isCorrect
          ? prev.mistakes
          : {
              ...prev.mistakes,
              [expectedChar]: (prev.mistakes[expectedChar] || 0) + 1
            }
      };

      setUserInput(newInput);

      // Finish when the user completes the sentence by exact match or by
      // reaching the same number of characters as the sentence. Avoid
      // finishing based on word count because splitting on spaces can count
      // a word as started before it's completed (this produced premature
      // ends when the last word was only begun).
      if (newInput === sentence || newInput.length >= sentence.length) {
        finishRace();
      }
    }

    if (e.key === 'Enter') {
      e.preventDefault();
    }

    // ignore all other key press
  };

  const finishRace = async () => {
    const prev = metricsRef.current;
    if (prev.endTime) return prev;
    metricsRef.current.endTime = Date.now();

    setTimerActive(false);
    /**
     * Update score only if user is logged in
     */
    if (user) {
      const stat = calculateStats();
      /**
       * TODO: Do we need a different way to calculate score?
       * For now use wpm as score.
       */
      const score = stat.wpm;
      try {
        await updateUserScore(score, stat.timeElapsed);
      } catch (err) {
        console.error('Failed to update user score:', err);
      }

      // persist typing session stats for long-term tracking via auth helper
      try {
        await saveTypingStat(stat.wpm, stat.accuracy, stat.timeElapsed);
      } catch (err) {
        console.error('Failed to save typing stat via helper:', err);
      }
    }

    // Show results after typing stat has been updated
    setShowResults(true);
  };

  const handleTimerFinish = () => {
    if (userInput.length > 0) {
      finishRace();
    } else {
      fetchNewSentence();
    }
  };

  const getCharacterStatus = (index) => {
    if (index >= userInput.length) {
      return 'untyped';
    }
    return userInput[index] === sentence[index] ? 'correct' : 'incorrect';
  };

  const calculateStats = () => {
    const metrics = metricsRef.current;
    // compute elapsed time in seconds; fall back to 1 second to avoid divide-by-zero
    const timeElapsed =
      metrics.endTime && metrics.startTime
        ? Math.max(1, Math.floor((metrics.endTime - metrics.startTime) / 1000))
        : 1;

    const timeInMinutes = timeElapsed / 60;

    // assume 5 characters in words on average
    const wpm = Math.round(metrics.correctChars / 5 / timeInMinutes);

    const accuracy =
      metrics.totalChars > 0 ? Math.round((metrics.correctChars / metrics.totalChars) * 100) : 0;

    return {
      wpm,
      accuracy,
      mistakes: metrics.mistakes,
      timeElapsed,
      correctChars: metrics.correctChars,
      totalChars: metrics.totalChars
    };
  };

  useLayoutEffect(() => {
    // read DOM & set caret position inside rAF to avoid layout thrash / jitter
    const update = () => {
      const index = userInput.length;
      const node = charRefs.current[index];
      if (node) {
        const rect = node.getBoundingClientRect();
        const parentRect = node.parentNode.getBoundingClientRect();

        setCaretPos({
          left: rect.left - parentRect.left,
          top: rect.top - parentRect.top,
          height: rect.height
        });
      } else {
        // fallback: place at end of last char or 0
        const lastNode = charRefs.current[charRefs.current.length - 1];
        if (lastNode) {
          const rect = lastNode.getBoundingClientRect();
          const parentRect = lastNode.parentNode.getBoundingClientRect();
          setCaretPos({
            left: rect.right - parentRect.left,
            top: rect.top - parentRect.top,
            height: rect.height
          });
        } else {
          setCaretPos({ left: 0, top: 0, height: 28 });
        }
      }
    };

    const raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [userInput, sentence, loading]);

  const renderSentence = () => {
    const chars = sentence.split('');
    const extraChars = userInput.length > sentence.length ? userInput.slice(sentence.length) : '';

    return (
      <div
        className="relative text-lg leading-relaxed font-mono flex flex-wrap"
        style={{ minHeight: 20 }}
      >
        {/* Animated caret */}
        {!loading && (
          <div
            className="absolute bg-cyan-400 rounded will-change-transform"
            style={{
              transform: `translate3d(${caretPos.left ?? 0}px, ${caretPos.top ?? 0}px, 0)`,
              width: 2,
              height: caretPos.height || 28,
              zIndex: 10,
              pointerEvents: 'none',
              transition: 'transform 120ms cubic-bezier(.2,.8,.2,1), height 120ms ease'
            }}
          />
        )}
        {chars.map((char, index) => {
          const status = getCharacterStatus(index);
          let colorClass = 'text-white';

          if (status === 'correct') {
            colorClass = 'text-emerald-400';
          } else if (status === 'incorrect') {
            colorClass = 'text-red-300 bg-red-500/20 rounded px-0.5';
          }

          return (
            <span
              key={index}
              ref={(el) => (charRefs.current[index] = el)}
              className={`${colorClass} ${char === ' ' ? 'mx-0.5' : ''}`}
            >
              {char === " " ? "\u00A0" : char}
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

        <span
          ref={(el) => (charRefs.current[sentence.length] = el)}
          className="inline-block w-0 h-[1em]"
        />
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
        {showResults ? (
          <ShowResults
            stats={calculateStats()}
            onNextRound={fetchNewSentence}
            onBackHome={() => (window.location.href = '/')}
          />
        ) : (
          <>
            {/* Top Navigation Bar */}
            <div className="flex items-center justify-between mb-6">
              <Link
                href="/"
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back to Home</span>
              </Link>
              <button
                onClick={fetchNewSentence}
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
              {/* Timer below title - 1 minute countdown. It starts when the user presses
               the first printable key (timerActive is set to true in handleKeyDown).
               If the user finishes earlier, we stop the timer and save the elapsed time. */}
              <Timer
                key={timerKey}
                duration={60}
                onFinish={handleTimerFinish}
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
                    onKeyDown={handleKeyDown}
                    // Intentionally provide a no-op onChange so React doesn't warn
                    // about a controlled input without an onChange handler. This
                    // input is controlled via `onKeyDown` to capture each key
                    // and maintain caret behavior. Keeping this explicit helps
                    // future maintainers understand the choice.
                    onChange={() => {}}
                    onPaste={(e) => e.preventDefault()}
                    onClick={() => {
                      // caret ends on click
                      const el = inputRef.current;
                      if (el) {
                        el.selectionStart = userInput.length;
                        el.selectionEnd = userInput.length;
                      }
                    }}
                    onSelect={() => {
                      //  caretends if user tries to select text
                      const el = inputRef.current;
                      if (el) {
                        el.selectionStart = userInput.length;
                        el.selectionEnd = userInput.length;
                      }
                    }}
                    placeholder="Start typing the sentence above..."
                    disabled={loading}
                    className="w-full px-0 py-3 bg-transparent text-lg font-mono text-white placeholder-gray-500 border-0 border-b-2 border-gray-600 focus:border-transparent focus:outline-none transition-all duration-300 disabled:opacity-50 cyan-400"
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
                  {/* FIX APPLIED HERE: Replaced " with &quot; */}
                  <li>• Click &quot;New Sentence&quot; to practice with different text</li>
                  <li>• Focus on accuracy and speed</li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
