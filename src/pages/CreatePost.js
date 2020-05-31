import React, { useState, useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Add as AddIcon } from "@material-ui/icons";
import {
  Button,
  Chip,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

import RichTextEditor from "../components/RichTextEditor";
import TagPickerDialog from "../components/TagPickerDialog";
import SnackbarContext from "../SnackbarContext";

import api from "../api";

const useStyles = makeStyles({
  field: {
    width: "100%",
  },
  chip: {
    margin: 4,
  },
});

export default function CreatePost() {
  const styles = useStyles();
  const [state, setState] = useState({
    title: "",
    summary: "",
    content: "",
    tags: [],
  });
  const [loading, setLoading] = useState(false);
  const [showTagPicker, setShowTagPicker] = useState(false);
  const snackbar = useContext(SnackbarContext);
  const history = useHistory();

  const onPostButtonClick = useCallback(async () => {
    setLoading(true);

    const res = await api.createPost({
      ...state,
      tags: state.tags.map((t) => t.name),
    });

    if (res.success) {
      history.push("/");
      snackbar.show("Posted", 3000);
    } else {
      console.warn("Post creation failed with status code " + res.status);
    }
  }, [state, snackbar, history]);

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
        {state.tags.map((tag) => (
          <Chip
            key={tag.id}
            label={tag.name}
            variant="outlined"
            className={styles.chip}
            onClick={() => setShowTagPicker(true)}
            onDelete={() =>
              setState({
                ...state,
                tags: state.tags.filter((t) => t.id !== tag.id),
              })
            }
          />
        ))}
        <Chip
          icon={<AddIcon />}
          label="Add tag"
          color="primary"
          className={styles.chip}
          onClick={() => setShowTagPicker(true)}
        />
        <TagPickerDialog
          visible={showTagPicker}
          initialSelected={state.tags}
          onDismiss={() => setShowTagPicker(false)}
          onTagSelectionChange={(tag) => {
            if (tag.selected) {
              setState({ ...state, tags: [...state.tags, tag] });
            } else {
              setState({
                ...state,
                tags: state.tags.filter((t) => t.id !== tag.id),
              });
            }
          }}
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
