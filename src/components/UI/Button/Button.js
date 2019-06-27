import React from 'react';
import classes from './Button.css';

export const Button = ({ children, disabled, type, onClick }) => {
  const cls = [classes.Button, classes[type]];
  return (
    <button onClick={onClick} className={cls.join(' ')} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
