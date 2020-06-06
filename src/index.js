import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";

import { createMuiTheme, ThemeProvider } from "@material-ui/core";

import "./index.css";

import App from "./App";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0235ee",
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Router>
      <App />
    </Router>
  </ThemeProvider>,
  document.getElementById("root")
);
