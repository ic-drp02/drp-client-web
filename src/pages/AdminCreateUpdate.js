import React, { useState, useCallback, useContext } from "react";
import { useHistory } from "react-router-dom";

import { Add as AddIcon } from "@material-ui/icons";
import {
  Button,
  Chip,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  Switch,
} from "@material-ui/core";

import RichTextEditor from "../components/RichTextEditor";
import TagPickerDialog from "../components/TagPickerDialog";
import GuidelinePickerDialog from "../components/GuidelinePickerDialog";
import GuidelineCard from "../components/GuidelineCard";
import SnackbarContext from "../SnackbarContext";

import api from "../api";

const styles = {
  field: {
    width: "100%",
  },
  chip: {
    margin: 4,
  },
  textWithSpace: {
    display: "flex",
    justifyContent: "space-between",
  },
};

export default function AdminCreateUpdate() {
  const [state, setState] = useState({
    title: "",
    summary: "",
    content: "",
    tags: [],
  });
  const [loading, setLoading] = useState(false);
  const [showTagPicker, setShowTagPicker] = useState(false);
  const [guideline, setGuideline] = useState(false);
  const [supersedes, setSupersedes] = useState(null);
  const [guidelinePicker, setGuidelinePicker] = useState(false);

  const snackbar = useContext(SnackbarContext);
  const history = useHistory();

  const handleGuidelineChange = () => {
    setGuideline(!guideline);
    setSupersedes(null);
  };

  const handleSupersededChange = () => {
    if (!supersedes) {
      setSupersedes(true);
      setGuidelinePicker(true);
      return;
    }
    setSupersedes(null);
  };

  const onPostButtonClick = useCallback(async () => {
    setLoading(true);

    const res = await api.createPost({
      ...state,
      is_guideline: guideline,
      superseding: supersedes ? supersedes.id : undefined,
      tags: state.tags.map((t) => t.name),
    });

    if (res.success) {
      history.push("/admin/updates");
      snackbar.show("Posted", 3000);
    } else {
      console.warn("Post creation failed with status code " + res.status);
    }
  }, [state, guideline, supersedes, snackbar, history]);

  return (
    <Grid container spacing={4} direction="row">
      {/* Title */}
      <Grid item xs={12} md={12}>
        <Typography variant="h2">Post an update</Typography>
      </Grid>

      {/* Text + Tags Form */}
      <Grid item xs={12} md={6}>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <TextField
              style={styles.field}
              label="Title"
              variant="outlined"
              required
              onChange={(e) => setState({ ...state, title: e.target.value })}
            />
          </Grid>
          <Grid item>
            <TextField
              style={styles.field}
              label="Summary"
              variant="outlined"
              onChange={(e) => setState({ ...state, summary: e.target.value })}
            />
          </Grid>
          <Grid item>
            <RichTextEditor
              onChange={(content) => setState({ ...state, content })}
            />
          </Grid>
          <Grid item>
            {state.tags.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.name}
                variant="outlined"
                style={styles.chip}
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
              style={styles.chip}
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
        </Grid>
      </Grid>

      {/* Guideline Options */}
      <Grid item xs={12} md={4}>
        <Grid container spacing={2} direction="column">
          {/* Guideline Check */}
          <Grid item>
            <div style={styles.textWithSpace}>
              <Typography style={{ alignSelf: "center" }}>
                Is this a guideline?
              </Typography>
              <Switch
                color="primary"
                checked={guideline}
                onChange={handleGuidelineChange}
              />
            </div>
          </Grid>

          {/* Superseded guideline check */}
          {guideline && (
            <Grid item>
              <div style={styles.textWithSpace}>
                <Typography style={{ alignSelf: "center" }}>
                  Does this supersede an old guideline?
                </Typography>
                <Switch
                  color="primary"
                  checked={supersedes}
                  onChange={handleSupersededChange}
                />
              </div>
            </Grid>
          )}

          {/* Superseded guideline picker */}
          <GuidelinePickerDialog
            visible={guidelinePicker}
            onDismiss={() => {
              setSupersedes(null);
              setGuidelinePicker(false);
            }}
            onSelect={(post) => {
              setSupersedes(post);
              setGuidelinePicker(false);
            }}
          ></GuidelinePickerDialog>

          {/* Superseded guideline view */}
          <Grid item>
            {guideline && supersedes != null ? (
              <div>
                <Typography style={{ marginBottom: 15 }}>
                  This guideline will supersede:
                </Typography>
                <GuidelineCard
                  guideline={supersedes}
                  showRemove
                  onRemove={() => setSupersedes(null)}
                />
              </div>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Grid>

      {/* Post Button */}
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
