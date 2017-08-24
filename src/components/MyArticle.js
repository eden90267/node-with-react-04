import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Divider, IconButton, IconMenu, List, ListItem, MenuItem, Subheader} from "material-ui";
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {darkBlack, grey400} from "material-ui/styles/colors";
import axios from "axios";
import Loading from "./utils/Loading/index";
import ArticleContentModal from "./utils/ArticleContentModal";


const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="選單"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400}/>
  </IconButton>
);

const rightIconMenu = (context, article) => (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem onClick={() => context.clickArticle(article._id)}>修改</MenuItem>
    <MenuItem>刪除</MenuItem>
  </IconMenu>
);

class MyArticle extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      userInfoFlag: true, // componentWillReceiveProps會接到多次，所以確保不重複dispatch 加flag
      articles: [],
      loading: true,
      articleContentModal: false,
      activeArticle: '',
      content: ''
    };
  }

  clickArticle = (id) => {
    this.setState({articleContentModal: true});
    this.state.articles.forEach(i => {
      if (i._id === id) {
        this.setState({activeArticle: i});
      }
    });
  };

  contentInput = e => {
    this.setState({content: e.target.value});
    console.log(e);
  };

  handleConfirm = () => {
    this.setState({articleContentModal: false});
    axios
      .put('/updateArticle', {
        content: this.refs.content1.refs.div1.innerHTML,
        id: this.state.activeArticle._id
      })
      .then(response => {
        this.setState({articles: response.data}, () => {
          console.log(this.state.articles);
          this.forceUpdate();
        });
      });
  };

  componentWillMount() {
    if (this.props.userInfo) {
      axios
        .get('/userArticles/' + this.props.userInfo.account)
        .then(response => {
          console.log(response);
          this.setState({articles: response.data});
          this.setState({loading: false});
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userInfo) {
      if (this.state.userInfoFlag) {
        this.setState({userInfoFlag: false});
        axios
          .get('/userArticles/' + this.props.userInfo.account)
          .then(response => {
            this.setState({articles: response.data});
            this.setState({loading: false});
          });
      }
    }
  }

  render() {
    return (
      <div>
        <List>
          <Subheader>文章列表</Subheader>
          {this.state.loading ? <Loading/> : ''}
          {
            this.state.articleContentModal
              ?
              <ArticleContentModal
                ref="content1"
                contentInput={e => this.contentInput(e)}
                user={this.props.user}
                context={this}
                activeArticle={this.state.activeArticle}
                confirmBtn={true}
                contentEditable={true}
              />
              :
              ''
          }

          {
            this.state.articles.map((article, idx) => {
              return (
                <div key={idx}>
                  <ListItem
                    rightIconButton={rightIconMenu(this, article)}
                    primaryText={'作者：' + article.posterName}
                    secondaryText={
                      <p>
                        <span style={{color: darkBlack}}>標題：{article.title}</span>
                        <br/>
                        發表時間：{article.PostDate}
                      </p>
                    }
                    secondaryTextLines={2}
                  />
                  <Divider inset={true}/>
                </div>
              )
            })
          }
        </List>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  articles: state.article
});

export default connect(mapStateToProps, {})(MyArticle);