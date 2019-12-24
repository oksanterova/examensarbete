import React from "react";
import "./App.css";
import Homepage from "./pages/Homepage";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { createMuiTheme } from "@material-ui/core/styles";
import styled, { ThemeProvider } from "styled-components";
import { StylesProvider } from "@material-ui/styles";
import Cart from "./components/Cart";
import CreateProductPage from "./pages/CreateProductPage";

const theme = createMuiTheme();

const Main = styled.main`
  padding-top: ${props => props.theme.spacing(8)}px;
`;

const client = new ApolloClient({
  uri: "/graphql"
});

const App: React.FC = () => {
  return (
    <div className="App">
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <AppBar>
              <Toolbar>
                <Typography variant="h6" color="inherit" noWrap>
                  Album layout
                </Typography>
              </Toolbar>
            </AppBar>
            <Main>
              <Router>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/cart" component={Cart} />
                <Route
                  exact
                  path="/create-product"
                  component={CreateProductPage}
                />
              </Router>
            </Main>
          </ApolloProvider>
        </ThemeProvider>
      </StylesProvider>
    </div>
  );
};

export default App;
