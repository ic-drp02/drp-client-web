import React from "react";

import { Card, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    width: "100%",
    marginBottom: 10,
    padding: 10,
  },
});

export default function PostSummary(props) {
  const styles = useStyles();

  return (
    <Card elevation={2} className={styles.card}>
      <Typography variant="h6">{props.title}</Typography>
      <Typography>{props.summary}</Typography>
      <Typography>
        {/* TODO: Use a different method for content? */}
        <div dangerouslySetInnerHTML={{ __html: props.content }} />
      </Typography>
      {/* TODO: Display tags, author, time */}
    </Card>
  );
}
