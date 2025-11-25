'use client';

import { IQResult, Question, UserAnswer } from '../types';
import { calculateIQScore, getIQRangeInfo } from '../utils/iqCalculator';
import { CATEGORY_LABELS } from '../constants/gameConfig';

interface ResultsScreenProps {
    answers: UserAnswer[];
    questions: Question[];
    onRestart: () => void;
}

export default function ResultsScreen({ answers, questions, onRestart }: ResultsScreenProps) {
    const result: IQResult = calculateIQScore(answers, questions);
    const iqInfo = getIQRangeInfo(result.iqScore);

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold font-mono mb-4 text-white">
                        Test Complete!
                    </h1>
                    <p className="text-lg text-white/60 font-mono">
                        Here are your results
                    </p>
                </div>

                {/* IQ Score Card */}
                <div className="mb-8 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl">
                    <div className="text-center">
                        <div className="text-sm font-mono text-white/60 mb-2">Your IQ Score</div>
                        <div className="text-7xl font-bold font-mono mb-4" style={{ color: iqInfo.color }}>
                            {result.iqScore}
                        </div>
                        <div className="inline-block px-6 py-2 rounded-full text-lg font-bold font-mono"
                            style={{ backgroundColor: `${iqInfo.color}20`, color: iqInfo.color, border: `2px solid ${iqInfo.color}40` }}>
                            {iqInfo.label}
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="text-3xl mb-2">📊</div>
                        <div className="text-3xl font-bold text-white mb-1">
                            {result.accuracy.toFixed(1)}%
                        </div>
                        <div className="text-sm text-white/60 font-mono">Accuracy</div>
                    </div>
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="text-3xl mb-2">⭐</div>
                        <div className="text-3xl font-bold text-white mb-1">
                            {result.totalScore}/{result.maxScore}
                        </div>
                        <div className="text-sm text-white/60 font-mono">Points</div>
                    </div>
                    <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                        <div className="text-3xl mb-2">⏱️</div>
                        <div className="text-3xl font-bold text-white mb-1">
                            {result.averageTime.toFixed(1)}s
                        </div>
                        <div className="text-sm text-white/60 font-mono">Avg Time</div>
                    </div>
                </div>

                {/* Category Breakdown */}
                <div className="mb-8 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-6 font-mono">Category Performance</h3>
                    <div className="space-y-4">
                        {result.categoryBreakdown.map((cat) => (
                            <div key={cat.category}>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-mono text-white/80">
                                        {CATEGORY_LABELS[cat.category]}
                                    </span>
                                    <span className="text-sm font-mono text-white/60">
                                        {cat.score}/{cat.total} pts ({cat.percentage.toFixed(0)}%)
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-white/90 transition-all duration-500"
                                        style={{ width: `${cat.percentage}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Question Review */}
                <div className="mb-8 p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-6 font-mono">Question Review</h3>
                    <div className="space-y-3">
                        {answers.map((answer, index) => {
                            const question = questions.find(q => q.id === answer.questionId);
                            if (!question) return null;

                            return (
                                <div
                                    key={answer.questionId}
                                    className={`p-4 rounded-lg border ${answer.isCorrect
                                            ? 'bg-green-500/10 border-green-500/30'
                                            : 'bg-red-500/10 border-red-500/30'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="flex-shrink-0 text-2xl">
                                            {answer.isCorrect ? '✅' : '❌'}
                                        </span>
                                        <div className="flex-1">
                                            <div className="text-sm font-mono text-white/80 mb-1">
                                                Q{index + 1}: {question.question}
                                            </div>
                                            {!answer.isCorrect && (
                                                <div className="text-xs font-mono text-white/60">
                                                    Correct answer: {question.options[question.correctAnswer]}
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-sm font-mono text-white/60">
                                            +{answer.pointsEarned} pts
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-5 w-[70%] mx-auto">
                    <button
                        onClick={onRestart}
                        className="flex-1 py-1 px-1 rounded-md bg-white/5 border border-white/20 hover:bg-white/10 text-white font-bold text-md font-mono transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Try Again
                    </button>
                    <a
                        href="/"
                        className="flex-1 py-1 px-1 rounded-md bg-white/5 border border-white/20 hover:bg-white/10 text-white font-bold text-md font-mono transition-all duration-200 text-center"
                    >
                        Home
                    </a>
                </div>
            </div>
        </div>
    );
}
