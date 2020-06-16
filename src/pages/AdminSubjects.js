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

export default function AdminSites() {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");

  useEffect(() => {
    api.getQuestionSubjects().then((res) => {
      setSubjects(res.data);
    });
  }, []);

  return (
    <div>
      <Typography variant="h3" gutterBottom>
        Subjects
      </Typography>
      <Typography variant="body1">
        On this page, you can view, add and delete question subjects that will
        then be available for selection in the questions form.
      </Typography>
      <div style={{ marginTop: 56 }}>
        <Typography variant="h4">New subject</Typography>
        <form
          style={{ display: "flex", marginTop: 16, marginBottom: 8 }}
          onSubmit={(e) => {
            e.preventDefault();
            api.createQuestionSubject(newSubject).then(async () => {
              setNewSubject("");
              const res = await api.getQuestionSubjects();
              setSubjects(res.data);
            });
          }}
        >
          <TextField
            variant="outlined"
            label="Name"
            style={{ marginRight: 8 }}
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
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
        <Typography variant="h4">Manage subjects</Typography>
        <TableContainer component={Paper} style={{ marginTop: 24 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Subject</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell>{subject.name}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() =>
                        api
                          .deleteQuestionSubject(subject.id)
                          .then(() =>
                            setSubjects(
                              subjects.filter((s) => s.id !== subject.id)
                            )
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
