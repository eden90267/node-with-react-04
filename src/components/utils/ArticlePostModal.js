import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import axios from 'axios';
import {Dialog, FlatButton} from "material-ui";

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */

const style = {
  contentStyle: {
    width: '90%',
    maxWidth: 'none',
  },
  textarea: {
    marginTop: '5px',
    width: '100%',
    fontSize: '20px',
    border: '1px solid black',
    outline: 'none',
    overflow: 'scroll',
    height: '250px'
  },
  title: {
    textAlign: 'center',
    height: '50px',
    width: '450px',
    fontSize: '30px'
  },
  picBtn: {
    marginTop: '5px',
    background: 'url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCA0OCA0OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+aWNfcGljXzhmOGY4ZjwvdGl0bGU+PGcgZmlsbD0iIzhGOEY4RiIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTUuOTg4IDEyYTQgNCAwIDEgMCAwIDggNCA0IDAgMCAwIDAtOCIvPjxwYXRoIGQ9Ik00MC4wNjggMjQuNzA0bC02LjM3My01LjkyOC05LjM1IDkuNTc1LTUuNDUyLTUuNTg2TDggMzMuMzQyVjE0LjAwNUE2LjAxMiA2LjAxMiAwIDAgMSAxNC4wMDUgOGgyMC4wNThhNi4wMTIgNi4wMTIgMCAwIDEgNi4wMDUgNi4wMDV2MTAuNjk5ek0zNC4wNjMgNkgxNC4wMDVBOC4wMDkgOC4wMDkgMCAwIDAgNiAxNC4wMDV2MjAuMDU4YTguMDA5IDguMDA5IDAgMCAwIDguMDA1IDguMDA1aDIwLjA1OGE4LjAwOSA4LjAwOSAwIDAgMCA4LjAwNS04LjAwNVYxNC4wMDVBOC4wMDkgOC4wMDkgMCAwIDAgMzQuMDYzIDZ6Ii8+PC9nPjwvc3ZnPg==) no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: '50%',
    height: '22px',
    width: '22px',
    border: 'none',
    cursor: 'pointer',
    display: 'block',
    outline: 'none'
  },
  fileInput: {
    display: 'none'
  }
};

export default class ArticlePostModel extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      title: '',
      content: '',
    }
  }

  titleInput = e => {
    this.setState({title: e.target.value});
  };

  contentInput = e => {
    this.setState({title: e.target.value});
  };

  handleClose = () => {
    this.props.context.setState({articlePostModal: false});
  };

  handleConfirm = () => {
    const context = this.props.context;
    this.props.context.setState({articlePostModal: false});
    axios
      .post('/postArticle', {
        name: this.props.user.name,
        account: this.props.user.account,
        title: this.state.title,
        content: this.state.content,
        avatar: this.props.user.avatar
      })
      .then(response => {
        context.setState({dialog: true});
        context.setState({dialogText: response.data});
        socket.emit('postArticle', {data: 'test'});
      })
      .catch(error => {
        console.log(error);
      });
  };

  fileBtn = () => {
    findDOMNode(this.refs.fileInput).click();
  };

  componentDidMount() {

    findDOMNode(this.refs.div1).addEventListener('keydown', e => {
      console.log(this.refs.div1.innerHTML);
      this.setState({content: this.refs.div1.innerHTML});
    });
    const context = this;
    findDOMNode(context.refs.fileInput).addEventListener('change', () => {
      if (findDOMNode(context.refs.fileInput).files && findDOMNode(context.refs.fileInput).files[0]) {
        let FR = new FileReader();
        FR.onload = (e) => {
          let base64 = e.target.result.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");

          let xhttp = new XMLHttpRequest();
          xhttp.open('POST', 'https://api.imgur.com/3/image', true);
          xhttp.setRequestHeader('Content-type', 'application/json');
          xhttp.setRequestHeader('Authorization', 'Client-ID 4cbec30ffcbc569');
          xhttp.send(JSON.stringify({'image': base64}));
          xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
              let para = document.createElement('img');
              para.heigh = 150;
              para.src = JSON.parse(xhttp.responseText).data.link;
              findDOMNode(context.refs.div1).appendChild(para);
            }
          };
        };
        FR.readAsDataURL(findDOMNode((context.refs.fileInput).files[0]));
      }
    });
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.handleConfirm}
      />,
    ];
    return (
      <div>
        <Dialog
          title="發表文章"
          actions={actions}
          modal={true}
          open={this.props.context.state.articlePostModal}
          contentStyle={style.contentStyle}
          bodyStyle={style.bodyStyle}
        >
          <div style={{height: '600px'}}>
            <input
              style={style.title}
              placeholder="請輸入標題"
              onChange={e => this.titleInput(e)}
            />
            <div>
              <button onClick={() => this.fileBtn()} style={style.picBtn}/>
              <input style={style.fileInput} id="file-upload" ref="fileInput" type="file"/>
            </div>
            <div
              ref="div1"
              contentEditable="true"
              placeholder="請輸入文章內容"
              onChange={e => this.contentInput(e)}
              style={style.textarea}
            >
            </div>
          </div>
        </Dialog>
      </div>
    );
  }


}