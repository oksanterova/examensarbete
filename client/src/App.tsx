import React from "react";
import "./App.css";
import Homepage from "./pages/Homepage";
import Paper from "@material-ui/core/Paper";
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
import CreateCategoryPage from "./pages/CreateCategoryPage";
import CreateSizePage from "./pages/CreateSizePage";
import ListProductsPage from "./pages/ListProductsPage";
import EditProductPage from "./pages/EditProductPage";

const theme = createMuiTheme();

const Main = styled.main`
  width: auto;
  padding-top: ${props => props.theme.spacing(8)}px;
  margin-left: ${props => props.theme.spacing(2)}px;
  margin-right: ${props => props.theme.spacing(2)}px;

  ${props => theme.breakpoints.up(600 + theme.spacing(3) * 2)} {
    width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const StyledPaper = styled(Paper)`
  margin-top: ${props => props.theme.spacing(3)}px;
  margin-bottom: ${props => props.theme.spacing(3)}px;
  padding: ${props => props.theme.spacing(2)}px;

  ${props => theme.breakpoints.up(600 + theme.spacing(3) * 2)} {
    margin-top: ${props => props.theme.spacing(6)}px;
    margin-bottom: ${props => props.theme.spacing(6)}px;
    padding: ${props => props.theme.spacing(3)}px;
  }
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
              <StyledPaper>
                <Router>
                  <Route exact path="/" component={Homepage} />
                  <Route exact path="/cart" component={Cart} />
                  <Route
                    exact
                    path="/create-product"
                    component={CreateProductPage}
                  />
                  <Route
                    exact
                    path="/update-product/:id"
                    component={EditProductPage}
                  />
                  <Route
                    exact
                    path="/create-category"
                    component={CreateCategoryPage}
                  />
                  <Route exact path="/create-size" component={CreateSizePage} />
                  <Route
                    exact
                    path="/list-products"
                    component={ListProductsPage}
                  />
                </Router>
              </StyledPaper>
            </Main>
          </ApolloProvider>
        </ThemeProvider>
      </StylesProvider>
    </div>
  );
};

export default App;
