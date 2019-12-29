import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "@apollo/react-hooks";
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
  darken
} from "@material-ui/core/styles";
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
import LogOutPage from "./pages/LogOutPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ProductPage from "./pages/ProductPage";
import client from "./client";
import { CartContextProvider } from "./CartContext";
import MeContext, { MeContextProvider } from "./MeContext";
import { blue, pink } from "@material-ui/core/colors";
import { Typography } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[700]
    },
    secondary: {
      main: darken(pink.A400, 0.1)
    },
    background: {
      default: "#fff"
    }
  }
});

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

const StyledToolbar = styled(Toolbar)`
  display: flex;
  flew-grow: 1;
`;

const FlexGrow = styled.div`
  flex-grow: 1;
`;

const AppMain: React.FC = () => {
  const me = useContext(MeContext);

  return (
    <Main>
      <StyledPaper>
        {me && <Route exact path="/profile" component={ProfilePage} />}
        {me && <Route exact path="/logout" component={LogOutPage} />}
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
  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = anchorEl !== null;

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar>
      <StyledToolbar>
        <Button color="inherit" onClick={() => history.push("/")}>
          <Typography variant="h6">Black Sheep</Typography>
        </Button>

        <FlexGrow />

        {!me && (
          <>
            <Button color="inherit" onClick={() => history.push("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => history.push("/register")}>
              Sign Up
            </Button>
            <IconButton color="inherit" onClick={() => history.push("/cart")}>
              <ShoppingCartIcon />
            </IconButton>
          </>
        )}

        {me && (
          <>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleMenu}
            >
              <AccountCircle />
            </IconButton>
            <IconButton color="inherit" onClick={() => history.push("/cart")}>
              <ShoppingCartIcon />
            </IconButton>
          </>
        )}

        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
        >
          <MenuItem
            onClick={() => {
              handleClose();
              history.push("/profile");
            }}
          >
            Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleClose();
              history.push("/logout");
            }}
          >
            Log Out
          </MenuItem>
        </Menu>
      </StyledToolbar>
    </AppBar>
  );
};

const App: React.FC = () => {
  return (
    <div className="App">
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
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
        </MuiThemeProvider>
      </StylesProvider>
    </div>
  );
};

export default App;
