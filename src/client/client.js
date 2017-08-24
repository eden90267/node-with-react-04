import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {MuiThemeProvider} from "material-ui";
import {browserHistory, Router} from "react-router";
import injectTapEventPlugin from 'react-tap-event-plugin';

import {configureStore} from "../redux/store";
import root from "./root";

const initialState = window.__PRELOADED_STATE__;
injectTapEventPlugin();
const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={browserHistory} routes={root}/>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app')
);