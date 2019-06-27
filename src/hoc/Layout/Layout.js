import React, { Component } from 'react';
import classes from './Layout.css';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';

export class Layout extends Component {
  state = { menu: false };

  onToggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu
    });
  };

  render() {
    const { menu } = this.state;
    return (
      <div className={classes.Layout}>
        <Drawer isOpen={menu} onClose={this.onToggleMenuHandler} />
        <MenuToggle onToggle={this.onToggleMenuHandler} isOpen={menu} />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;
