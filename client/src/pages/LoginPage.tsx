import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSignInMutation } from "../generated/graphql";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import { useApolloClient } from "@apollo/react-hooks";

const LoginPage = () => {
  const [signInMutation] = useSignInMutation();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const client = useApolloClient();

  async function handleSubmit(): Promise<void> {
    const { data } = await signInMutation({ variables: { email, password } });
    const token = data?.signIn?.token;

    if (token !== undefined) {
      localStorage.setItem("token", token!);
      client.writeData({ data: { isLoggedIn: true } });
      history.push("/");
    }
  }

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        await handleSubmit();
      }}
    >
      <Typography variant="h6" gutterBottom>
        Login
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
            multiline
            id="password"
            name="password"
            value={password}
            label="Enter your password"
            onChange={e => setPassword(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginPage;
