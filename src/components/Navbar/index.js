import React, {Component} from 'react';
import {Drawer, MenuItem, IconButton} from 'material-ui';
import MainNavBtn from 'material-ui/svg-icons/action/toc';
import {browserHistory} from "react-router";

export default class Navbar extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      open: false
    };
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    });
  };

  toArticle = () => {
    browserHistory.push('/main');
    this.setState({
      open: false
    });
  };

  toa = () => {
    browserHistory.push('/a');
    this.setState({
      open: false
    });
  };


  render() {
    return (
      <div>
        <IconButton tooltip="主選單" onTouchTap={this.handleToggle}>
          <MainNavBtn/>
        </IconButton>
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState(open)}
        >
          <MenuItem onTouchTap={this.toArticle}>文章</MenuItem>
          <MenuItem onTouchTap={this.toa}>Menu Item 2</MenuItem>
        </Drawer>
      </div>
    );
  }

}