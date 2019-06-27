import React from 'react';
import classes from './Backdrop.css';

export const Backdrop = ({ onClick }) => {
  return (
    <div className={classes.Backdrop} onClick={onClick}>
      1
    </div>
  );
};

export default Backdrop;
