import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Typography,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
} from "@material-ui/core";

import {
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from "@material-ui/icons";

import UpdateDialog from "../components/UpdateDialog";
import api from "../api";

export default function AdminUpdates() {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    api.getPosts().then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Typography variant="h3">Updates</Typography>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push("/admin/updates/create")}
          >
            Post an update
          </Button>
        </div>
      </div>
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
                  <IconButton onClick={() => setSelectedPost(post)}>
                    <VisibilityIcon />
                  </IconButton>

                  <UpdateDialog
                    selectedPost={selectedPost}
                    onDismiss={() => setSelectedPost(null)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
