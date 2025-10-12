import { useState } from 'react';
import { Settings, Target, Clock, Type } from 'lucide-react';

export default function PracticeSettings({ settings, onSettingsChange, onStartPractice }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [customText, setCustomText] = useState('');

  const handleSettingChange = (key, value) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  const handleCustomTextSubmit = () => {
    if (customText.trim()) {
      // Update settings to use custom text
      const customSettings = {
        ...settings,
        source: 'custom',
        customText: customText.trim()
      };

      console.log('Custom text submitted:', customSettings);

      // Update the main settings
      onSettingsChange(customSettings);

      // Clear the input
      setCustomText('');
    }
  };

  const handleStartPractice = () => {
    onStartPractice(settings);
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 border border-gray-600 rounded-xl p-6 mb-6 shadow-2xl shadow-cyan-500/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent flex items-center gap-2">
          <div className="p-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg">
            <Settings size={20} className="text-cyan-400" />
          </div>
          Practice Settings
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-cyan-600 hover:to-blue-600 text-gray-300 hover:text-white rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </button>
      </div>

      {/* Quick Settings Summary (when collapsed) */}
      {!isExpanded && (
        <div className="mb-4 p-4 bg-gradient-to-r from-gray-700/70 to-gray-600/70 rounded-lg border border-gray-600">
          <div className="flex flex-wrap gap-4 text-sm text-gray-200">
            <span>
              <strong>Source:</strong>{' '}
              {settings.source === 'custom'
                ? 'Custom Text'
                : settings.source === 'randomWords'
                ? 'Random Words'
                : settings.source === 'quotes'
                ? 'Quotes'
                : settings.source === 'codeSnippets'
                ? 'Code'
                : 'Literature'}
            </span>
            {settings.source === 'randomWords' && (
              <span>
                <strong>Difficulty:</strong> {settings.difficulty}
              </span>
            )}
            {settings.source === 'custom' && settings.customText && (
              <span className="text-green-400">
                <strong>Custom text set!</strong>
              </span>
            )}
            <span>
              <strong>Mode:</strong>{' '}
              {settings.mode === 'timed'
                ? 'Timed (60s)'
                : settings.mode === 'untimed'
                ? 'Untimed'
                : 'Word Goal'}
            </span>
            {settings.mode === 'wordGoal' && (
              <span>
                <strong>Target:</strong> {settings.targetWpm} WPM
              </span>
            )}
          </div>
        </div>
      )}

      {isExpanded && (
        <div className="space-y-6">
          {/* Text Source */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Type size={16} className="inline mr-1" />
              Text Source
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['randomWords', 'quotes', 'codeSnippets', 'literature', 'custom'].map((source) => (
                <button
                  key={source}
                  onClick={() => handleSettingChange('source', source)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                    settings.source === source
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                      : 'bg-gray-700 text-gray-300 hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-500 hover:text-white'
                  }`}
                >
                  {source === 'randomWords'
                    ? 'Random Words'
                    : source === 'quotes'
                    ? 'Quotes'
                    : source === 'codeSnippets'
                    ? 'Code'
                    : source === 'literature'
                    ? 'Literature'
                    : 'Custom Text'}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          {settings.source === 'randomWords' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Target size={16} className="inline mr-1" />
                Difficulty
              </label>
              <div className="flex gap-3">
                {['easy', 'medium', 'hard'].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => handleSettingChange('difficulty', diff)}
                    className={`px-6 py-3 rounded-lg capitalize font-medium transition-all duration-300 transform hover:scale-105 ${
                      settings.difficulty === diff
                        ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                        : 'bg-gray-700 text-gray-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-500 hover:text-white'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Clock size={16} className="inline mr-1" />
              Practice Mode
            </label>
            <div className="flex gap-3 flex-wrap">
              {[
                { key: 'timed', label: 'Timed (60s)', icon: '⏱️' },
                { key: 'untimed', label: 'Untimed', icon: '∞' },
                { key: 'wordGoal', label: 'Word Goal', icon: '🎯' }
              ].map((mode) => (
                <button
                  key={mode.key}
                  onClick={() => handleSettingChange('mode', mode.key)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                    settings.mode === mode.key
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-gray-700 text-gray-300 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-500 hover:text-white'
                  }`}
                >
                  <span>{mode.icon}</span>
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          {/* Goal Setting */}
          {settings.mode === 'wordGoal' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Target WPM</label>
              <input
                type="number"
                min="10"
                max="200"
                value={settings.targetWpm}
                onChange={(e) => handleSettingChange('targetWpm', parseInt(e.target.value))}
                className="px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                placeholder="e.g. 60"
              />
            </div>
          )}

          {/* Custom Text */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Custom Text (optional)
            </label>
            {settings.source === 'custom' && settings.customText && (
              <div className="mb-3 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <p className="text-green-400 font-medium mb-1">✅ Custom text active</p>
                    <p className="text-gray-300 text-sm">
                      {/* FIX APPLIED HERE */}
                      &quot;{settings.customText.substring(0, 100)}...&quot;
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      onSettingsChange({ ...settings, source: 'randomWords', customText: '' })
                    }
                    className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded text-sm transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
            <div className="space-y-2">
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Enter your own text to practice with..."
                className="w-full px-4 py-3 bg-gray-700 border-2 border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 resize-none transition-all duration-300"
                rows="4"
              />
              <button
                onClick={handleCustomTextSubmit}
                disabled={!customText.trim()}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/20"
              >
                ✨ Use Custom Text
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-gray-600">
        <button
          onClick={handleStartPractice}
          className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-cyan-600 hover:via-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40"
        >
          🚀 Start Practice Session
        </button>
      </div>
    </div>
  );
}
