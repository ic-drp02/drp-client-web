import React, { useState, useContext } from "react";
import { useHistory, Redirect } from "react-router-dom";

import {
  Grid,
  Typography,
  TextField,
  Paper,
  makeStyles,
  Button,
} from "@material-ui/core";

import AuthContext from "../AuthContext";
import api from "../api";

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

  if (!!auth.user && Date.now() / 1000 < auth.user.expires) {
    return <Redirect to="/" />;
  }

  async function login(e) {
    e.preventDefault();

    const res = await api.authenticate(email, password);
    if (!res.success) {
      setError(res.error);
    } else {
      sessionStorage.setItem("user", JSON.stringify(res.data));
      auth.setUser(res.data);
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
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <a href="/auth/reset_password">
                <Typography>Forgot password</Typography>
              </a>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </div>
  );
}
