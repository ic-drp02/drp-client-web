import React, { useState, useCallback, useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Button, Snackbar } from "@material-ui/core";

import AppFrame from "./components/AppFrame";

import Login from "./pages/Login";
import Home from "./pages/Home.js";
import Account from "./pages/Account";
import AdminCreateUpdate from "./pages/AdminCreateUpdate.js";
import AdminUpdates from "./pages/AdminUpdates.js";
import AdminTags from "./pages/AdminTags";
import AdminQuestions from "./pages/AdminQuestions";
import AdminSites from "./pages/AdminSites.js";
import AdminSubjects from "./pages/AdminSubjects.js";
import AdminUsers from "./pages/AdminUsers";

import AuthContext from "./AuthContext";
import SnackbarContext from "./SnackbarContext";

function AuthRoute({ component, admin, ...rest }) {
  const Component = component;
  const auth = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (admin && auth.user.role !== "admin") {
          return <Redirect to={{ pathname: "/" }} />;
        }

        const currentTime = Date.now() / 1000;
        return !!auth.user && currentTime < auth.user.expires ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        );
      }}
    />
  );
}

export default function App() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
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
        <AppFrame>
          <Switch>
            <AuthRoute admin path="/admin/tags" component={AdminTags} />
            <AuthRoute
              admin
              path="/admin/questions/sites"
              component={AdminSites}
            />
            <AuthRoute
              admin
              path="/admin/questions/subjects"
              component={AdminSubjects}
            />
            <AuthRoute
              admin
              path="/admin/questions"
              component={AdminQuestions}
            />
            <AuthRoute admin path="/admin/users" component={AdminUsers} />
            <AuthRoute
              admin
              path="/admin/updates/create"
              component={AdminCreateUpdate}
            />
            <AuthRoute admin path="/admin/updates" component={AdminUpdates} />
            <Route path="/account" component={Account} />
            <Route path="/login" component={Login} />
            <AuthRoute path="/" component={Home} />
          </Switch>
        </AppFrame>
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
