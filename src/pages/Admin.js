import React from "react";
import { Link } from "react-router-dom";
import { Typography, Paper } from "@material-ui/core";
import {
  Edit as EditIcon,
  Notifications as NotificationsIcon,
  LocalOffer as TagIcon,
  QuestionAnswer as QuestionAnswerIcon,
} from "@material-ui/icons";

function Option({ icon, label, link }) {
  const Icon = icon;
  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <Paper
        style={{
          padding: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: 140,
          height: 100,
          margin: 8,
        }}
      >
        <Icon fontSize="large" style={{ margin: 16 }} />
        <Typography>{label}</Typography>
      </Paper>
    </Link>
  );
}

export default function Admin() {
  return (
    <div style={{ display: "flex" }}>
      <Option icon={EditIcon} label="Post an update" link="/posts/create" />
      <Option
        icon={NotificationsIcon}
        label="Manage updates"
        link="/admin/updates"
      />
      <Option icon={TagIcon} label="Manage tags" link="/admin/tags" />
      <Option icon={QuestionAnswerIcon} label="Manage questions" link="#" />
    </div>
  );
}
