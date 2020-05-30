import React from "react";

import { Typography, TextField, Grid, Button } from "@material-ui/core";

export default function Question() {
  return (
    <Grid container spacing={2} direction="column">
      <Typography style={{ margin: "16px 8px" }} variant="h2">
        Ask a question
      </Typography>
      <Grid item xs={12} md={6}>
        <TextField label="Site" variant="outlined" fullWidth />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField label="Your speciality" variant="outlined" fullWidth />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Query subject"
          variant="outlined"
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Query"
          variant="outlined"
          rows={10}
          fullWidth
          required
          multiline
        />
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </Grid>
    </Grid>
  );
}
