import React, { Component } from 'react'
import {connect} from 'react-redux'
import SendIcon from 'material-ui/svg-icons/content/send';
import { findDOMNode } from 'react-dom';
import { browserHistory } from 'react-router'

import axios from 'axios';
import config from '../config.js';
import ChatList from "../components/ChatList";


const style = {
  container: {
    width: '95vw',
    height: '90vh',
    marginLeft: '2%'
  },
  MsgContent: {
    width: '80%',
    height: '90%',
    boxShadow: '10px 10px 5px #888888',
    overflowY: 'scroll'
  },
  MsgInputBlock: {
    width: '70%',
    height: '8%',
    boxShadow: '10px 10px 5px #888888',
    fontSize: '25px'
  },
  MsgInputBtn: {
    position: 'relative',
    width: '8%',
    height: '8%',
    boxShadow: '10px 10px 5px #888888',
    background: '#64FFDA',
    marginTop: '1%',
    top: '5px',
    left: '15px'
  }
};

class Chatroom extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      msg: []
    };
  }

  componentWillMount() {
    if(typeof window !== 'undefined') {
      window.onbeforeunload = myUnloadEvent;
      function myUnloadEvent() {
        let res = document.cookie.replace(/(?:(?:^|.*;\s*)a1\s*\=\s*([^;]*).*$)|^.*$/, "$1"); // $1 表示為match到的第一個參數，可參考https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/n
        console.log(res);
        socket.emit('close', res);
      }
    }
    const context = this;
    axios.post(config.origin + '/getUser',{})
      .then(response => {
        if (response.data.result === -1) {
          if (browserHistory) { // for server side error
            browserHistory.push('/main');
          }
          sweetAlert('請先登入，才能進入聊天室');
          return;
        }
        socket.emit('chatPage',{ // 使用者進入聊天室
          avatar: response.data.avatar,
          name: response.data.name,
          account: response.data.account
        });
      })
      .catch(error => console.log(error));
  }

  componentDidMount () {
    const divRef = findDOMNode(this.refs.contentDiv);
    const context = this ;

    socket.on('chat', (res) => { //使用者發表訊息
      let newList = this.state.msg;
      newList.push(res.data.content);
      context.setState({msg: newList});
      // 保持捲軸在最下方新消息
      findDOMNode(divRef).scrollTop = findDOMNode(divRef).scrollHeight;
    });

    socket.on('chatRoomUsers', (res) => {
      console.log(res)
      //TODO 顯示當前使用者在畫面列表
    })
  }

  send = () => {

    let item = {
      avatar: this.props.userInfo.avatar,
      name: this.props.userInfo.name,
      content: findDOMNode(this.refs.content).value,
      date: new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
    };

    socket.emit('chat', {content: item});
  };

  render() {
    return (
      <div style={style.container}>
        <div ref="contentDiv" style={style.MsgContent}>
          <ChatList msg={this.state.msg}/>
        </div>
        <input ref="content" style={style.MsgInputBlock}/>
        <button onClick={() => this.send()} style={style.MsgInputBtn}>
          <SendIcon />
        </button>
      </div>
    );
  }

}

const mapStateToProp = (state) => ({
  userInfo: state.userInfo
});

export default connect(mapStateToProp, {})(Chatroom)