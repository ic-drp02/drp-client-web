import React, { useEffect, useState } from "react";

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
  TextField,
  Button,
} from "@material-ui/core";

import { Delete as DeleteIcon } from "@material-ui/icons";

import api from "../api";

export default function AdminTags() {
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    api.getTags().then((res) => {
      setTags(res.data);
    });
  }, []);

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Tags
      </Typography>
      <Typography variant="body1">
        On this page, you can view, add, rename and delete tags that can be used
        to sort the posts and guidelines into categories.
      </Typography>
      <div style={{ marginTop: 56 }}>
        <Typography variant="h4">New tag </Typography>
        <form
          style={{ display: "flex", marginTop: 16, marginBottom: 8 }}
          onSubmit={(e) => {
            e.preventDefault();
            api.createTag(newTag).then(async () => {
              setNewTag("");
              const res = await api.getTags();
              setTags(res.data);
            });
          }}
        >
          <TextField
            variant="outlined"
            label="Name"
            style={{ marginRight: 8 }}
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Button variant="contained" color="primary" type="submit">
              Create
            </Button>
          </div>
        </form>
      </div>
      <div style={{ marginTop: 56 }}>
        <Typography variant="h4">Manage tags</Typography>
        <TableContainer component={Paper} style={{ marginTop: 24 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Tag</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tags.map((tag) => (
                <TableRow key={tag.id}>
                  <TableCell>
                    <TagEditor id={tag.id} name={tag.name} />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() =>
                        api
                          .deleteTag(tag.id)
                          .then(() =>
                            setTags(tags.filter((t) => t.id !== tag.id))
                          )
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

function TagEditor({ id, name }) {
  const [current, setCurrent] = useState(name);
  const [value, setValue] = useState(name);

  useEffect(() => {
    setValue(current);
  }, [current]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <TextField
        fullWidth
        variant="standard"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button
        variant="outlined"
        style={{
          marginLeft: 16,
          visibility: value !== current ? "visible" : "hidden",
        }}
        onClick={async () => {
          await api.renameTag(id, value);
          setCurrent(value);
        }}
      >
        Save
      </Button>
    </div>
  );
}
