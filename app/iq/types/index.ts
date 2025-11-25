// Question categories
export type QuestionCategory = 'general_knowledge' | 'reasoning' | 'math' | 'logic' | 'verbal';

// Difficulty levels
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

// Question interface
export interface Question {
    id: string;
    category: QuestionCategory;
    difficulty: DifficultyLevel;
    question: string;
    options: string[];
    correctAnswer: number; // Index of correct option
    timeLimit: number; // in seconds
    points: number;
}

// Game state
export type GameStage = 'start' | 'playing' | 'results';

export interface GameState {
    stage: GameStage;
    currentQuestionIndex: number;
    score: number;
    answers: UserAnswer[];
    timeRemaining: number;
    totalQuestions: number;
}

// User answer
export interface UserAnswer {
    questionId: string;
    selectedAnswer: number;
    isCorrect: boolean;
    timeTaken: number; // in seconds
    pointsEarned: number;
}

// IQ Result
export interface IQResult {
    totalScore: number;
    maxScore: number;
    iqScore: number;
    accuracy: number; // percentage
    averageTime: number; // seconds per question
    categoryBreakdown: CategoryScore[];
}

export interface CategoryScore {
    category: QuestionCategory;
    score: number;
    total: number;
    percentage: number;
}
