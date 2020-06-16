import React, { useState, useEffect, useContext } from "react";

import { Delete as DeleteIcon } from "@material-ui/icons";
import {
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Button,
  LinearProgress,
} from "@material-ui/core";

import AuthContext from "../AuthContext";
import api from "../api";

async function getUsers(token) {
  const res = await api.getUsers();
  return res.success ? res.data : null;
}

async function deleteUser(token, id) {
  const res = await api.deleteUser(id);
  if (!res.success) {
    console.warn("failed to delete user with status code " + res.status);
  }
  return res.success;
}

async function updateRole(token, id, role) {
  const res = await api.updateUser(id, { role });
  if (!res.success) {
    console.warn("failed to update user role with status code " + res.status);
  }
  return res.success;
}

export default function AdminUsers() {
  const auth = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  async function refreshUsers() {
    setLoading(true);
    const users = await getUsers(auth.user.token);
    setUsers(users);
    setLoading(false);
  }

  useEffect(() => {
    refreshUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {loading ? (
        <LinearProgress style={{ marginBottom: 16 }} />
      ) : (
        <>
          <Typography variant="h3" gutterBottom>
            Users
          </Typography>
          <Typography variant="body1">
            On this page, you can view all the users that are registered in the
            ICON application, change their privilages or delete them.
          </Typography>
          <TableContainer component={Paper} style={{ marginTop: 24 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell align="right">
                      {user.role === "admin" ? (
                        <Button
                          variant="outlined"
                          onClick={() =>
                            updateRole(auth.user.token, user.id, "normal").then(
                              refreshUsers
                            )
                          }
                        >
                          Unset admin
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          onClick={() =>
                            updateRole(auth.user.token, user.id, "admin").then(
                              refreshUsers
                            )
                          }
                        >
                          Set admin
                        </Button>
                      )}
                      <IconButton
                        onClick={() =>
                          deleteUser(auth.user.token, user.id).then(
                            refreshUsers
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
        </>
      )}
    </div>
  );
}
