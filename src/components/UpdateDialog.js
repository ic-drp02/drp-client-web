import React from "react";

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

export default function UpdateDialog({ selectedPost, onDismiss }) {
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
  };

  return (
    <Dialog
      fullScreen
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
        <Typography variant="h4">{selectedPost?.title}</Typography>
        <Typography variant="h5">{selectedPost?.summary}</Typography>
        <Chip
          icon={<DateRangeIcon />}
          label={new Date(selectedPost?.created_at).toDateString()}
          style={styles.date}
        ></Chip>

        <Grid container spacing={2} direction="column">
          <Grid item xs={12} md={6}>
            <Divider />
            <div
              dangerouslySetInnerHTML={{
                __html: selectedPost?.content,
              }}
            ></div>
            {selectedPost?.tags.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.name}
                style={styles.tag}
                color="primary"
              ></Chip>
            ))}
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Superseded guidelines */}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
