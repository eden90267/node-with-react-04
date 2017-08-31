import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import axios from 'axios';
import {RaisedButton, TextField} from "material-ui";
import SimpleDialog from "./utils/SimpleDialog";
import actions from "../redux/actions/userInfo";
import Loading from "./utils/Loading/index";

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
      dialogText: '',
      loading: false
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

    this.setState({loading: true});
    const context = this; // 因.then會找不到this
    axios
      .post('/login', {
        account: this.state.account,
        password: this.state.password
      })
      .then(response => {
        if (response.data.result === -1) {
          context.setState({dialog: true});
          context.setState({dialogText: '帳號或密碼錯誤'});
          return;
        }
        axios
          .post('/getUser', {}) // 這裡如發出get並且在server重啟第一次的情況，getuser的get會延遲，但開devtool disable cache又不會，改成post則沒這問題
          .then(response => {
            context.setState({loading: false});
            if (response.data.result !== -1) {
              // login時先把其他登入的裝置登出
              socket.emit('logout', context.state.account);

              socket.emit('login', response.data);
              context.props.userInfoAction(response.data);
              browserHistory.push('/main');
            } else {
              context.setState({dialogText: '帳號或密碼錯誤'});
              context.setState({dialog: true});
            }
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      this.state.loading
        ?
        <Loading/>
        :
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
