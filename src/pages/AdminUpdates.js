import React, { useEffect, useState } from "react";

import {
  Typography,
  Paper,
  makeStyles,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@material-ui/core";

import {
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from "@material-ui/icons";

import api from "../api";

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

export default function AdminUpdates() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.getPosts().then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div>
      <Typography variant="h2">Updates</Typography>
      <TableContainer component={Paper} style={{ marginTop: 24 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Summary</TableCell>
              <TableCell align="right">Tags</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.summary}</TableCell>
                <TableCell align="right">
                  {post.tags.map((p) => p.name).join(", ")}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={() =>
                      api
                        .deletePost(post.id)
                        .then(() =>
                          setPosts(posts.filter((p) => p.id !== post.id))
                        )
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
