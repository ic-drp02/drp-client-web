import React from "react";
import {
  Typography,
  Card,
  Chip,
  Button,
  CardActionArea,
} from "@material-ui/core";

import DateRangeIcon from "@material-ui/icons/DateRange";

import moment from "moment";

export default function GuidelineCard({
  guideline,
  onCardPress,
  clickable,
  showRemove,
  onRemove,
}) {
  const styles = {
    guidelineCard: {
      width: "100%",
    },
    cardContent: {
      padding: 10,
    },
    title: {
      fontWeight: "bold",
      fontSize: 18,
    },
    summary: {
      color: "grey",
    },
    buttonDiv: {
      display: "flex",
      justifyContent: "flex-end",
    },
    dateView: {
      marginTop: 4,
    },
  };

  const ConditionalWrapper = ({ cond, wrapper, children }) =>
    cond ? wrapper(children) : children;

  return (
    <Card style={styles.guidelineCard} elevation={2}>
      <ConditionalWrapper
        cond={clickable}
        wrapper={(children) => (
          <CardActionArea onClick={() => (onCardPress ? onCardPress() : {})}>
            {children}
          </CardActionArea>
        )}
      >
        <div style={styles.cardContent}>
          <Typography style={styles.title}>{guideline.title}</Typography>
          {guideline.summary !== "" && (
            <Typography style={styles.summary}>{guideline.summary}</Typography>
          )}
          <div style={styles.dateView}>
            <Chip
              icon={<DateRangeIcon />}
              label={moment(guideline.created_at).format(
                "ddd, Do MMM YYYY, H:mm"
              )}
            />
          </div>
          {showRemove && (
            <div style={styles.buttonDiv}>
              <Button
                style={{ color: "red" }}
                onClick={() => (onRemove ? onRemove() : {})}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </ConditionalWrapper>
    </Card>
  );
}
