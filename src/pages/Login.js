import React, { useState, useContext } from "react";

import {
  Grid,
  Typography,
  TextField,
  Paper,
  makeStyles,
  Button,
} from "@material-ui/core";

import AuthContext from "../AuthContext";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    width: 430,
  },
  "@media (max-width: 720px)": {
    card: {
      width: "60%",
    },
  },
  "@media (max-width: 480px)": {
    card: {
      width: "100%",
    },
  },
});

export default function Login() {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function login(e) {
    e.preventDefault();

    let res;
    try {
      res = await fetch("/auth/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
    } catch {
      setError({
        type: "Unknown",
        message: "An eerror occurred while communicating with the server.",
      });
    }

    const body = await res.json();

    if (res.status !== 200) {
      if (!!body.type) {
        setError(body);
      } else {
        setError({
          type: "Unknown",
          message: "An error occurred while trying to log in.",
        });
      }
    } else {
      auth.setUser(body);
      history.replace("/");
    }
  }

  let errorMessage;
  if (!!error) {
    switch (error.type) {
      case "InvalidCredentials":
        errorMessage = "The email address or password is incorrect.";
        break;

      case "Unconfirmed":
        errorMessage =
          "Account has not been confirmed. Check your email for a confirmation link.";
        break;

      case "Unknown":
        errorMessage = error.message;
        break;

      default:
        errorMessage = "An error occurred while logging in.";
    }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 24,
      }}
    >
      <form action="#" onSubmit={login}>
        <Paper style={{ padding: 16 }} className={classes.card}>
          <Grid container spacing={3} direction="column">
            <Grid item xs={12}>
              <Typography variant="h4" style={{ textAlign: "center" }}>
                Login
              </Typography>
            </Grid>
            {!!errorMessage && (
              <Grid item xs={12}>
                <Typography style={{ textAlign: "center", color: "red" }}>
                  {errorMessage}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </div>
  );
}
