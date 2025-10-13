import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, RotateCcw, Play, Pause, Square } from 'lucide-react';
import Link from 'next/link';
import Timer from '../components/Timer';
import PracticeSettings from '../components/PracticeSettings';
import TypingFeedback from '../components/TypingFeedback';
import PerformanceModal from '../components/PerformanceModal';
import CountdownAnimation from '../components/CountdownAnimation';

export default function Practice() {
  const [settings, setSettings] = useState({
    source: 'randomWords',
    difficulty: 'medium',
    mode: 'timed',
    targetWpm: 60,
    customText: ''
  });

  const [text, setText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [sessionKey, setSessionKey] = useState(0);
  const [showSettings, setShowSettings] = useState(true);
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const [finalPerformance, setFinalPerformance] = useState(null);
  const [practiceStatus, setPracticeStatus] = useState('waiting'); // 'waiting', 'countdown', 'active'
  const [showCountdown, setShowCountdown] = useState(false);
  
  const inputRef = useRef(null);
  const [caretIndex, setCaretIndex] = useState(0);

  // Fetch practice text with specific settings
  const fetchPracticeTextWithSettings = async (settingsToUse) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      
      // Handle custom text
      if (settingsToUse.source === 'custom' && settingsToUse.customText) {
        params.append('customText', settingsToUse.customText);
      } else {
        params.append('source', settingsToUse.source);
        if (settingsToUse.source === 'randomWords') {
          params.append('difficulty', settingsToUse.difficulty);
        }
      }

      console.log('Fetching text with settings:', settingsToUse);
      console.log('Fetching text with params:', Object.fromEntries(params));
      
      const response = await fetch(`/api/practice-text?${params}`);
      const data = await response.json();
      
      console.log('Received text:', data);
      
      setText(data.text);
      setUserInput('');
      setIsActive(false);
      setStartTime(null);
      setSessionKey(prev => prev + 1);
      setCaretIndex(0);
    } catch (error) {
      console.error('Failed to fetch practice text:', error);
      setText('Failed to load text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch practice text
  const fetchPracticeText = async () => {
    return fetchPracticeTextWithSettings(settings);
  };

  // Don't initialize with text on page load - wait for user to configure settings
  // useEffect(() => {
  //   fetchPracticeText();
  // }, []);

  const handleStartPractice = async (customSettings = null) => {
    // Use custom settings if provided, otherwise use current settings
    const settingsToUse = customSettings || settings;
    
    console.log('Starting practice with settings:', settingsToUse);
    
    // Always fetch text based on settings when starting practice
    await fetchPracticeTextWithSettings(settingsToUse);
    setShowSettings(false);
    setPracticeStatus('waiting');
    setIsActive(false); // Don't start timer immediately, let user start typing
    setStartTime(null);
  };

  const startPracticeCountdown = () => {
    if (isLoading || practiceStatus !== 'waiting') return;
    setPracticeStatus('countdown');
    setShowCountdown(true);
  };

  const handleCountdownComplete = () => {
    setShowCountdown(false);
    setPracticeStatus('active');
    // Focus input after countdown
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  const handlePauseResume = () => {
    setIsActive(!isActive);
    if (!isActive) {
      inputRef.current?.focus();
    }
  };

  const handleStop = () => {
    setIsActive(false);
    setStartTime(null);
    setUserInput('');
    setPracticeStatus('waiting');
    setShowCountdown(false);
    setShowSettings(true);
  };

  const handleNewText = async () => {
    // If using custom text, don't fetch new text - just reset the current custom text
    if (settings.source === 'custom' && settings.customText) {
      setText(settings.customText);
      setUserInput('');
      setIsActive(false);
      setStartTime(null);
      setSessionKey(prev => prev + 1);
      setCaretIndex(0);
      setPracticeStatus('waiting');
      setShowCountdown(false);
    } else {
      // For non-custom text, fetch new text
      await fetchPracticeText();
      setShowSettings(false);
      setPracticeStatus('waiting');
      setShowCountdown(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    
    // Only allow input during active practice
    if (practiceStatus !== 'active') return;
    
    // Don't allow typing beyond the text length
    if (value.length > text.length) return;
    
    setUserInput(value);
    // Update caret index based on the input's current selection position
    if (e.target && typeof e.target.selectionStart === 'number') {
      setCaretIndex(e.target.selectionStart);
    }
    
    // Start timing on first keystroke
    if (!startTime && !isActive && value.length === 1) {
      setStartTime(Date.now());
      setIsActive(true);
    }

    // Auto-complete when text is finished
    if (value.length === text.length && value === text) {
      setIsActive(false);
      setTimeout(() => {
        const correctChars = calculateCorrectChars(value);
        const accuracy = Math.round((correctChars / value.length) * 100);
        const timeElapsed = startTime ? Math.round((Date.now() - startTime) / 1000) : 0;
        const wpm = timeElapsed > 0 ? Math.round((value.length / 5) / (timeElapsed / 60)) : 0;
        const errors = value.length - correctChars;
        
        // Show performance modal instead of alert
        setFinalPerformance({
          wpm,
          accuracy,
          totalTime: timeElapsed,
          correctChars,
          totalChars: value.length,
          errors
        });
        setShowPerformanceModal(true);
      }, 100);
    }
  };

  // Keep caret index in sync when user navigates with arrows, mouse, Home/End, etc.
  const handleKeyUp = (e) => {
    if (!inputRef.current) return;
    // Read actual caret from DOM; this avoids duplicate increments on key repeat
    const pos = inputRef.current.selectionStart ?? 0;
    setCaretIndex(pos);
  };

  const handleSelect = () => {
    if (!inputRef.current) return;
    setCaretIndex(inputRef.current.selectionStart ?? 0);
  };

  const handleClick = () => {
    if (!inputRef.current) return;
    setCaretIndex(inputRef.current.selectionStart ?? 0);
  };

  const calculateCorrectChars = (input) => {
    let correct = 0;
    for (let i = 0; i < input.length && i < text.length; i++) {
      if (input[i] === text[i]) {
        correct++;
      }
    }
    return correct;
  };

  const handleTimerFinish = () => {
    setIsActive(false);
    const correctChars = calculateCorrectChars(userInput);
    const accuracy = userInput.length > 0 ? Math.round((correctChars / userInput.length) * 100) : 0;
    const wpm = userInput.length > 0 ? Math.round((userInput.length / 5) / 1) : 0; // 1 minute elapsed
    const errors = userInput.length - correctChars;
    
    setTimeout(() => {
      // Show performance modal for timed sessions
      setFinalPerformance({
        wpm,
        accuracy,
        totalTime: 60, // Timed session is 60 seconds
        correctChars,
        totalChars: userInput.length,
        errors
      });
      setShowPerformanceModal(true);
    }, 100);
  };

  const completionPercentage = text.length > 0 ? (userInput.length / text.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)'
        }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-6 rounded-xl border border-gray-600">
          <Link href="/" className="flex items-center gap-3 text-cyan-400 hover:text-cyan-300 transition-all duration-300 transform hover:scale-105">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <ArrowLeft size={20} />
            </div>
            <span className="font-medium">Back to Home</span>
          </Link>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            🏆 Practice Mode
          </h1>
          
          <div className="flex items-center gap-3">
            {!showSettings && (
              <>
                <button
                  onClick={handlePauseResume}
                  className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-yellow-500/20 font-medium"
                  disabled={!text || completionPercentage === 100}
                >
                  {isActive ? <Pause size={18} /> : <Play size={18} />}
                  {isActive ? 'Pause' : 'Resume'}
                </button>
                
                <button
                  onClick={handleStop}
                  className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/20 font-medium"
                >
                  <Square size={18} />
                  Stop
                </button>
              </>
            )}
            
            <button
              onClick={handleNewText}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/20 font-medium"
              disabled={isLoading}
            >
              <RotateCcw size={18} className={isLoading ? 'animate-spin' : ''} />
              New Text
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Settings Panel */}
          {showSettings && (
            <PracticeSettings
              settings={settings}
              onSettingsChange={setSettings}
              onStartPractice={handleStartPractice}
            />
          )}

          {/* Practice Session */}
          {!showSettings && (
            <div className="space-y-6">
              {/* Loading State */}
              {isLoading && (
                <div className="text-center py-12">
                  <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-400"></div>
                    <span className="text-cyan-400 font-medium">Loading new text...</span>
                  </div>
                </div>
              )}

              {/* Start Practice Button - only show when waiting */}
              {!isLoading && practiceStatus === 'waiting' && (
                <div className="text-center mb-6">
                  <button
                    onClick={startPracticeCountdown}
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold text-xl rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/30 animate-pulse"
                  >
                    🚀 Start Practice!
                  </button>
                </div>
              )}
              
              {/* Practice Status Indicator */}
              {practiceStatus === 'countdown' && (
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-yellow-400 animate-pulse">
                    🚀 Practice Starting...
                  </div>
                </div>
              )}

              {/* Timer (only for timed mode and active practice) */}
              {!isLoading && settings.mode === 'timed' && practiceStatus === 'active' && (
                <div className="text-center">
                  <Timer
                    key={sessionKey}
                    duration={60}
                    onFinish={handleTimerFinish}
                    isActive={isActive}
                  />
                </div>
              )}

              {/* Real-time Feedback */}
              {!isLoading && (
                <TypingFeedback
                  text={text}
                  userInput={userInput}
                  startTime={startTime}
                  isActive={isActive}
                  mode={settings.mode}
                  targetWpm={settings.targetWpm}
                />
              )}

              {/* Typing Input */}
              {!isLoading && (
                <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-200 flex items-center gap-2">
                  <span>⌨️</span>
                  Start typing:
                </h3>
                <div className="relative">
                  <textarea
                    ref={inputRef}
                    value={userInput}
                    onChange={handleInputChange}
                    onKeyUp={handleKeyUp}
                    onSelect={handleSelect}
                    onClick={handleClick}
                    placeholder={practiceStatus === 'waiting' ? "Click 'Start Practice!' to begin..." : "Start typing the text above..."}
                    disabled={isLoading || !text || practiceStatus !== 'active'}
                    className="w-full px-6 py-5 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600 rounded-xl text-white font-mono text-lg leading-relaxed placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-400/20 resize-none transition-all duration-300 shadow-lg"
                    rows="5"
                    spellCheck={false}
                  />
                  {isActive && (
                    <div className="absolute top-2 right-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
                
                {/* Quick Actions */}
                <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-xl border border-gray-600">
                  <div className="text-sm font-medium text-gray-300">
                    <span className="text-cyan-400">Progress:</span> {userInput.length} / {text.length} characters
                    <span className="ml-3 text-gray-400">(Cursor: {caretIndex} / {text.length})</span>
                    <span className="ml-2 px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg">
                      {Math.round(completionPercentage)}%
                    </span>
                  </div>
                  <div className="flex gap-6 text-sm text-gray-400">
                    <span><strong>Words:</strong> {userInput.split(' ').filter(w => w.length > 0).length} / {text.split(' ').length}</span>
                    {settings.mode === 'untimed' && startTime && (
                      <span><strong>Time:</strong> {Math.round((Date.now() - startTime) / 1000)}s</span>
                    )}
                  </div>
                </div>
              </div>
              )}

              {/* Practice Tips */}
              {!isLoading && (
                <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-cyan-500/20 rounded-xl p-6 shadow-lg">
                <h4 className="text-xl font-bold mb-4 text-cyan-400 flex items-center gap-2">
                  <span>💡</span>
                  Practice Tips:
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="text-gray-300 space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>Focus on <strong className="text-white">accuracy first</strong>, speed will come naturally</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>Keep your <strong className="text-white">eyes on the text</strong>, not your hands</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>Use proper <strong className="text-white">finger positioning</strong> on home row keys</span>
                    </li>
                  </ul>
                  <ul className="text-gray-300 space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>Take <strong className="text-white">breaks</strong> to avoid fatigue and maintain performance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>Practice <strong className="text-white">regularly</strong> for consistent improvement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>Use <strong className="text-white">different text types</strong> to challenge yourself</span>
                    </li>
                  </ul>
                </div>
              </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Countdown Animation Overlay */}
      <CountdownAnimation
        isActive={showCountdown}
        onComplete={handleCountdownComplete}
        duration={4000}
        showAnimation={true}
      />

      {/* Performance Modal */}
      <PerformanceModal
        isOpen={showPerformanceModal}
        onClose={() => setShowPerformanceModal(false)}
        performance={finalPerformance}
        onTryAgain={() => {
          setShowPerformanceModal(false);
          handleNewText();
        }}
        onBackToPractice={() => {
          setShowPerformanceModal(false);
          setShowSettings(true);
          setUserInput('');
          setIsActive(false);
          setStartTime(null);
        }}
      />
    </div>
  );
}