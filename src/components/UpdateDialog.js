import React, { useState, useEffect } from "react";

import {
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  Toolbar,
  AppBar,
  Chip,
  Divider,
  Grid,
} from "@material-ui/core";

import {
  Close as CloseIcon,
  DateRange as DateRangeIcon,
} from "@material-ui/icons";

import GuidelineCard from "../components/GuidelineCard";
import FileCard from "../components/FileCard";

import moment from "moment";
import api from "../api";

export default function UpdateDialog({ selectedPost, onDismiss }) {
  const [revisions, setRevisions] = useState(null);

  useEffect(() => {
    async function loadRevisions() {
      try {
        const reverse = true;
        const res = await api.getGuidelineRevisions(selectedPost.id, reverse);
        if (res.success) {
          setRevisions(res.data);
        } else {
          console.warn(
            "Failed to get guideline revisions with status " + res.status
          );
        }
      } catch (error) {
        console.warn(error);
      }
    }
    if (selectedPost.is_guideline) {
      loadRevisions();
    }
  }, [selectedPost]);

  const styles = {
    closeButton: {
      color: "white",
    },
    toolbar: {
      justifyContent: "space-between",
      paddingLeft: 40,
    },
    content: {
      padding: 40,
    },
    date: {
      marginBottom: 5,
      marginTop: 10,
    },
    tag: {
      marginTop: 10,
      marginRight: 5,
    },
    attachText: {
      marginTop: 10,
      marginBottom: 10,
    },
    lineCenter: {
      display: "flex",
      justifyContent: "center",
    },
    line: {
      borderLeft: "3px solid grey",
      height: 25,
    },
  };

  return (
    <Dialog
      fullWidth
      maxWidth={"lg"}
      open={selectedPost != null ? true : false}
      onClose={onDismiss}
    >
      <AppBar position="relative">
        <Toolbar style={styles.toolbar}>
          <Typography variant="h5">Viewing update</Typography>
          <IconButton onClick={onDismiss} aria-label="close">
            <CloseIcon style={styles.closeButton} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent style={styles.content}>
        <Typography variant="h4">{selectedPost.title}</Typography>
        <Typography variant="h5">{selectedPost.summary}</Typography>
        <Chip
          icon={<DateRangeIcon />}
          label={moment(selectedPost.created_at).format(
            "ddd, Do MMM YYYY, H:mm"
          )}
          style={styles.date}
        ></Chip>

        <Grid container spacing={6} direction="row">
          <Grid item xs={12} md={8}>
            <Divider />
            <div
              dangerouslySetInnerHTML={{
                __html: selectedPost.content,
              }}
            ></div>
            {selectedPost.tags.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.name}
                style={styles.tag}
                color="primary"
              ></Chip>
            ))}
            {selectedPost.files.length !== 0 && (
              <div>
                <Typography style={styles.attachText}>
                  Attached files:
                </Typography>
                {selectedPost.files.map((file) => (
                  <FileCard key={file.id} file={file} />
                ))}
              </div>
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            {/* If revisions exist then show them */}
            {revisions && (
              <div>
                <Typography variant="h6" style={{ marginBottom: 20 }}>
                  Guideline history:
                </Typography>
                {revisions.map((r, index) => (
                  <div key={index}>
                    <GuidelineCard guideline={r} />

                    {/* Check if not last */}
                    {revisions[index + 1] && (
                      <div style={styles.lineCenter}>
                        <div style={styles.line}></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
