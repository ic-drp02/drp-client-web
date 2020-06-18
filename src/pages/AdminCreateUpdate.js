import React, { useState, useCallback, useContext, useEffect } from "react";
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
import FilePickerDialog from "../components/FilePickerDialog";
import GuidelinePickerDialog from "../components/GuidelinePickerDialog";
import QuestionPickerDialog from "../components/QuestionPickerDialog";
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
    files: [],
    names: [],
    resolves: [],
  });
  const [loading, setLoading] = useState(false);
  const [showTagPicker, setShowTagPicker] = useState(false);
  const [showFilePicker, setShowFilePicker] = useState(false);
  const [guideline, setGuideline] = useState(false);
  const [supersedes, setSupersedes] = useState(null);
  const [guidelinePicker, setGuidelinePicker] = useState(false);
  const [showQuestionPicker, setShowQuestionPicker] = useState(false);
  const [questions, setQuestions] = useState([]);

  const snackbar = useContext(SnackbarContext);
  const history = useHistory();

  useEffect(() => {
    api.getQuestions().then((res) => {
      setQuestions(res.data.filter((q) => !q.resolved));
    });
  }, []);

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

  function handleAutoFill(guideline) {
    if (!state.title && !state.summary) {
      setState({
        ...state,
        title: guideline.title,
        summary: guideline.summary,
      });
    }
  }

  const onPostButtonClick = useCallback(async () => {
    setLoading(true);

    const res = await api.createPost({
      ...state,
      is_guideline: guideline,
      updates: supersedes ? supersedes.id : undefined,
      tags: state.tags.map((t) => t.name),
      resolves: state.resolves.map((r) => r.id),
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
        <Typography variant="h3">Post an update</Typography>
      </Grid>

      {/* Text + Tags Form */}
      <Grid item xs={12} md={6}>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <TextField
              style={styles.field}
              label="Title"
              value={state.title}
              variant="outlined"
              required
              onChange={(e) => setState({ ...state, title: e.target.value })}
            />
          </Grid>
          <Grid item>
            <TextField
              style={styles.field}
              label="Summary"
              value={state.summary}
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
          <Grid item xs={12} md={6}>
            {state.names.map((name, index) => (
              <Chip
                key={index}
                label={name}
                variant="outlined"
                style={styles.chip}
                onDelete={() =>
                  setState({
                    ...state,
                    files: state.files.filter((_, i) => i !== index),
                    names: state.names.filter((_, i) => i !== index),
                  })
                }
              />
            ))}
            <Chip
              icon={<AddIcon />}
              label="Add attachment"
              color="primary"
              style={styles.chip}
              onClick={() => setShowFilePicker(true)}
            />
            <FilePickerDialog
              visible={showFilePicker}
              onDismiss={() => setShowFilePicker(false)}
              onFileSelection={(file, name) =>
                setState({
                  ...state,
                  files: [...state.files, file],
                  names: [...state.names, name],
                })
              }
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
                  checked={supersedes != null ? true : false}
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
            onSelect={(guideline) => {
              setSupersedes(guideline);
              setGuidelinePicker(false);
              handleAutoFill(guideline);
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

          {/* Resolved questions picker button */}
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => setShowQuestionPicker(true)}
            >
              Choose resolved questions
            </Button>
          </Grid>

          {/* Resolved questions picker */}
          <QuestionPickerDialog
            visible={showQuestionPicker}
            questions={questions}
            selected={state.resolves}
            onDismiss={() => {
              setShowQuestionPicker(false);
            }}
            onSelection={(question) => {
              if (question.selected === true) {
                setState({ ...state, resolves: [...state.resolves, question] });
              } else {
                setState({
                  ...state,
                  resolves: state.resolves.filter((q) => q.id !== question.id),
                });
              }
            }}
          ></QuestionPickerDialog>

          {/* Resolved questions view */}
          <Grid item>
            <Typography style={{ marginBottom: 15 }}>
              This post will resolve {state.resolves.length} question
              {state.resolves.length === 1 ? "" : "s"}.
            </Typography>
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
