import React from "react";

import { Card, CardActions, Button, Typography } from "@material-ui/core";

import {
  GetApp as GetAppIcon,
  Visibility as VisibilityIcon,
} from "@material-ui/icons";

export default function FileCard({ file }) {
  const styles = {
    attachment: {
      backgroundColor: "#2f80ed",
      color: "white",
      maxWidth: 500,
    },
    button: {
      color: "white",
    },
    name: {
      padding: 10,
      textAlign: "center",
    },
    rightAlign: {
      display: "flex",
      justifyContent: "flex-end",
    },
  };

  return (
    <Card key={file.id} style={styles.attachment}>
      <Typography style={styles.name}>{file.name}</Typography>
      <CardActions style={styles.rightAlign}>
        <Button
          target="_blank"
          href={"api/rawfiles/view/" + file.id}
          startIcon={<VisibilityIcon />}
          style={styles.button}
        >
          View
        </Button>
        <Button
          target="_blank"
          href={"api/rawfiles/download/" + file.id}
          startIcon={<GetAppIcon />}
          style={styles.button}
        >
          Download
        </Button>
      </CardActions>
    </Card>
  );
}
