import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./src/App";
import * as serviceWorker from "./src/serviceWorker";
import { HashRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import appTheme from "./src/themes";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { reducer } from "./src/components/store/reducers";
import { authorization } from "./src/components/actions/index";

const store = createStore(reducer, applyMiddleware(thunk));

if (localStorage.token) {
  store.dispatch(authorization(true));
}

render(
  <ThemeProvider theme={appTheme}>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </ThemeProvider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
