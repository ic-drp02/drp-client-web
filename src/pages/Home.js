import React from "react";
import { Link } from "react-router-dom";

import { Button, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import FileCard from "../components/FileCard.js";
import PostSummary from "../components/PostSummary.js";

const useStyles = makeStyles({
  button: {
    width: "100%",
    height: 50,
  },
  sectionTitle: { marginBottom: 20 },
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
            <Link to="/postupdate" style={{ textDecoration: "none" }}>
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
        <Typography className={styles.sectionTitle} variant="h5">
          Latest updates
        </Typography>
        <PostSummary />
        <PostSummary />
      </Grid>
    </Grid>
  );
}
