import React from 'react';
import classes from './Input.css';

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && shouldValidate && touched;
}

export const Input = props => {
  const { value, label, type = 'text', onChange, errorMessage } = props;
  const cls = [classes.Input, classes[type]];
  const htmlFor = `${type}-${Math.random()}`;

  if (isInvalid(props)) {
    cls.push(classes.invalid);
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{label}</label>
      <input type={type} id={htmlFor} value={value} onChange={onChange} />

      {isInvalid(props) ? (
        <span>{errorMessage || 'Введите верное значение'}</span>
      ) : null}
    </div>
  );
};

export default Input;
