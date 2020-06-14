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

async function getUsers(token) {
  const res = await fetch("/api/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status !== 200) {
    console.warn("failed to get users with status code " + res.status);
    return null;
  } else {
    return await res.json();
  }
}

async function deleteUser(token, id) {
  const res = await fetch(`/api/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status !== 204) {
    console.warn("failed to delete user with status code " + res.status);
    return false;
  } else {
    return true;
  }
}

async function updateRole(token, id, role) {
  const res = await fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      role,
    }),
  });

  if (res.status !== 200) {
    console.warn("failed to update user role with status code " + res.status);
    return false;
  } else {
    return true;
  }
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
          <Typography variant="h3">Users</Typography>
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
