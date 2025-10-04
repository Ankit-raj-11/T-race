import { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import Timer from '../components/Timer';

export default function Race() {
  const [sentence, setSentence] = useState('');
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [timerKey, setTimerKey] = useState(0);

  // Fetch random sentence on component mount
  useEffect(() => {
    fetchNewSentence();
  }, []);

  const fetchNewSentence = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/sentences');
      const data = await response.json();
      setSentence(data.sentence);
      setUserInput(''); // Reset input when new sentence loads
      setTimerKey(prev => prev + 1); // Reset timer by changing key
    } catch (error) {
      console.error('Failed to fetch sentence:', error);
      setSentence('Failed to load sentence. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleNewSentence = () => {
    fetchNewSentence();
  };

  const getCharacterStatus = (index) => {
    if (index >= userInput.length){
      return 'untyped';
    }
    if (userInput[index] === sentence[index]){
      return 'correct';
    }
    return 'incorrect';
  }

  const renderSentence = () => {
    const chars = sentence.split('');
    const extraChars = userInput.length > sentence.length? userInput.slice(sentence.length) : '';

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
          const cursorClass = isCurrentChar ? 'border-l-2 border-cyan-400 animate-pulse' : '';

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
              <span key={`extra-${i}`}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)'
        }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          <button
            onClick={handleNewSentence}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            disabled={loading}
          >
            <RotateCcw size={16} />
            New Sentence
          </button>
        </div>

        {/* Title and Timer - Centered */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
            Typing Race
          </h1>
          {/* Timer below title */}
          <Timer key={timerKey} duration={60} onFinish={handleNewSentence} />
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
            {/* Words Box */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-300">Type the following sentence:</h2>
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
                <span>Progress: {userInput.length} / {sentence.length} characters</span>
                <span>Words: {userInput.split(' ').filter(word => word.length > 0).length} / {sentence.split(' ').length}</span>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <h4 className="text-lg font-medium mb-2 text-cyan-400">Instructions:</h4>
              <ul className="text-gray-300 space-y-1">
                <li>• Type the sentence exactly as shown above</li>
                <li>• Click "New Sentence" to practice with different text</li>
                <li>• Focus on accuracy and speed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  );
}