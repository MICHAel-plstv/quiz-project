import React from 'react';
import classes from './FinishedQuiz.css';
import Button from '../UI/Button/Button';
import { Link } from 'react-router-dom';

export const FinishedQuiz = ({ results, quiz, onRetry }) => {
  const successCount = Object.keys(results).reduce((total, key) => {
    if (results[key] === 'succes') {
      total++;
    }
    return total;
  }, 0);

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {quiz.map((question, index) => {
          const cls = [classes[results[question.id]]];

          return (
            <li key={index}>
              <strong className={cls}>{index + 1}</strong>
            </li>
          );
        })}
      </ul>

      <p>
        Правильно {successCount} из {quiz.length}
      </p>
      <div>
        <Button onClick={onRetry} type={'primary'}>
          Повторить
        </Button>
        <Link to={'/'} className={classes.link}>
          <Button type={'succes'}>Перейти к списку тестов</Button>
        </Link>
      </div>
    </div>
  );
};

export default FinishedQuiz;
