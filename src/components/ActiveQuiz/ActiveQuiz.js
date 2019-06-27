import React from 'react';
import classes from './ActiveQuiz.css';
import AnswerList from './AnswerList/AnswerList';

const ActiveQuiz = ({
  answers,
  question,
  onAnswerClick,
  quizLength,
  answerNumber,
  answerState
}) => {
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>
          <strong>{answerNumber}.</strong>&nbsp; {question}
        </span>

        <small>
          {answerNumber} из {quizLength}
        </small>
      </p>

      <AnswerList
        answers={answers}
        onAnswerClick={onAnswerClick}
        answerState={answerState}
      />
    </div>
  );
};

export default ActiveQuiz;
