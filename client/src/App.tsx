import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
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
import black_sheep from "./assets/black_sheep.png";
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
import { blueGrey, pink, grey } from "@material-ui/core/colors";
import { Typography } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[800]
    },
    secondary: {
      main: darken(pink.A400, 0.1)
    },
    background: {
      default: grey[100],
      paper: grey[200]
    }
  },
  overrides: {
    MuiTypography: {
      gutterBottom: {
        marginBottom: 16
      }
    }
  }
});

const Logo = styled.div`
  margin-top: 0px;
  width: 42px;
  height: 28px;
  background: url(${black_sheep}) center left no-repeat;
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
    <>
      {me && <Route exact path="/profile" component={ProfilePage} />}
      {me && <Route exact path="/logout" component={LogOutPage} />}
      <Route exact path="/product/:id" component={ProductPage} />
      <Route exact path="/" component={Homepage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/cart" component={CartPage} />
      <Route exact path="/order" component={OrderPage} />
      <Route
        exact
        path="/order-confirmation/:id"
        component={OrderConfirmation}
      />
      <Route exact path="/create-product" component={CreateProductPage} />
      <Route exact path="/update-product/:id" component={EditProductPage} />
      <Route exact path="/create-category" component={CreateCategoryPage} />
      <Route exact path="/create-size" component={CreateSizePage} />
      <Route exact path="/list-products" component={ListProductsPage} />
    </>
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
          <Logo />
          <Typography variant="h6" component="h1">
            Black Sheep
          </Typography>
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
            vertical: "top",
            horizontal: "right"
          }}
          transformOrigin={{
            vertical: "top",
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
