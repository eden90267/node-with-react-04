import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Header from "./Header";
import actions from "../redux/actions/userInfo";
import config from '../config';

const style = {
  content: {
    marginTop: "48px",
  }
};

class App extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      user: '2343333'
    };
  }

  componentDidMount() {
    const context = this;
    axios
      .post(config.origin + '/getUser', {})
      .then(function (response) {
        if (response.data.result === -1) {
          return //未登入
        }
        socket.emit('login', response.data);
        context.props.userInfoAction(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Header/>
        <div style={style.content}>
          {this.props.children}
        </div>
      </div>
    );
  }

}

function mapStateToProp(state) {
  return {
    userInfo: state.userInfo
  };
}

export default connect(mapStateToProp, {
  userInfoAction: actions.userInfo,
})(App);
