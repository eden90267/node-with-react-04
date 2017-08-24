import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import reducer from './reducers';

let finalCreateStore = compose(
  applyMiddleware(thunk, logger())
)(createStore);

export function configureStore(initialState) {
  return finalCreateStore(reducer, initialState);
}