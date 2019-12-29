import React, { useContext } from "react";
import "./App.css";
import Homepage from "./pages/Homepage";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";
import { createMuiTheme } from "@material-ui/core/styles";
import styled, { ThemeProvider } from "styled-components";
import { StylesProvider } from "@material-ui/styles";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import CreateProductPage from "./pages/CreateProductPage";
import CreateCategoryPage from "./pages/CreateCategoryPage";
import CreateSizePage from "./pages/CreateSizePage";
import ListProductsPage from "./pages/ListProductsPage";
import EditProductPage from "./pages/EditProductPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ProductPage from "./pages/ProductPage";
import client from "./client";
import { CartContextProvider } from "./CartContext";
import MeContext, { MeContextProvider } from "./MeContext";

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

const AppMain: React.FC = () => {
  const me = useContext(MeContext);

  return (
    <Main>
      <StyledPaper>
        {me && <Route exact path="/profile" component={ProfilePage} />}
        <Route exact path="/product/:id" component={ProductPage} />
        <Route exact path="/" component={Homepage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/cart" component={CartPage} />
        <Route exact path="/order" component={OrderPage} />
        <Route exact path="/order-confirmation" component={OrderConfirmation} />
        <Route exact path="/create-product" component={CreateProductPage} />
        <Route exact path="/update-product/:id" component={EditProductPage} />
        <Route exact path="/create-category" component={CreateCategoryPage} />
        <Route exact path="/create-size" component={CreateSizePage} />
        <Route exact path="/list-products" component={ListProductsPage} />
      </StyledPaper>
    </Main>
  );
};

const AppHeader: React.FC = () => {
  const me = useContext(MeContext);

  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          {!me && <Link to="/login">Login</Link>}
          {!me && <Link to="/register">Sign Up</Link>}
          {me && <Link to="/logout">Logout</Link>}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <ApolloHooksProvider client={client}>
              <MeContextProvider>
                <CartContextProvider>
                  <Router>
                    <AppHeader />
                    <AppMain />
                  </Router>
                </CartContextProvider>
              </MeContextProvider>{" "}
            </ApolloHooksProvider>
          </ApolloProvider>
        </ThemeProvider>
      </StylesProvider>
    </div>
  );
};

export default App;
