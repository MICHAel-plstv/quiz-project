import React from 'react';
import classes from './AnwerItem.css';

export const AnwerItem = ({ answer, onAnswerClick, answerState }) => {
  const cls = [classes.AnwerItem];

  if (answerState) {
    cls.push(classes[answerState]);
  }
  return (
    <li className={cls.join(' ')} onClick={() => onAnswerClick(answer.id)}>
      {answer.text}
    </li>
  );
};

export default AnwerItem;
