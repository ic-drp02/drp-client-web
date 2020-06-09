import React from "react";

import moment from "moment";
import { Card, Typography, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    width: "100%",
    marginBottom: 16,
    padding: 16,
  },
  chip: {
    marginRight: 10,
    marginTop: 10,
  },
  date: {
    fontSize: 14,
    color: "grey",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
  },
});

export default function PostSummary(props) {
  const styles = useStyles();

  return (
    <Card elevation={2} className={styles.card}>
      <Typography variant="h6" className={styles.title}>
        {props.title}
        <span className={styles.date}>{moment(props.createdAt).fromNow()}</span>
      </Typography>
      <Typography>{props.summary}</Typography>
      <Typography>
        {/* TODO: Use a different method for content? */}
        <span dangerouslySetInnerHTML={{ __html: props.content }} />
      </Typography>
      {props.tags && props.tags.length > 0 ? (
        props.tags.map((t) => (
          <Chip
            key={t.id}
            label={t.name}
            color="primary"
            className={styles.chip}
          />
        ))
      ) : (
        <></>
      )}
    </Card>
  );
}
