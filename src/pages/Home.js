import React from "react";
import { Link } from "react-router-dom";

import { Button, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import FileCard from "../components/FileCard.js";
import LatestPosts from "../components/LatestPosts.js";

const useStyles = makeStyles({
  button: {
    width: "100%",
    height: 50,
  },
  sectionTitle: { marginBottom: 20 },
  sectionTitleWithButton: {
    marginBottom: 20,
    display: "flex",
    justifyContent: "space-between",
  },
});

export default function Home() {
  const styles = useStyles();

  return (
    <Grid container spacing={2} direction="row-reverse">
      <Grid item xs={12} md={3}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={12}>
            <Link to="/question" style={{ textDecoration: "none" }}>
              <Button
                className={styles.button}
                variant="contained"
                color="primary"
              >
                Ask a question
              </Button>
            </Link>
          </Grid>
          <Grid item xs={6} md={12}>
            <Link to="/posts/create" style={{ textDecoration: "none" }}>
              <Button
                className={styles.button}
                variant="contained"
                color="primary"
              >
                Post an update
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={9}>
        <Typography className={styles.sectionTitle} variant="h5">
          Recently viewed
        </Typography>
        <FileCard />
        <Typography className={styles.sectionTitleWithButton} variant="h5">
          Latest updates
          {/* <Link to="/posts" style={{ textDecoration: "none" }}>
            <Button color="primary">View all</Button>
          </Link> */}
        </Typography>
        <div style={{ marginRight: 20 }}>
          <LatestPosts />
        </div>
      </Grid>
    </Grid>
  );
}
