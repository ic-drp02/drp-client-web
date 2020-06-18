import React, { useEffect, useState } from "react";

import {
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Divider,
  Table,
  TableContainer,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@material-ui/core";

export default function QuestionPickerDialog({
  visible,
  questions,
  selected,
  onDismiss,
  onSelection,
}) {
  const [selectedQuestions, setSelectedQuestions] = useState(selected);
  const [shownQuestions, setShownQuestions] = useState(questions);

  useEffect(() => {
    setShownQuestions(questions);
    setSelectedQuestions(selected);
  }, [questions, selected]);

  function searchMatch(search, searched) {
    return search.toLowerCase().includes(searched.toLowerCase());
  }

  function onSearchTextChange(e) {
    const shownQuestions = questions.filter(
      (q) =>
        searchMatch(q.text, e.target.value) ||
        searchMatch(q.subject.name, e.target.value) ||
        searchMatch(q.specialty, e.target.value)
    );

    setShownQuestions(shownQuestions);
  }

  function onSelectionChange(e, q) {
    if (e.target.checked) {
      q.selected = true;
      setSelectedQuestions((selectedQuestions) => [...selectedQuestions, q]);
    } else {
      q.selected = false;
      setSelectedQuestions((selectedQuestions) =>
        selectedQuestions.filter((x) => x !== q)
      );
    }
    onSelection(q);
  }

  return (
    <Dialog open={visible} onClose={onDismiss} scroll="paper" fullWidth>
      <DialogTitle style={{ textAlign: "center" }}>
        Choose questions that are to be resolved by this update
      </DialogTitle>
      <TextField
        label="Search questions"
        mode="outlined"
        onChange={onSearchTextChange}
        variant="outlined"
        style={{ margin: 20 }}
      ></TextField>
      <Divider />
      <DialogContent dividers>
        <TableContainer component={Paper} style={{ marginTop: 24 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Specialty</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Text</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shownQuestions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={selectedQuestions
                        .map((q) => q.id)
                        .includes(question.id)}
                      onChange={(e) => onSelectionChange(e, question)}
                    ></Checkbox>
                  </TableCell>
                  <TableCell>{question.specialty}</TableCell>
                  <TableCell>{question.subject.name}</TableCell>
                  <TableCell>{question.text}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDismiss}>Done</Button>
      </DialogActions>
    </Dialog>
  );
}
