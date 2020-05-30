import React from "react";

import { Typography, TextField, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import RichTextEditor from "../components/RichTextEditor";

const useStyles = makeStyles({
  field: {
    width: "100%",
  },
});

export default function CreatePost() {
  const styles = useStyles();
  return (
    <Grid container spacing={2} direction="column">
      <div style={{ margin: "16px 8px" }}>
        <Typography variant="h2">Post an update</Typography>
      </div>
      <Grid item xs={12} md={6}>
        <TextField
          className={styles.field}
          label="Title"
          variant="outlined"
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          className={styles.field}
          label="Summary"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <RichTextEditor />
      </Grid>
      <Grid item xs={12} md={6}>
        <Button variant="contained" color="primary">
          Post
        </Button>
      </Grid>
    </Grid>
  );
}
