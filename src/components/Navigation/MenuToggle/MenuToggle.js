import React from 'react';
import classes from './MenuToggle.css';

export const MenuToggle = ({ onToggle, isOpen }) => {
  const cls = [classes.MenuToggle];

  if (isOpen) {
    cls.push(classes.open);
  }
  return (
    <div className={cls.join(' ')} onClick={onToggle}>
      Бургер меню
    </div>
  );
};

export default MenuToggle;
