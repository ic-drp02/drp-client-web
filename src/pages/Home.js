import React from "react";

import { Link } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import FileCard from "../components/FileCard.js";
import PostSummary from "../components/PostSummary.js";

const useStyles = makeStyles({
  button: {
    width: "100%",
    height: 50,
    marginBottom: 20,
  },
  sectionTitle: { marginBottom: 20 },
  container: { display: "flex" },
  contentPane: { flexGrow: 1 },
  buttonPane: { width: 200 },
});

export default function Home() {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <div className={styles.contentPane}>
        <Typography className={styles.sectionTitle} variant="h5">
          Recently viewed
        </Typography>
        <FileCard />
        <Typography className={styles.sectionTitle} variant="h5">
          Latest updates
        </Typography>
        <PostSummary />
        <PostSummary />
      </div>
      <div className={styles.buttonPane}>
        <Link to="/question" style={{ textDecoration: "none" }}>
          <Button className={styles.button} variant="contained" color="primary">
            Ask a question
          </Button>
        </Link>
        <Link to="/postupdate" style={{ textDecoration: "none" }}>
          <Button className={styles.button} variant="contained" color="primary">
            Post an update
          </Button>
        </Link>
      </div>
    </div>
  );
}
