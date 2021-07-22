import React from 'react';
import { useState } from 'react';

//components 
import QuestionCard from './components/QuestionCard';

//types 
import { Difficulty, fetchQuizQuestions, QuestionState } from './API';

//styles 
import { GlobalStyle, Wrapper } from './App.styles';


export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;
const App: React.FC = () => {

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true)




  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    setScore(0);
    setNumber(0);
    setUserAnswers([])
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY);
    setQuestions(newQuestions);
    setLoading(false);
  }
  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = answer === questions[number].correct_answer;
      if (correct) setScore(score + 1);

      const ansObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers(prev => [...prev, ansObject]);

    }
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS)
      setGameOver(true);

    else setNumber(number + 1);

  }

  return (
    <>
    <GlobalStyle />
    <Wrapper>
      <h1>React Quiz</h1>
      {(gameOver || userAnswers.length === TOTAL_QUESTIONS) && <button className="start" onClick={startTrivia}>Start Quiz</button>}

      {!gameOver && <p className="score">Score: {score}</p>}
      {loading && <p>Loading Question...</p>}
      {!loading && !gameOver && <QuestionCard questionNumber={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        callback={checkAnswer}
      />
      }
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 &&
        <button className="next" onClick={nextQuestion}> Next Question </button>}
    </Wrapper>
    </>
  );
}

export default App;
