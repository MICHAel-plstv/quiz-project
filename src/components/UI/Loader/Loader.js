import React from 'react';
import classes from './Loader.css';

export default function Loader() {
  return (
    <div className={classes.Center}>
      <div className={classes.Loader}>
        <div />
        <div />
      </div>
    </div>
  );
}
