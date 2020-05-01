import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSignInMutation } from "../generated/graphql";
import { Grid, Typography, TextField } from "@material-ui/core";
import { useApolloClient } from "@apollo/react-hooks";
import LoadingButton from "../components/LoadingButton";
import StyledMain from "../components/StyledMain";
import { IS_LOGGED_IN, UPDATE_IS_LOGGED_IN } from "../client";
import Error from "../components/Error";
import { Helmet } from "react-helmet";

const LoginPage = () => {
  const [signInMutation, { loading }] = useSignInMutation();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const client = useApolloClient();

  async function handleSubmit(): Promise<void> {
    try {
      const { data } = await signInMutation({ variables: { email, password } });
      const token = data?.signIn?.token;

      if (token !== undefined) {
        localStorage.setItem("token", token);

        await client.mutate({
          mutation: UPDATE_IS_LOGGED_IN,
          variables: { isLoggedIn: true },
          refetchQueries: [{ query: IS_LOGGED_IN }],
          awaitRefetchQueries: true,
        });

        history.push("/");
      }
    } catch (e) {
      const error = e?.graphQLErrors[0]?.message || e.message;
      setError(error);
    }
  }

  if (error) return <Error errorMessage={error} />;

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <StyledMain>
        <form
          onSubmit={async (e) => {
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
    </>
  );
};

export default LoginPage;
