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
  const [selectedQs, setSelectedQs] = useState([]);

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

  const allQuestionIds = questions.map((q) => q.id);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setSelectedQs(allQuestionIds);
      return;
    }
    setSelectedQs([]);
  };

  function handleChange(e, id) {
    if (e.target.checked) {
      setSelectedQs((selectedQs) => [...selectedQs, id]);
    } else {
      setSelectedQs((selectedQs) => selectedQs.filter((x) => x !== id));
    }
  }

  return (
    <div>
      <Typography variant="h3">Questions</Typography>
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
          <div style={{ display: "flex" }}>
            <Typography
              variant="h6"
              style={{ marginRight: 15, alignSelf: "center" }}
            >
              {selectedQs.length + " selected"}
            </Typography>
            <CSVLink
              headers={headers}
              data={questions.filter((q) => new Set(selectedQs).has(q.id))}
              filename={"questions.csv"}
              style={{ textDecoration: "none" }}
            >
              <Button
                size="large"
                variant="outlined"
                startIcon={<GetAppIcon />}
              >
                Download as CSV
              </Button>
            </CSVLink>
          </div>
        </Typography>
        <TableContainer component={Paper} style={{ marginTop: 24 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={
                      selectedQs.length > 0 &&
                      selectedQs.length < questions.length
                    }
                    checked={
                      questions.length > 0 &&
                      selectedQs.length === questions.length
                    }
                    onChange={handleSelectAllClick}
                  ></Checkbox>
                </TableCell>
                {headers.map((h) => (
                  <TableCell key={h.key}>{h.label}</TableCell>
                ))}
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={selectedQs.includes(question.id)}
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
