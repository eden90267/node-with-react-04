import React from 'react';
import './index.css';

const style = {
  title: {
    fontSize: '25px',
    color: 'black',
    marginTop: '20px',
    marginTop: '37px',
    marginLeft: '20px'
  },
  article: {
    borderBottom: '1px solid black',
    height: '100px',
    overflow: 'auto',
    display: 'flex',
    position: 'relative'
  },
  articleContainer: {
    height: '100%',
    width: '70%',
    margin: ' 0 auto',
    marginTop: '100px'
  },
  date: {
    position: 'absolute',
    right: '0px',
    bottom: '10px'
  },
  avatar: {
    width: '50px',
    height: '59px',
    marginTop: '20px',
    marginLeft: '20px'
  }
};

const ArticleBlock = (props) => (
  <div style={style.articleContainer}>
    {
      props.articles.map(i => (
        <div onClick={e => props.articleClick(e, i._id)} className="articleBlock" style={style.article} key={i._id}>
          <div style={style.avatar}>
            <img height="50px" width="60px" src={i.avatar}/>
          </div>
          <div style={style.title}>
            {i.title}
          </div>
          <div style={style.date}>{i.PostDate}</div>
        </div>
      ))
    }
  </div>
);

export default ArticleBlock;