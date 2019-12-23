import React from "react";
import "./App.css";
import Homepage from "./components/Homepage";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { createMuiTheme } from "@material-ui/core/styles";
import styled, { ThemeProvider } from "styled-components";
import { StylesProvider } from "@material-ui/styles";

const theme = createMuiTheme();

const client = new ApolloClient({
  uri: "/graphql"
});

const App: React.FC = () => {
  return (
    <div className="App">
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <Homepage />
          </ApolloProvider>
        </ThemeProvider>
      </StylesProvider>
    </div>
  );
};

export default App;
