import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import axios from 'axios';
import {RaisedButton, TextField} from "material-ui";
import SimpleDialog from "./utils/SimpleDialog";
import actions from "../redux/actions/userInfo";

const style = {
  container: {
    textAlign: 'center',
  }
};

class Login extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      account: '',
      password: '',
      accountCheck: true,
      passwordCheck: true,
      dialog: false,
      dialogText: ''
    };
  }

  checkAccount = (e) => {
    this.state.account = e.target.value;
    if (e.target.value === '') {
      this.setState({accountCheck: false});
      return;
    }
    this.setState({accountCheck: true});
  };

  checkPassword = (e) => {
    this.state.password = e.target.value;
    if (e.target.value === '') {
      this.setState({passwordCheck: false});
      return;
    }
    this.setState({passwordCheck: true});
  };

  sentRequest = () => {
    const context = this; // 因.then會找不到this
    axios
      .post('/login', {
        account: this.state.account,
        password: this.state.password
      })
      .then(response => {
        context.setState({dialogText: response.data})
        context.setState({dialog: true});
        axios
          .get('/getUser', {})
          .then(response => {
            if (typeof response.data === 'string') {
              return // 如session內無user會回傳空值 type為String
            }
            console.log(response.data);
            context.props.userInfoAction(response.data);
            browserHistory.push('/main')
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div style={style.container}>
        <TextField
          onBlur={(e) => this.checkAccount(e)}
          floatingLabelStyle={{color: 'gray'}}
          hintText="帳號"
          errorText={this.state.accountCheck ? '' : 'The field is required'}
          floatingLabelText="帳號"
        />
        <br/>
        <TextField
          onBlur={(e) => this.checkPassword(e)}
          floatingLabelStyle={{color: 'gray'}}
          hintText="密碼"
          type="password"
          errorText={this.state.passwordCheck ? '' : 'This field is required'}
          floatingLabelText="密碼"
        />
        <br/>
        <RaisedButton onClick={() => this.sentRequest()} label="登入" primary={true} style={style.login}/>
        {this.state.dialog ? <SimpleDialog content={this.state.dialogText} context={this}/> : ''}
      </div>
    );
  }


}

const mapStateToProp = (state) => {
  return state
};

export default connect(mapStateToProp, {
  userInfoAction: actions.userInfo,
})(Login);
