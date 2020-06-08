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
  Button,
  Checkbox,
} from "@material-ui/core";

import {
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  GetApp as GetAppIcon,
} from "@material-ui/icons";

import api from "../api";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";

export default function AdminQuestions() {
  const [questions, setQuestions] = useState([]);
  const [questionIds, setQuestionIds] = useState([]);

  useEffect(() => {
    api.getQuestions().then((res) => {
      setQuestions(res.data);
    });
  }, []);

  const headers = [
    { label: "Site", key: "site.name" },
    { label: "Grade", key: "grade" },
    { label: "Specialty", key: "specialty" },
    { label: "Subject", key: "subject.name" },
    { label: "Question", key: "text" },
  ];

  function handleChange(e, id) {
    if (e.target.checked) {
      setQuestionIds((questionIds) => [...questionIds, id]);
    } else {
      setQuestionIds((questionIds) => questionIds.filter((x) => x !== id));
    }
  }

  return (
    <div>
      <Typography variant="h2">Questions</Typography>
      <div style={{ marginTop: 48 }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/admin/questions/sites"
          size="large"
          style={{ marginRight: 16 }}
        >
          Manage sites
        </Button>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/admin/questions/subjects"
          size="large"
        >
          Manage subjects
        </Button>
      </div>
      <div style={{ marginTop: 56 }}>
        <Typography
          variant="h4"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          Manage questions
          <CSVLink
            headers={headers}
            data={questions.filter((q) => new Set(questionIds).has(q.id))}
            filename={"questions.csv"}
            style={{ textDecoration: "none" }}
          >
            <Button size="large" variant="outlined" startIcon={<GetAppIcon />}>
              Download as CSV
            </Button>
          </CSVLink>
        </Typography>
        <TableContainer component={Paper} style={{ marginTop: 24 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Select</TableCell>
                {headers.map((h) => (
                  <TableCell>{h.label}</TableCell>
                ))}
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell>
                    <Checkbox
                      color="primary"
                      onChange={(e) => handleChange(e, question.id)}
                    ></Checkbox>
                  </TableCell>
                  <TableCell>{question.site.name}</TableCell>
                  <TableCell>{question.grade}</TableCell>
                  <TableCell>{question.specialty}</TableCell>
                  <TableCell>{question.subject.name}</TableCell>
                  <TableCell>{question.text}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() =>
                        api
                          .deleteQuestion(question.id)
                          .then(() =>
                            setQuestions(
                              questions.filter((q) => q.id !== question.id)
                            )
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
    </div>
  );
}
