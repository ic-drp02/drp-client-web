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

export default function Question() {
  const styles = useStyles();

  return (
    <>
      <Typography variant="h2">Ask a question</Typography>
      <Grid>
        <Grid item>
          <TextField className={styles.field} label="Site" variant="outlined" />
        </Grid>
        <Grid item>
          <TextField
            className={styles.field}
            label="Your speciality"
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <TextField
            className={styles.field}
            label="Query subject"
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <TextField
            className={styles.field}
            label="Query"
            multiline
            rows={10}
            variant="outlined"
          />
        </Grid>
        <Button variant="contained" className={styles.button}>
          Submit
        </Button>
      </Grid>
    </>
  );
}
