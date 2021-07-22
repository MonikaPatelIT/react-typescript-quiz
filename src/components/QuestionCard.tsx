import React from 'react'
import { AnswerObject } from '../App';

import { ButtonWrapper, CardWrapper } from './QuestionCard.styles'

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
        <CardWrapper>
            <div>
                <p> Question : {questionNumber} / {totalQuestions}</p>
                <p dangerouslySetInnerHTML={{ __html: question }} />
                <div>
                    {answers.map((answer, index) => (<ButtonWrapper correct={userAnswer?.correctAnswer === answer} userClicked={userAnswer?.answer === answer} key={index}>
                        <button disabled={!!userAnswer} value={answer} onClick={callback} ><span dangerouslySetInnerHTML={{ __html: answer }} /></button>
                    </ButtonWrapper>))}
                </div>
            </div>
        </CardWrapper>
    );

}

export default QuestionCard