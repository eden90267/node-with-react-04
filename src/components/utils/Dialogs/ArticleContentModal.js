import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import axios from 'axios';
import {Dialog, FlatButton} from "material-ui";
import LeaveMsgModal from "./LeaveMsgModal";
import SimpleDialog from "./SimpleDialog";
import ListMsg from "../../List";

/**
 * A modal dialog can only be closed by selecting one of the actions.
 *
 *   在Dialog加上
 *   modal={false}
 onRequestClose={this.handleClose}
 讓點擊方框旁也可關閉

 articleContentModal 須在parent的state加上

 props:
 contentEditable
 confirmBtn
 activeArticle
 */

const style = {
  contentStyle: {
    width: '90%',
    maxWidth: 'none',
  },
  textarea: {
    marginTop: '20px',
    width: '102%',
    height: '90%',
    fontSize: '20px',
    outline: 'none',
    overflowY: 'scroll',
    borderTop: '1px solid gray'
  },
  title: {
    height: '20px',
    fontSize: '30px'
  },
  levmsgLine: {
    borderTop: '1px solid gray'
  },
  levmsgTitle: {
    textAlign: 'center',
    marginTop: '20px'
  },
  date: {
    marginTop: '30px'
  }
};

export default class ArticleContentModal extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      dialogText: '請先登入',
      dialog: false,
      title: '',
      content: '',
      leaveMsgModal: false,
      comments: [],
    };
  }

  componentWillMount() {
    axios
      .get('articles/' + this.props.activeArticle._id)
      .then((response) => {
        this.setState({comments: response.data.comments});
      });
  }

  levmsgModal = () => {
    if (this.props.context.props.user.login === true) {
      this.setState({leaveMsgModal: true});
    } else {
      this.setState({dialog: true});
    }
  };

  handleClose = () => {
    this.props.context.setState({articleContentModal: false});
  };

  render() {
    const action1 = [
      <FlatButton
        label="關閉"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="確認"
        primary={true}
        onTouchTap={this.props.context.handleConfirm}
      />
    ];
    const action2 = [
      <FlatButton
        label="留言"
        primary={true}
        onTouchTap={this.levmsgModal}
      />,
      <FlatButton
        label="關閉"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];
    return (
      <div>
        <Dialog
          actionsContainerStyle={style.btn}
          actions={this.props.confirmBtn ? action1 : action2}
          modal={false}
          open={this.props.context.state.articleContentModal}
          contentStyle={style.contentStyle}
          bodyStyle={style.bodyStyle}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <div style={style.titleContainer}>
            <div style={style.title}>{this.props.activeArticle.title}</div>
            <div style={style.date}>發文日期：{this.props.activeArticle.PostDate.replace(/[A-Z]/g, " ")}</div>
          </div>
          <div style={{height: '700px'}}>
            <div
              contentEditable={this.props.contentEditable}
              ref="div1"
              style={style.textarea}
              dangerouslySetInnerHTML={{
                __html: this.props.activeArticle.content
              }}
            >
            </div>
          </div>
          <div style={style.levmsgLine}/>
          <div style={style.levmsgTitle}>留言內容</div>
          <ListMsg comments={this.state.comments} />
          {this.state.leaveMsgModal ? <LeaveMsgModal context={this}/> : ''}
          {this.state.dialog ? <SimpleDialog context={this}/> : ''} {/* 未登入*/}
        </Dialog>
      </div>
    );
  }

}