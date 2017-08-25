import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import {todos} from './todoReducer';
import {userInfo} from "./userInfo";
import {article} from "./article";

const rootReducer = combineReducers({
  todos,
  userInfo,
  article,
  routing: routerReducer,
});

export default rootReducer;