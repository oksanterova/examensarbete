import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSignUpMutation } from "../generated/graphql";
import { Grid, Typography, TextField } from "@material-ui/core";
import { useApolloClient } from "@apollo/react-hooks";
import LoadingButton from "../components/LoadingButton";

const RegisterPage = () => {
  const [signUpMutation, { loading }] = useSignUpMutation();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const formEl = useRef<HTMLFormElement>(null);
  const [confirmError, setConfirmError] = useState({
    error: false,
    helperText: ""
  });
  const client = useApolloClient();

  async function handleSubmit(): Promise<void> {
    if (validateForm()) {
      await signUpMutation({ variables: { email, password } });
      client.writeData({ data: { isLoggedIn: true } });
      history.push("/");
    }
  }

  function validateForm() {
    const form = formEl.current;

    if (form?.checkValidity()) {
      if (password === confirm) {
        setConfirmError({ error: false, helperText: "" });
        return true;
      } else {
        setConfirmError({ error: true, helperText: "Password doesn't match" });
        return false;
      }
    }

    return false;
  }

  return (
    <form
      ref={formEl}
      onSubmit={async e => {
        e.preventDefault();
        await handleSubmit();
      }}
    >
      <Typography variant="h6" gutterBottom>
        Register
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="email"
            name="email"
            value={email}
            label="Enter your email"
            onChange={e => setEmail(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="password"
            name="password"
            value={password}
            type="password"
            label="Enter password"
            onChange={e => setPassword(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="confirm-password"
            name="confirm-password"
            value={confirm}
            type="password"
            error={confirmError.error}
            helperText={confirmError.helperText}
            label="Confirm password"
            onChange={e => setConfirm(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            variant="contained"
            color="primary"
            type="submit"
            loading={loading}
          >
            <Typography>Login</Typography>
          </LoadingButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default RegisterPage;
