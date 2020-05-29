import React from "react";

import { Switch, Route, Link } from "react-router-dom";
import { AppBar, Button, IconButton, Toolbar } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Home from "./pages/Home.js";
import Question from "./pages/Question.js";
import PostUpdate from "./pages/PostUpdate.js";
import Admin from "./pages/Admin.js";

import logo from "./assets/icon_logo.png";
import logo_text from "./assets/icon_text.png";

export default function App() {
  return (
    <>
      <AppBar position="static" color="default">
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
          <Route path="/postupdate" component={PostUpdate} />
          <Route path="/question" component={Question} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </>
  );
}
