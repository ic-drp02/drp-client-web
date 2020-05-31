import React, { useState, useCallback } from "react";

import {
  Typography,
  TextField,
  Grid,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import RichTextEditor from "../components/RichTextEditor";

import * as api from "../api";

const useStyles = makeStyles({
  field: {
    width: "100%",
  },
});

export default function CreatePost() {
  const styles = useStyles();
  const [state, setState] = useState({ title: "", summary: "", content: "" });
  const [loading, setLoading] = useState(false);

  const onPostButtonClick = useCallback(async () => {
    setLoading(true);

    const res = await api.createPost({
      title: state.title,
      summary: state.summary,
      content: state.content,
    });

    if (res.success) {
      //
    } else {
      console.warn("Post creation failed with status code " + res.status);
    }

    setLoading(false);
  }, [state]);

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
          onChange={(e) => setState({ ...state, title: e.target.value })}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          className={styles.field}
          label="Summary"
          variant="outlined"
          onChange={(e) => setState({ ...state, summary: e.target.value })}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <RichTextEditor
          onChange={(content) => setState({ ...state, content })}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container spacing={2} justify="flex-end">
          {loading && (
            <Grid item>
              <CircularProgress />
            </Grid>
          )}
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              onClick={onPostButtonClick}
            >
              Post
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
