import React from "react";

import { AppBar, Toolbar, Typography } from "@material-ui/core";

import logo from "./icon_logo.png";
import logo_text from "./icon_text.png";

function App() {
  return (
    <>
      <AppBar position="static" color="default">
        <Toolbar>
          <span>
            <img height="24" src={logo} alt="" style={{ marginRight: 12 }} />
            <img height="24" src={logo_text} alt="" />
          </span>
        </Toolbar>
      </AppBar>
      <div style={{ padding: 16 }}>
        <Typography variant="h2">Hello, world!</Typography>
      </div>
    </>
  );
}

export default App;
