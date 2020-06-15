import React, { useState, useContext } from "react";
import { useHistory, Redirect } from "react-router-dom";

import {
  Grid,
  Typography,
  TextField,
  Paper,
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

import { Alert } from "@material-ui/lab";

import logo_full from "../assets/icon_full.png";

import AuthContext from "../AuthContext";
import api from "../api";

const useStyles = makeStyles({
  adjustWidth: {
    width: 430,
  },
  "@media (max-width: 720px)": {
    adjustWidth: {
      width: "60%",
    },
  },
  "@media (max-width: 480px)": {
    adjustWidth: {
      width: "100%",
    },
  },
});

function InstallationDialog({ visible, onDismiss }) {
  return (
    <Dialog open={visible} onClose={onDismiss}>
      <DialogTitle disableTypography>
        <Typography variant="h5">Installation instructions</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6">Android</Typography>
        <ol>
          <li>
            Install the Expo app from{" "}
            <a
              href="https://play.google.com/store/apps/details?id=host.exp.exponent"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
          </li>
          <li>
            Open this link on your phone:{" "}
            <a
              href="https://expo.io/--/to-exp/exp%3A%2F%2Fexp.host%2F%40drp02.nhs%2Fdrp-client-mobile"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://expo.io/--/to-exp/exp%3A%2F%2Fexp.host%2F%40drp02.nhs%2Fdrp-client-mobile
            </a>
          </li>
        </ol>
        <Typography variant="h6">iOS</Typography>
        <ol>
          <li>
            Install the Expo app from{" "}
            <a href="https://apps.apple.com/app/apple-store/id982107779">
              here
            </a>
            .
          </li>
          <li>On the bottom of the screen click the profile icon.</li>
          <li>
            Sign in with the following details:
            <br />
            <strong>Username:</strong> drp02.nhs
            <br />
            <strong>Password:</strong> 6xK7rxbbhT
          </li>
          <li>
            Open <strong>drp-client-mobile</strong> under published projects to
            launch the app.
          </li>
        </ol>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onDismiss}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function Login() {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showInstallation, setShowInstallation] = useState(false);

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
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Alert
        severity="info"
        style={{ cursor: "pointer" }}
        onClick={() => setShowInstallation(true)}
      >
        <span
          style={{
            color: "inherit",
            textDecoration: "none",
          }}
        >
          <strong>16/06/2020 User Test</strong> - Click here for instructions on
          how to install the app.
        </span>
      </Alert>
      <InstallationDialog
        visible={showInstallation}
        onDismiss={() => setShowInstallation(false)}
      />
      <form
        action="#"
        onSubmit={login}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 24,
        }}
      >
        <Paper style={{ padding: 16 }} className={classes.adjustWidth}>
          <Grid container spacing={3} direction="column">
            <Grid item xs={12} style={{ padding: 0 }}>
              <div className={classes.adjustWidth}>
                <img
                  src={logo_full}
                  alt=""
                  style={{
                    width: "calc(100% - 64px)",
                    marginTop: 32,
                    marginLeft: 32,
                    marginRight: 32,
                    marginBottom: 8,
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" style={{ textAlign: "center" }}>
                Welcome to ICON, the Imperial Comms Network
              </Typography>
              <Typography style={{ textAlign: "center" }}>
                A network facilitating clear communication with senior
                management and easy access to trust guidelines
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
