import React, { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles({
  field: {
    marginTop: 20,
  },
});

export function getExtension(filename) {
  if (!filename.includes(".", 1)) {
    return "";
  }
  let s = filename.split(".");
  return "." + s.pop();
}

function getBaseFilename(filename) {
  if (!filename.includes(".", 1)) {
    return filename;
  }
  let s = filename.split(".");
  s.pop();
  return s.join(".");
}

export default function FilePickerDialog({
  visible,
  onDismiss,
  onFileSelection,
}) {
  const styles = useStyles();
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const fileName = name + getExtension(file ? file.name : "");

  function reset() {
    setFile(null);
    setName("");
  }

  return (
    <Dialog
      fullWidth
      open={visible}
      onClose={() => {
        reset();
        onDismiss();
      }}
    >
      <DialogTitle>Add attachment</DialogTitle>
      <DialogContent>
        <input
          style={{ display: "none" }}
          id="contained-button-file"
          type="file"
          onChange={(event) => {
            let files = event.target.files;
            if (files.length === 1) {
              let file = files[0];
              setFile(file);
              setName(getBaseFilename(file.name));
            }
          }}
        />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <label htmlFor="contained-button-file">
            <Button variant="contained" color="primary" component="span">
              Select file
            </Button>
          </label>
          <div
            style={{ display: "flex", alignItems: "center", marginLeft: 16 }}
          >
            <Typography>{file && file.name}</Typography>
          </div>
        </div>
        <TextField
          className={styles.field}
          fullWidth
          variant="outlined"
          label="File name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            if (file !== null) {
              onFileSelection(file, fileName);
            }
            onDismiss();
            reset();
          }}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}
