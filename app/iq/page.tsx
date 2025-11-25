'use client';

import { useIQGame } from './hooks/useIQGame';
import StartScreen from './components/StartScreen';
import QuestionCard from './components/QuestionCard';
import ResultsScreen from './components/ResultsScreen';

export default function IQGamePage() {
    const { gameState, currentQuestion, startGame, submitAnswer, restartGame, allQuestions } = useIQGame();

    return (
        <div className="min-h-screen">
            {gameState.stage === 'start' && (
                <StartScreen
                    onStart={startGame}
                    totalQuestions={gameState.totalQuestions}
                />
            )}

            {gameState.stage === 'playing' && currentQuestion && (
                <QuestionCard
                    question={currentQuestion}
                    questionNumber={gameState.currentQuestionIndex + 1}
                    totalQuestions={gameState.totalQuestions}
                    timeRemaining={gameState.timeRemaining}
                    onAnswer={submitAnswer}
                />
            )}

            {gameState.stage === 'results' && (
                <ResultsScreen
                    answers={gameState.answers}
                    questions={allQuestions}
                    onRestart={restartGame}
                />
            )}
        </div>
    );
}
