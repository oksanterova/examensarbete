import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSignInMutation } from "../generated/graphql";
import { Grid, Typography, TextField } from "@material-ui/core";
import { useApolloClient } from "@apollo/react-hooks";
import LoadingButton from "../components/LoadingButton";
import StyledMain from "../components/StyledMain";

const LoginPage = () => {
  const [signInMutation, { loading }] = useSignInMutation();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const client = useApolloClient();

  async function handleSubmit(): Promise<void> {
    const { data } = await signInMutation({ variables: { email, password } });
    const token = data?.signIn?.token;

    if (token !== undefined) {
      localStorage.setItem("token", token);
      client.writeData({ data: { isLoggedIn: true } });
      history.push("/");
    }
  }

  return (
    <StyledMain>
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
              type="email"
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
              label="Enter your password"
              onChange={e => setPassword(e.target.value)}
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
              Login
            </LoadingButton>
          </Grid>
        </Grid>
      </form>
    </StyledMain>
  );
};

export default LoginPage;
