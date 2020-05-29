import React from "react";

import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    backgroundColor: "#e5e5e5",
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
});

export default function PostSummary() {
  const styles = useStyles();

  return <Card elevation={0} className={styles.card} />;
}
