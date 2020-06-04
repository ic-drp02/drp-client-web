import React from "react";

import { Typography, Grid } from "@material-ui/core";

import LatestPosts from "../components/LatestPosts.js";

export default function AllPosts() {
  return (
    <Grid container spacing={2} direction="row-reverse">
      <Grid item xs={12} md={3}>
        {/* Filter Menu */}
      </Grid>
      <Grid item xs={12} md={9}>
        <Typography style={{ marginBottom: 20 }} variant="h5">
          All Updates
        </Typography>
        <LatestPosts />
      </Grid>
    </Grid>
  );
}
