import React, { useState, useEffect } from "react";

import { Typography, CircularProgress } from "@material-ui/core";

import api from "../api";
import PostSummary from "./PostSummary.js";

export default function LatestPosts(props) {
  const limit = props.limit;
  const [updates, setUpdates] = useState(undefined);

  async function updatePosts() {
    try {
      const res = await api.getPosts();
      if (!res.success) {
        console.warn("An error occured, status code " + res.status + "!");
        setUpdates(null);
        return;
      }
      setUpdates(res.data);
    } catch (error) {
      console.warn(error);
    }
  }

  // Update the shown posts every 5 seconds
  useEffect(() => {
    if (updates === undefined) {
      updatePosts();
    }
    // TODO: Too short, change after demo
    const interval = setInterval(() => updatePosts(), 5000);
    return () => clearInterval(interval);
  }, [updates]);

  if (updates === undefined) {
    return <CircularProgress />;
  }

  if (updates === null) {
    return <Typography>Could not find any posts!</Typography>;
  }

  const shownUpdates = updates
    .reverse()
    .slice(0, limit ? limit : updates.length);

  const postSummaries = shownUpdates.map((update) => (
    <PostSummary
      key={update.id}
      id={update.id}
      title={update.title}
      summary={update.summary}
      content={update.content}
      tags={update.tags}
      createdAt={update.created_at}
    />
  ));

  return <>{postSummaries}</>;
}
