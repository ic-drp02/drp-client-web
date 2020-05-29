import React from "react";

import { Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";

export default function Home() {
  return (
    <>
      <Typography variant="h5">Recently viewed</Typography>
      <Typography variant="h5">Latest updates</Typography>
      <Link to="/question" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary">
          Ask a question
        </Button>
      </Link>
      <Link to="/postupdate" style={{ textDecoration: "none" }}>
        <Button variant="contained" color="primary">
          Post an update
        </Button>
      </Link>
    </>
  );
}
