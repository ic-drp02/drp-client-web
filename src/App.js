import React, { useState, useCallback, useContext } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";

import SearchIcon from "@material-ui/icons/Search";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Snackbar,
} from "@material-ui/core";

import Login from "./pages/Login";
import Home from "./pages/Home.js";
import Question from "./pages/Question.js";
import CreatePost from "./pages/CreatePost.js";
import AllPosts from "./pages/AllPosts.js";
import Admin from "./pages/Admin.js";
import AdminUpdates from "./pages/AdminUpdates.js";
import AdminTags from "./pages/AdminTags";
import AdminQuestions from "./pages/AdminQuestions";
import AdminSites from "./pages/AdminSites.js";
import AdminSubjects from "./pages/AdminSubjects.js";

import logo from "./assets/icon_logo.png";
import logo_text from "./assets/icon_text.png";

import AuthContext from "./AuthContext";
import SnackbarContext from "./SnackbarContext";

function AuthRoute({ component, ...rest }) {
  const Component = component;
  const auth = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !!auth.user ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
}

export default function App() {
  const [user, setUser] = useState(null);
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
    <AuthContext.Provider value={{ user, setUser }}>
      <SnackbarContext.Provider value={snackbar}>
        <AppBar position="sticky" color="default">
          <Toolbar>
            <Link to="/">
              <span>
                <img
                  height="24"
                  src={logo}
                  alt=""
                  style={{ marginRight: 12 }}
                />
                <img height="24" src={logo_text} alt="" />
              </span>
            </Link>
            {!!user && user.role === "admin" && (
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
            )}
          </Toolbar>
        </AppBar>
        <div style={{ padding: 25 }}>
          <Switch>
            <AuthRoute path="/admin/updates" component={AdminUpdates} />
            <AuthRoute path="/admin/tags" component={AdminTags} />
            <AuthRoute path="/admin/questions/sites" component={AdminSites} />
            <AuthRoute
              path="/admin/questions/subjects"
              component={AdminSubjects}
            />
            <AuthRoute path="/admin/questions" component={AdminQuestions} />
            <AuthRoute path="/admin" component={Admin} />
            <AuthRoute path="/posts/create" component={CreatePost} />
            <AuthRoute path="/posts" component={AllPosts} />
            <AuthRoute path="/question" component={Question} />
            <Route path="/login" component={Login} />
            <AuthRoute path="/" component={Home} />
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
    </AuthContext.Provider>
  );
}
