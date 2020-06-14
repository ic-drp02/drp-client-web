import React, { useContext, useState, useEffect } from "react";

import {
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
} from "@material-ui/core";

import AuthContext from "../AuthContext";

export default function AdminUpdates() {
  const { user } = useContext(AuthContext);
  const [info, setInfo] = useState(null);

  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (res.status !== 200) {
        console.warn("request failed with status " + res.status);
      } else {
        setInfo(await res.json());
      }
    })();
  }, [user]);

  async function savePassword() {
    if (newPassword !== null && confirmPassword === null) {
      setConfirmPassword("");
      return;
    }

    if (
      !newPassword ||
      newPassword.length < 8 ||
      newPassword !== confirmPassword
    ) {
      return;
    }

    setSaving(true);

    const res = await fetch(`/api/users/${user.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: newPassword,
      }),
    });

    if (res.status !== 200) {
      console.warn("request failed with status " + res.status);
    } else {
      // Show snackbar
    }

    setSaving(false);
  }

  return (
    <div>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h3">My Account</Typography>
        </Grid>
        {info && (
          <Grid item md={6}>
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              type="email"
              value={info.email}
              disabled
            />
          </Grid>
        )}
        <Grid item>
          <Typography variant="h5">Change password</Typography>
        </Grid>
        <Grid item md={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="New password"
            type="password"
            error={!!newPassword && newPassword.length < 8}
            value={newPassword || ""}
            onChange={(e) => setNewPassword(e.target.value)}
            helperText={
              !!newPassword &&
              newPassword.length < 8 &&
              "Password must be at least 8 characters"
            }
          />
        </Grid>
        <Grid item md={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="Confirm new password"
            type="password"
            error={confirmPassword !== null && confirmPassword !== newPassword}
            value={confirmPassword || ""}
            onChange={(e) => setConfirmPassword(e.target.value)}
            helperText={
              confirmPassword !== null &&
              confirmPassword !== newPassword &&
              "Passwords don't match"
            }
          />
        </Grid>
        <Grid
          item
          md={6}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            disabled={saving}
            onClick={savePassword}
          >
            Save
          </Button>
          {saving && <CircularProgress size={30} style={{ marginLeft: 16 }} />}
        </Grid>
      </Grid>
    </div>
  );
}
