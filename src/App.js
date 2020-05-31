import React, { useState, useCallback } from "react";
import { Switch, Route, Link } from "react-router-dom";

import SearchIcon from "@material-ui/icons/Search";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Snackbar,
} from "@material-ui/core";

import Home from "./pages/Home.js";
import Question from "./pages/Question.js";
import CreatePost from "./pages/CreatePost.js";
import Admin from "./pages/Admin.js";

import logo from "./assets/icon_logo.png";
import logo_text from "./assets/icon_text.png";

import SnackbarContext from "./SnackbarContext";

export default function App() {
  const [snackbar, setSnackbar] = useState({
    open: false,
    show(message, duration) {
      setSnackbar({ ...snackbar, open: true, message, duration });
    },
  });

  const hideSnackbar = useCallback(
    () => setSnackbar({ ...snackbar, open: false }),
    [snackbar]
  );

  return (
    <SnackbarContext.Provider value={snackbar}>
      <AppBar position="sticky" color="default">
        <Toolbar>
          <Link to="/">
            <span>
              <img height="24" src={logo} alt="" style={{ marginRight: 12 }} />
              <img height="24" src={logo_text} alt="" />
            </span>
          </Link>
          <section style={{ marginLeft: "auto" }}>
            <IconButton aria-label="search">
              <SearchIcon />
            </IconButton>
            <Link to="/admin" style={{ textDecoration: "none" }}>
              <Button variant="outlined" color="primary">
                Admin Dashboard
              </Button>
            </Link>
          </section>
        </Toolbar>
      </AppBar>
      <div style={{ padding: 25 }}>
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/posts/create" component={CreatePost} />
          <Route path="/question" component={Question} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
      <Snackbar
        open={snackbar.open}
        message={snackbar.message}
        autoHideDuration={snackbar.duration}
        onClose={hideSnackbar}
        action={
          <Button color="secondary" size="small" onClick={hideSnackbar}>
            hide
          </Button>
        }
      />
    </SnackbarContext.Provider>
  );
}
