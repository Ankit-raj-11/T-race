import { AlertCircle, ArrowLeft, RotateCcw } from 'lucide-react';

export default function ShowResults({ stats, onNextRound, onBackHome }) {
    const { wpm, accuracy, mistakes, timeElapsed, correctChars, totalChars } = stats

    // get common 5 mistakes
    const commonMistakes = Object.entries(mistakes).sort(([, a], [, b]) => b - a).slice(0, 5);

    const formatTime = (seconds) =>{
        const mins = Math.floor(seconds/60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    return (
        <>
            {/* Top bar similar to race page */}
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

            {/* Stats display */}
            <div className="max-w-4xl mx-auto">
                <div className="mb-8 space-y-8">

                    {/* WPM */}
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <h2 className="text-2xl font-semibold text-gray-300">Words Per Minute</h2>
                        </div>
                        <div className="text-7xl font-bold text-cyan-400 mb-2">{wpm}</div>
                        <p className="text-gray-500">WPM</p>
                    </div>


                    {/* Accuracy */}
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-2 mb-3">
                            <h2 className="text-2xl font-semibold text-gray-300">Accuracy</h2>
                        </div>
                        <div className="text-7xl font-bold text-emerald-400 mb-2">{accuracy}%</div>
                        <p className="text-gray-500">{correctChars} / {totalChars} characters correct</p>
                    </div>


                    {/* Common Mistakes */}
                    {commonMistakes.length > 0 && (
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
                    )}


                    {commonMistakes.length === 0 && (
                        <div className="text-center">
                            <div className="text-5xl mb-3">🎯</div>
                            <h2 className="text-2xl font-semibold text-emerald-400 mb-2">Perfect Round!</h2>
                            <p className="text-gray-400">No mistakes detected</p>
                        </div>
                    )}
                </div>

                {/* Performance Summary */}
                {/* <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                    <h4 className="text-lg font-medium mb-2 text-cyan-400">Performance Summary:</h4>
                    <ul className="text-gray-300 space-y-1">
                        <li>• You typed at {wpm} words per minute</li>
                        <li>• Your accuracy was {accuracy}%</li>
                        <li>• You correctly typed {correctChars} out of {totalChars} characters</li>
                        {commonMistakes.length > 0 && <li>• Focus on practicing: {topMistakes.slice(0, 3).map(([char]) => char === ' ' ? 'space' : `"${char}"`).join(', ')}</li>}
                    </ul>
                </div> */}
            </div>

        </>
    )

}