import React, { Component } from 'react';
import classes from './Layout.css';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';
import { connect } from 'react-redux';

export class Layout extends Component {
  state = { menu: false };

  onToggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu
    });
  };

  render() {
    const { menu } = this.state;
    const { isAuthenticated } = this.props;
    return (
      <div className={classes.Layout}>
        <Drawer
          isOpen={menu}
          onClose={this.onToggleMenuHandler}
          isAuthenticated={isAuthenticated}
        />
        <MenuToggle onToggle={this.onToggleMenuHandler} isOpen={menu} />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token
  };
};

export default connect(
  mapStateToProps,
  null
)(Layout);
