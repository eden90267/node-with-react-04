import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import {todos} from './todoReducer';
import {userInfo} from "./userInfo";
import {article} from "./article";
import {waiting} from "./waiting";

const rootReducer = combineReducers({
  waiting,
  todos,
  userInfo,
  article,
  routing: routerReducer,
});

export default rootReducer;