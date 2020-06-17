import React, { useEffect, useState } from "react";

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";

import api from "../api";
import { Add as AddIcon, Done as DoneIcon } from "@material-ui/icons";

/**
 * Returns `tags` with the `selected` property set to true on each item if the
 * item is in `selected`.
 * @param {Object[]} tags - Array of tags.
 * @param {Object[]} selected - Array of tags that should be selected.
 */
function setSelectedTags(tags, selected) {
  return tags.map((t) => {
    if (selected.find((s) => s.id === t.id)) {
      return { ...t, selected: true };
    } else {
      return { ...t, selected: false };
    }
  });
}

const useStyles = makeStyles({
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
  },
  tagsContainer: {
    marginTop: 8,
    marginBottom: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    margin: 4,
  },
  selected: {
    backgroundColor: "darkgrey !important",
  },
  button: {
    marginTop: 8,
    marginBottom: 8,
  },
});

function TagPickerDialogContent({ initialSelected, onSelectionChange }) {
  const [tags, setTags] = useState(null);
  const [matches, setMatches] = useState([]);
  const [value, setValue] = useState("");
  const styles = useStyles();

  useEffect(() => {
    api.getTags().then((res) => {
      const tags = setSelectedTags(res.data, initialSelected);
      setTags(tags);
      setMatches(tags);
    });
  }, [initialSelected]);

  if (tags === null) {
    return (
      <div className={styles.loadingContainer}>
        <CircularProgress />
      </div>
    );
  }

  function onSearchTextChange(e) {
    // Find all tags that contain the search text
    const matches = tags.filter((tag) =>
      tag.name.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setMatches(matches);
    setValue(e.target.value);
  }

  function onCreateTagPress() {
    api.createTag(value).then((res) => {
      setTags([...tags, res.data]);
      setMatches([...matches, res.data]);
    });
  }

  function onTagPress(tag) {
    const target = { ...tag, selected: !tag.selected };

    if (!!onSelectionChange) {
      onSelectionChange(target);
    }

    // Update old tags with the target tag's selection toggled
    const newTags = tags.map((t) => (t === tag ? target : t));
    const newMatches = matches.map((t) => (t === tag ? target : t));

    setTags(newTags);
    setMatches(newMatches);
  }

  // Only show button if the user has entered some text that
  // is not an exact match of an existing tag.
  const shouldShowCreateTagButton =
    !!value &&
    !matches.map((t) => t.name.toLowerCase()).includes(value.toLowerCase());

  return (
    <>
      <DialogContent>
        <TextField
          fullWidth
          variant="outlined"
          label="Tag name"
          onChange={onSearchTextChange}
        />
        {shouldShowCreateTagButton && (
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            className={styles.button}
            onClick={onCreateTagPress}
          >
            Create tag
          </Button>
        )}
        <div className={styles.tagsContainer}>
          <List>
            {matches.map((tag) => (
              <ListItem
                key={tag.id}
                button
                selected={!!tag.selected}
                onClick={() => onTagPress(tag)}
              >
                {tag.selected && (
                  <ListItemIcon>
                    <DoneIcon />
                  </ListItemIcon>
                )}
                <ListItemText primary={tag.name} />
              </ListItem>
            ))}
          </List>
        </div>
      </DialogContent>
    </>
  );
}

export default function TagPickerDialog({
  visible,
  initialSelected,
  onDismiss,
  onTagSelectionChange,
}) {
  return (
    <Dialog fullWidth open={visible} onClose={onDismiss}>
      <DialogTitle>Add tags</DialogTitle>
      <TagPickerDialogContent
        initialSelected={initialSelected}
        onSelectionChange={onTagSelectionChange}
      />
      <DialogActions>
        <Button onClick={onDismiss}>Done</Button>
      </DialogActions>
    </Dialog>
  );
}
