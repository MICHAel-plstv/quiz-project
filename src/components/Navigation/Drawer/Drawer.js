import React from 'react';
import classes from './Drawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { NavLink } from 'react-router-dom';

export class Drawer extends React.Component {
  handleClick = () => {
    this.props.onClose();
  };

  renderLinks(links) {
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
    const { isOpen, onClose, isAuthenticated } = this.props;
    const cls = [classes.Drawer];

    if (!isOpen) {
      cls.push(classes.close);
    }

    const links = [{ to: '/', label: 'Список', exact: true }];

    if (isAuthenticated) {
      links.push({ to: '/quiz-creator', label: 'Создать тест', exact: false });
      links.push({ to: '/logout', label: 'Выйти', exact: false });
    } else {
      links.push({ to: '/auth', label: 'Авторизация', exact: false });
    }

    return (
      <>
        <nav className={cls.join(' ')}>
          <ul>{this.renderLinks(links)}</ul>
        </nav>
        {isOpen && <Backdrop onClick={onClose} />}
      </>
    );
  }
}

export default Drawer;
