import React, { useEffect, useState } from "react";

import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  TextField,
  List,
  ListItem,
  Divider,
} from "@material-ui/core";

import GuidelineCard from "./GuidelineCard";
import api from "../api";

export default function GuidelinePickerDialog({
  visible,
  onDismiss,
  onSelect,
}) {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    api.getPosts().then((res) => {
      setPosts(res.data);
      setFilteredPosts(res.data);
    });
  }, []);

  if (posts === null) {
    return <CircularProgress />;
  }

  function onSearchTextChange(e) {
    const filteredPosts = posts.filter((p) =>
      p.title.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setFilteredPosts(filteredPosts);
  }

  return (
    <Dialog open={visible} onClose={onDismiss} scroll="paper" fullWidth>
      <DialogTitle style={{ textAlign: "center" }}>
        Choose superseded guideline
      </DialogTitle>
      <TextField
        label="Search guidelines"
        mode="outlined"
        onChange={onSearchTextChange}
        variant="outlined"
        style={{ margin: 20 }}
      ></TextField>
      <Divider />
      <DialogContent dividers>
        <List>
          {filteredPosts.map((p) => (
            <ListItem key={p.id}>
              <GuidelineCard
                guideline={p}
                onCardPress={() => {
                  onSelect(p);
                  setFilteredPosts(posts);
                }}
                clickable
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDismiss} style={{ color: "red" }}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
