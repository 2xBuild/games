import { UserAnswer, IQResult, CategoryScore, Question } from '../types';
import { GAME_CONFIG, CATEGORY_LABELS, IQ_RANGES } from '../constants/gameConfig';

/**
 * Calculate time multiplier based on response speed
 * Returns a value between 0.5 (slowest) and 1.0 (fastest)
 * Used in hybrid scoring to reward faster responses
 */
export function calculateTimeMultiplier(
    timeRemaining: number,
    timeLimit: number,
    isCorrect: boolean
): number {
    if (!isCorrect) return 0;
    return 0.5 + (0.5 * (timeRemaining / timeLimit));
}

/**
 * Calculate IQ score based on user performance
 * Note: Points already include time multiplier from hybrid scoring system
 */
export function calculateIQScore(
    answers: UserAnswer[],
    questions: Question[]
): IQResult {
    const totalScore = answers.reduce((sum, answer) => sum + answer.pointsEarned, 0);
    const maxScore = questions.reduce((sum, q) => sum + q.points, 0);
    const accuracy = (answers.filter(a => a.isCorrect).length / answers.length) * 100;
    const totalTime = answers.reduce((sum, answer) => sum + answer.timeTaken, 0);
    const averageTime = totalTime / answers.length;

    // Calculate IQ score (normalized to 70-160 range)
    const scorePercentage = (totalScore / maxScore) * 100;
    const iqScore = Math.round(
        GAME_CONFIG.MIN_IQ +
        (scorePercentage / 100) * (GAME_CONFIG.MAX_IQ - GAME_CONFIG.MIN_IQ)
    );

    // Calculate category breakdown
    const categoryBreakdown = calculateCategoryBreakdown(answers, questions);

    return {
        totalScore,
        maxScore,
        iqScore,
        accuracy,
        averageTime,
        categoryBreakdown,
    };
}

/**
 * Calculate performance by category
 */
function calculateCategoryBreakdown(
    answers: UserAnswer[],
    questions: Question[]
): CategoryScore[] {
    const categories = Object.keys(CATEGORY_LABELS) as Array<keyof typeof CATEGORY_LABELS>;

    return categories.map(category => {
        const categoryQuestions = questions.filter(q => q.category === category);
        const categoryAnswers = answers.filter(a =>
            categoryQuestions.some(q => q.id === a.questionId)
        );

        const score = categoryAnswers.reduce((sum, a) => sum + a.pointsEarned, 0);
        const total = categoryQuestions.reduce((sum, q) => sum + q.points, 0);
        const percentage = total > 0 ? (score / total) * 100 : 0;

        return {
            category,
            score,
            total,
            percentage,
        };
    }).filter(c => c.total > 0); // Only include categories that were tested
}

/**
 * Get IQ range label and color
 */
export function getIQRangeInfo(iqScore: number): { label: string; color: string } {
    const range = IQ_RANGES.find(r => iqScore >= r.min && iqScore <= r.max);
    return range || IQ_RANGES[2]; // Default to average
}

/**
 * Format time in MM:SS format
 */
export function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
