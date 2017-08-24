import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import {Dialog, FlatButton} from "material-ui";

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
    width: '100%',
    height: '50%',
    fontSize: '20px',
    border: '1px solid black',
    outline: 'none',
    overflow: 'scroll'
  },
  title: {
    height: '50px',
    fontSize: '30px'
  }
};

export default class ArticleContentModal extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      title: '',
      content: ''
    };
  }

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
        label="關閉"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];
    return (
      <div>
        <Dialog
          title=""
          actions={this.props.confirmBtn ? action1 : action2}
          modal={false}
          open={this.props.context.state.articleContentModal}
          contentStyle={style.contentStyle}
          bodyStyle={style.bodyStyle}
          onRequestClose={this.handleClose}
        >
          <div style={style.title}>{this.props.activeArticle.title}</div>
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
        </Dialog>
      </div>
    );
  }

}