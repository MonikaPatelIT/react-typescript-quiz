import React from 'react'
import { AnswerObject } from '../App';

type Props = {
    question: string;
    answers: string[];
    callback: (event: React.MouseEvent<HTMLButtonElement>) => void;
    userAnswer: AnswerObject | undefined,
    questionNumber: number;
    totalQuestions: number;


}
const QuestionCard: React.FC<Props> = ({ question, answers, userAnswer, callback, questionNumber, totalQuestions }) => {
    return (
        <div>
            <p> Question : {questionNumber} / {totalQuestions}</p>
            <p dangerouslySetInnerHTML={{ __html: question }} />
            <div>
                {answers.map((answer, index) => (<div key={index}>
                    <button disabled={!!userAnswer} value={answer} onClick={callback} ><span dangerouslySetInnerHTML={{ __html: answer }} /></button>
                </div>))}
            </div>
        </div>
    );

}

export default QuestionCard