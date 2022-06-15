import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { store } from "./state/store";
import App from "./components/App";
import "./styles.scss";

console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
