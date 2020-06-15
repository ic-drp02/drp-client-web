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
  const [sites, setSites] = useState([]);
  const [newSite, setNewSite] = useState("");

  useEffect(() => {
    api.getSites().then((res) => {
      setSites(res.data);
    });
  }, []);

  return (
    <div>
      <Typography variant="h3">Sites</Typography>
      <div style={{ marginTop: 56 }}>
        <Typography variant="h4">New site</Typography>
        <form
          style={{ display: "flex", marginTop: 16, marginBottom: 8 }}
          onSubmit={(e) => {
            e.preventDefault();
            api.createSite(newSite).then(async () => {
              setNewSite("");
              const res = await api.getSites();
              setSites(res.data);
            });
          }}
        >
          <TextField
            variant="outlined"
            label="Name"
            style={{ marginRight: 8 }}
            value={newSite}
            onChange={(e) => setNewSite(e.target.value)}
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
        <Typography variant="h4">Manage sites</Typography>
        <TableContainer component={Paper} style={{ marginTop: 24 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Site</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sites.map((site) => (
                <TableRow key={site.id}>
                  <TableCell>{site.name}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() =>
                        api
                          .deleteSite(site.id)
                          .then(() =>
                            setSites(sites.filter((s) => s.id !== site.id))
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
