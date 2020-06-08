import React from "react";

import { Card, Typography, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    width: "100%",
    marginBottom: 10,
    padding: 10,
  },
  chip: {
    marginRight: 10,
    marginTop: 10,
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
      {props.tags && props.tags.length > 0 ? (
        props.tags.map((t) => (
          <Chip label={t.name} color="primary" className={styles.chip} />
        ))
      ) : (
        <></>
      )}

      {/* TODO: Display author, time */}
    </Card>
  );
}
