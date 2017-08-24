import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import axios from 'axios';
import Navbar from "../components/Navbar/index";
import Menu from "../components/utils/Menu";
import {RaisedButton} from "material-ui";
import actions from "../redux/actions/userInfo";
import {getCookie} from "../client/javascript/cookie";

const style = {
  container: {
    width: '100%',
    height: '48px',
    background: 'white',
    boxShadow: '4px 4px 9px #888888',
    position: 'fixed',
    top: '0px',
    zIndex: '10000'
  },
  login: {
    float: 'right',
    marginTop: '-43px',
    marginRight: '20px'
  },
  register: {
    float: 'right',
    marginTop: '-43px',
    marginRight: '140px'
  },
  menu: {
    marginTop: '-50px',
    float: 'right',
  }
};

class Header extends Component {

  constructor() {
    super(...arguments);
  }

  login = () => {
    browserHistory.push('/login');
  };

  register = () => {
    browserHistory.push('/register');
  };

  logout = () => {
    const context = this;
    axios.post('/logout', {})
      .then(response => {
        context.props.logout();
        browserHistory.push('/login');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div style={style.container}>
        <Navbar />
        {
          getCookie('ifUser') === 'true'
          ?
            <div style={style.menu}>
              <Menu logout={() => this.logout()} title={this.props.userInfo.name}></Menu>
            </div>
            :
            <div>
              <RaisedButton onClick={() => this.login()} label="登入" style={style.login}/>
              <RaisedButton onClick={() => this.register()} label="註冊" style={style.register}/>
            </div>
        }
      </div>
    )
  }

}

function mapStateToProp(state) {
  return ({
    userInfo: state.userInfo
  });
}

export default connect(mapStateToProp, {logout: actions.logOut})(Header);