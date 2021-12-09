import React from "react";
import ReactDOM from "react-dom";
import StylesProvider from "@material-ui/styles/StylesProvider";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <StylesProvider injectFirst>
      <App />
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
