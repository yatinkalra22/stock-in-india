import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Root from "./root";
import * as serviceWorker from "./serviceWorker";
import MetaTags from "react-meta-tags";

ReactDOM.render(
  <Root>
    <MetaTags>
      <title> Stock In India</title>
      <meta property="og:title" content="Stock In India" />
      <meta
        http-equiv="Content-Security-Policy"
        content="upgrade-insecure-requests"
      />
    </MetaTags>
    <App />
  </Root>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.unregister();
