import React from 'react';
import classes from './Drawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Список', ezact: true },
  { to: '/auth', label: 'Авторизация', ezact: false },
  { to: '/quiz-creator', label: 'Создать тест', ezact: false }
];

export class Drawer extends React.Component {
  handleClick = () => {
    this.props.onClose();
  };

  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            ativeClassName={classes.active}
            onClick={this.handleClick}
          >
            {link.label}
          </NavLink>
        </li>
      );
    });
  }

  render() {
    const { isOpen, onClose } = this.props;
    const cls = [classes.Drawer];

    if (!isOpen) {
      cls.push(classes.close);
    }

    return (
      <>
        <nav className={cls.join(' ')}>
          <ul>{this.renderLinks()}</ul>
        </nav>
        {isOpen && <Backdrop onClick={onClose} />}
      </>
    );
  }
}

export default Drawer;
