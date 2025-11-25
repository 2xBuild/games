'use client';

import { useState, useEffect, useCallback } from 'react';
import { GameState, UserAnswer, Question } from '../types';
import { SAMPLE_QUESTIONS } from '../constants/gameConfig';

export function useIQGame(questions: Question[] = SAMPLE_QUESTIONS) {
    const [gameState, setGameState] = useState<GameState>({
        stage: 'start',
        currentQuestionIndex: 0,
        score: 0,
        answers: [],
        timeRemaining: 0,
        totalQuestions: questions.length,
    });

    const [questionStartTime, setQuestionStartTime] = useState<number>(0);
    const [selectedQuestions, setSelectedQuestions] = useState<Question[]>(questions);

    // Start the game
    const startGame = useCallback((questionCount: number) => {
        // Select the specified number of questions
        const questionsToUse = questions.slice(0, Math.min(questionCount, questions.length));
        setSelectedQuestions(questionsToUse);

        setGameState({
            stage: 'playing',
            currentQuestionIndex: 0,
            score: 0,
            answers: [],
            timeRemaining: questionsToUse[0]?.timeLimit || 60,
            totalQuestions: questionsToUse.length,
        });
        setQuestionStartTime(Date.now());
    }, [questions]);

    // Submit answer
    const submitAnswer = useCallback((selectedAnswer: number) => {
        const currentQuestion = selectedQuestions[gameState.currentQuestionIndex];
        const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000);
        const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

        // Calculate time multiplier (0.5 to 1.0 based on speed)
        // Faster responses get higher multipliers, rewarding quick thinking
        const timeMultiplier = isCorrect
            ? 0.5 + (0.5 * (gameState.timeRemaining / currentQuestion.timeLimit))
            : 0;

        // Apply multiplier to base points for hybrid scoring
        const pointsEarned = Math.round(currentQuestion.points * timeMultiplier);

        const answer: UserAnswer = {
            questionId: currentQuestion.id,
            selectedAnswer,
            isCorrect,
            timeTaken,
            pointsEarned,
        };

        const newAnswers = [...gameState.answers, answer];
        const newScore = gameState.score + pointsEarned;
        const isLastQuestion = gameState.currentQuestionIndex >= selectedQuestions.length - 1;

        if (isLastQuestion) {
            // Game over
            setGameState({
                ...gameState,
                stage: 'results',
                answers: newAnswers,
                score: newScore,
            });
        } else {
            // Next question
            const nextIndex = gameState.currentQuestionIndex + 1;
            setGameState({
                ...gameState,
                currentQuestionIndex: nextIndex,
                answers: newAnswers,
                score: newScore,
                timeRemaining: selectedQuestions[nextIndex].timeLimit,
            });
            setQuestionStartTime(Date.now());
        }
    }, [gameState, selectedQuestions, questionStartTime]);

    // Timer countdown
    useEffect(() => {
        if (gameState.stage !== 'playing') return;

        const timer = setInterval(() => {
            setGameState(prev => {
                if (prev.timeRemaining <= 1) {
                    // Time's up - auto-submit with no answer
                    clearInterval(timer);
                    submitAnswer(-1); // -1 indicates no answer
                    return prev;
                }
                return {
                    ...prev,
                    timeRemaining: prev.timeRemaining - 1,
                };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [gameState.stage, submitAnswer]);

    // Restart game
    const restartGame = useCallback(() => {
        setGameState({
            stage: 'start',
            currentQuestionIndex: 0,
            score: 0,
            answers: [],
            timeRemaining: 0,
            totalQuestions: questions.length,
        });
    }, [questions]);

    return {
        gameState,
        currentQuestion: selectedQuestions[gameState.currentQuestionIndex],
        startGame,
        submitAnswer,
        restartGame,
        allQuestions: selectedQuestions,
    };
}
