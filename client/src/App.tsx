import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
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
  darken,
} from "@material-ui/core/styles";
import black_sheep from "./assets/black_sheep.png";
import styled, { ThemeProvider } from "styled-components";
import { StylesProvider } from "@material-ui/styles";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import CreateProductPage from "./pages/CreateProductPage";
import CategoryManager from "./pages/CategoryManager";
import SizeManager from "./pages/SizeManager";
import ProductManager from "./pages/ProductManager";
import EditProductPage from "./pages/EditProductPage";
import LoginPage from "./pages/LoginPage";
import LogOutPage from "./pages/LogOutPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ProductPage from "./pages/ProductPage";
import client from "./client";
import CartContext, { CartContextProvider } from "./CartContext";
import MeContext, { MeContextProvider } from "./MeContext";
import { blueGrey, pink, grey } from "@material-ui/core/colors";
import { Typography } from "@material-ui/core";
import { useGetCartQuery } from "./generated/graphql";
import { Helmet } from "react-helmet";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[800],
    },
    secondary: {
      main: darken(pink.A700, 0.1),
    },
    background: {
      default: grey[100],
      paper: grey[200],
    },
  },
  overrides: {
    MuiTypography: {
      gutterBottom: {
        marginBottom: 16,
      },
    },
  },
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
  padding-left: 0;
  padding-right: 6px;
`;

const FlexGrow = styled.div`
  flex-grow: 1;
`;

const Footer = styled.footer`
  background-color: #696969;
  color: #fff;
  padding: 6px;
  height: 36px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: auto;
`;

const AppMain: React.FC = () => {
  const me = useContext(MeContext);

  return (
    <>
      {me && <Route exact path="/profile" component={ProfilePage} />}
      {me && <Route exact path="/logout" component={LogOutPage} />}
      <Route exact path="/product/:id" component={ProductPage} />
      <Route
        exact
        path="/"
        render={({ location }) => {
          const filter =
            new URLSearchParams(location.search).get("categories") ?? "";
          const activeCategories = filter === "" ? [] : filter?.split(",");

          return <Homepage activeCategories={activeCategories} />;
        }}
      />
      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/contact" component={ContactPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/cart" component={CartPage} />
      <Route exact path="/order" component={OrderPage} />
      <Route
        exact
        path="/order-confirmation/:id"
        component={OrderConfirmation}
      />

      {me?.isAdmin && (
        <Route exact path="/create-product" component={CreateProductPage} />
      )}
      {me?.isAdmin && (
        <Route exact path="/update-product/:id" component={EditProductPage} />
      )}
      {me?.isAdmin && (
        <Route exact path="/product-manager" component={ProductManager} />
      )}
      {me?.isAdmin && (
        <Route exact path="/category-manager" component={CategoryManager} />
      )}
      {me?.isAdmin && (
        <Route exact path="/size-manager" component={SizeManager} />
      )}
    </>
  );
};

const AppHeader: React.FC = () => {
  const me = useContext(MeContext);
  const { cartId } = useContext(CartContext);
  const history = useHistory();

  const { data } = useGetCartQuery({
    variables: {
      cartId,
    },
  });

  const items = data?.cart.items;

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

        {me && (
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={handleMenu}
          >
            <AccountCircle />
          </IconButton>
        )}

        {!me && (
          <>
            <Button color="inherit" onClick={() => history.push("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => history.push("/register")}>
              Sign Up
            </Button>
          </>
        )}

        <IconButton color="inherit" onClick={() => history.push("/cart")}>
          <Badge badgeContent={items?.length} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
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
          {me?.isAdmin && (
            <div>
              <MenuItem
                onClick={() => {
                  handleClose();
                  history.push("/product-manager");
                }}
              >
                Product manager
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  history.push("/category-manager");
                }}
              >
                Category manager
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleClose();
                  history.push("/size-manager");
                }}
              >
                Size manager
              </MenuItem>
            </div>
          )}
          <MenuItem
            onClick={() => {
              handleClose();
              history.push("/logout");
            }}
          >
            {" "}
            Log Out
          </MenuItem>
        </Menu>
      </StyledToolbar>
    </AppBar>
  );
};

const AppFooter: React.FC = () => {
  const history = useHistory();
  return (
    <Footer>
      <Typography variant="overline"> &copy; Black Sheep 2020</Typography>
      <FlexGrow />
      <Button color="inherit" onClick={() => history.push("/contact")}>
        Contact
      </Button>
      <Button color="inherit" onClick={() => history.push("/about")}>
        About
      </Button>
    </Footer>
  );
};

const App: React.FC = () => {
  return (
    <>
      <Helmet titleTemplate="%s - Black Sheep" defaultTitle="Black Sheep">
        <html lang="en" />
        <meta name="description" content="Basic example" />
      </Helmet>
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
                        <AppFooter />
                      </Router>
                    </CartContextProvider>
                  </MeContextProvider>{" "}
                </ApolloHooksProvider>
              </ApolloProvider>
            </ThemeProvider>
          </MuiThemeProvider>
        </StylesProvider>
      </div>
    </>
  );
};

export default App;
