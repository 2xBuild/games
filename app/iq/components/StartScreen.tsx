'use client';

import { useState } from 'react';

interface StartScreenProps {
    onStart: (questionCount: number) => void;
    totalQuestions: number;
}

export default function StartScreen({ onStart, totalQuestions }: StartScreenProps) {
    const [selectedCount, setSelectedCount] = useState<number>(10);
    const questionOptions = [10, 20, 30, 50];

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="md:text-5xl text-2xl font-bold font-mono m-2">
                        IQ Challenge
                    </h1>
                    <p className="md:text-lg text-sm text-white/60 font-mono">
                        Test your intelligence across multiple domains.
                    </p>
                </div>

                {/* Question Count Selection */}
                <div className="mb-8 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <h3 className="text-lg font-bold text-white mb-4 font-mono">Number of Questions:</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {questionOptions.map((count) => (
                            <button
                                key={count}
                                onClick={() => setSelectedCount(count)}
                                className={`px-6 py-4 rounded-lg border text-lg font-mono font-bold transition-all duration-200 hover:scale-[1.05] active:scale-[0.95] ${selectedCount === count
                                    ? 'bg-white/20 border-white/40 text-white'
                                    : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20'
                                    }`}
                            >
                                {count}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="text-3xl mb-2">📊</div>
                        <div className="text-2xl font-bold text-white mb-1">{selectedCount}</div>
                        <div className="text-sm text-white/60 font-mono">Questions</div>
                    </div>
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="text-3xl mb-2">🎯</div>
                        <div className="text-2xl font-bold text-white mb-1">5 Types</div>
                        <div className="text-sm text-white/60 font-mono">Categories</div>
                    </div>
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="text-3xl mb-2">⏱️</div>
                        <div className="text-2xl font-bold text-white mb-1">Timed</div>
                        <div className="text-sm text-white/60 font-mono">Per Question</div>
                    </div>
                </div>

                {/* Categories */}
                <div className="mb-8 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <h3 className="text-lg font-bold text-white mb-4 font-mono">Categories:</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {['🧮 Math', '🧩 Logic', '💭 Reasoning', '📚 G.K.', '✍️ Verbal'].map((cat) => (
                            <div key={cat} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white/80 font-mono text-center">
                                {cat}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Start Button */}
                <button
                    onClick={() => onStart(selectedCount)}
                    className="w-full py-4 px-8 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-lg font-mono transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                >
                    Start IQ Test
                </button>

                {/* Footer Note */}
                <p className="text-center text-sm text-white/40 mt-6 font-mono">
                    Answer all questions to get your IQ score
                </p>
            </div>
        </div>
    );
}
