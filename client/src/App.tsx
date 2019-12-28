import React from "react";
import "./App.css";
import Homepage from "./pages/Homepage";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import {
  ApolloProvider as ApolloHooksProvider,
  useQuery
} from "@apollo/react-hooks";
import { createMuiTheme } from "@material-ui/core/styles";
import styled, { ThemeProvider } from "styled-components";
import { StylesProvider } from "@material-ui/styles";
import Cart from "./components/Cart";
import CreateProductPage from "./pages/CreateProductPage";
import CreateCategoryPage from "./pages/CreateCategoryPage";
import CreateSizePage from "./pages/CreateSizePage";
import ListProductsPage from "./pages/ListProductsPage";
import EditProductPage from "./pages/EditProductPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import client, { IS_LOGGED_IN } from "./client";

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

const App: React.FC = () => {
  const { data } = useQuery<{ isLoggedIn: boolean }>(IS_LOGGED_IN, { client });
  const isLoggedIn = data?.isLoggedIn ?? false;

  return (
    <div className="App">
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <ApolloHooksProvider client={client}>
              <Router>
                <AppBar>
                  <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                      {!isLoggedIn && <Link to="/login">Login</Link>}
                      {!isLoggedIn && <Link to="/register">Sign Up</Link>}
                      {isLoggedIn && <Link to="/logout">Logout</Link>}
                    </Typography>
                  </Toolbar>
                </AppBar>
                <Main>
                  <StyledPaper>
                    {isLoggedIn && (
                      <Route exact path="/profile" component={ProfilePage} />
                    )}
                    <Route exact path="/" component={Homepage} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/register" component={RegisterPage} />
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
                    <Route
                      exact
                      path="/create-size"
                      component={CreateSizePage}
                    />
                    <Route
                      exact
                      path="/list-products"
                      component={ListProductsPage}
                    />
                  </StyledPaper>
                </Main>
              </Router>
            </ApolloHooksProvider>
          </ApolloProvider>
        </ThemeProvider>
      </StylesProvider>
    </div>
  );
};

export default App;
