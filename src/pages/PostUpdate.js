import React from "react";

import { Typography, TextField, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  field: {
    width: "35%",
    marginTop: 25,
  },
  button: {
    marginTop: 25,
  },
});

export default function PostUpdate() {
  const styles = useStyles();

  return (
    <Grid>
      <Typography variant="h2">Post an update</Typography>
      <Grid item xs={12}>
        <TextField
          className={styles.field}
          label="Title"
          variant="outlined"
          required
        />
      </Grid>
      <Grid item>
        <TextField
          className={styles.field}
          label="Summary"
          variant="outlined"
        />
      </Grid>
      <Grid item>
        <TextField
          className={styles.field}
          label="Post Text"
          variant="outlined"
          rows={10}
          required
          multiline
        />
      </Grid>
      <Button variant="contained" className={styles.button} color="primary">
        Post
      </Button>
    </Grid>
  );
}
