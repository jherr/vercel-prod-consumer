import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

import Header from "header/Header";

const App = () => (
  <div>
    <Header />
    <div>Hi, I'm a consumer!</div>
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
