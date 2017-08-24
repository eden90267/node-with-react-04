import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Header from "./Header";
import actions from "../redux/actions/userInfo";

const style = {
  content: {
    marginTop: "48px",
  }
};

class App extends Component {

  constructor() {
    super(...arguments);
  }

  componentDidMount() {
    const context = this;
    axios.get('/getUser', {})
      .then(response => {
        if (typeof response.data === 'string') {
          return; // 如session內無user會回傳空值 type為string
        }
        context.props.userInfoAction(response.data);
      })
      .catch((error) => {
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

function  mapStateToProp(state){
  return state;
}

export default connect(mapStateToProp, {
  userInfoAction: actions.userInfo,
})(App);
