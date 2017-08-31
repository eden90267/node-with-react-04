import React from 'react';
import {Router, browserHistory, Route, IndexRoute} from 'react-router';
import App from '../containers/App';
import Main from '../containers/Main';
import Login from "../components/Login";
import Register from "../components/Register";
import MyArticle from "../components/MyArticle";
import PersonalInfo from "../components/PersonalInfo";
import Chatroom from "../containers/Chatroom";

export default (
  <Router history={browserHistory} component={App}>
    <Route path="/" component={App}/>
    <IndexRoute path="/main" component={Main}/>
    <Route path="/main" component={Main}/>
    <Route path="/chatroom" component={Chatroom}/>
    <Route path="/login" component={Login}/>
    <Route path="/register" component={Register}/>
    <Route path="/personalinfo" component={PersonalInfo}/>
    <Route path="/myarticle" component={MyArticle}/>
  </Router>
);