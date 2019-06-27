import React from 'react';
import classes from './AnswerList.css';
import AnswerItem from './AnwerItem/AnwerItem';

export const AnswerList = ({ answers, onAnswerClick, answerState }) => {
  return (
    <ul className={classes.AnswerList}>
      {answers &&
        answers.map((answer, index) => (
          <AnswerItem
            answer={answer}
            key={index + 1}
            onAnswerClick={onAnswerClick}
            answerState={answerState ? answerState[answer.id] : null}
          />
        ))}
    </ul>
  );
};

export default AnswerList;
