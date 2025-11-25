'use client';

import { Question } from '../types';
import { CATEGORY_LABELS } from '../constants/gameConfig';
import { formatTime } from '../utils/iqCalculator';

interface QuestionCardProps {
    question: Question;
    questionNumber: number;
    totalQuestions: number;
    timeRemaining: number;
    onAnswer: (answerIndex: number) => void;
}

export default function QuestionCard({
    question,
    questionNumber,
    totalQuestions,
    timeRemaining,
    onAnswer,
}: QuestionCardProps) {
    const getTimerColor = () => {
        if (timeRemaining > 30) return 'text-green-400';
        if (timeRemaining > 10) return 'text-yellow-400';
        return 'text-red-400';
    };

    const getDifficultyColor = () => {
        switch (question.difficulty) {
            case 'easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'hard': return 'bg-red-500/20 text-red-400 border-red-500/30';
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-3xl w-full">
                {/* Progress Bar */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-mono text-white/60">
                            Question {questionNumber} of {totalQuestions}
                        </span>
                        <span className={`text-sm font-mono font-bold ${getTimerColor()}`}>
                            ⏱️ {formatTime(timeRemaining)}
                        </span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-white/50 transition-all duration-300"
                            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Question Card */}
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl mb-6">
                    {/* Category & Difficulty */}
                    <div className="flex gap-3 mb-6">
                        <span className="px-3 py-1 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30 text-xs font-mono">
                            {CATEGORY_LABELS[question.category]}
                        </span>
                        <span className={`px-3 py-1 rounded-lg border text-xs font-mono uppercase ${getDifficultyColor()}`}>
                            {question.difficulty}
                        </span>
                    </div>

                    {/* Question */}
                    <h2 className="text-2xl font-bold text-white mb-8 font-mono leading-relaxed">
                        {question.question}
                    </h2>

                    {/* Options */}
                    <div className="space-y-3">
                        {question.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => onAnswer(index)}
                                className="w-full p-4 rounded-xl bg-white/5 border border-white/20 hover:bg-white/10 hover:border-white/40 text-left text-white font-mono transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm font-bold group-hover:bg-white/20 transition-colors">
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    <span className="flex-1">{option}</span>
                                    <svg
                                        className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Points Info */}
                <div className="text-center text-sm text-white/40 font-mono">
                    This question is worth {question.points} points
                </div>
            </div>
        </div>
    );
}
