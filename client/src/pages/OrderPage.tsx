import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import CartContext from "../CartContext";
import LoadingButton from "../components/LoadingButton";
import {
  Typography,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  TextField,
  Grid,
  Box,
  Button,
} from "@material-ui/core";
import {
  useGetCartQuery,
  useCreateOrderMutation,
  GetMyOrdersDocument,
} from "../generated/graphql";
import MeContext from "../MeContext";
import StyledMain from "../components/StyledMain";
import Loader from "../components/Loader";
import Error from "../components/Error";
import styled from "styled-components";
import { Helmet } from "react-helmet";

const FlexGrow = styled.div`
  flex-grow: 1;
`;

const OrderPage = () => {
  const history = useHistory();
  const me = useContext(MeContext);
  const { cartId, resetCart } = useContext(CartContext);

  const { data, loading, error } = useGetCartQuery({
    variables: {
      cartId,
    },
  });

  const [createOrderMutation] = useCreateOrderMutation();
  const [address, setAddress] = useState<string>(me?.address ?? "");

  const items = data?.cart?.items ?? [];

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  if (loading) return <Loader />;
  if (error)
    return (
      <Error errorMessage="Sorry! Something went wrong... Please try again!" />
    );

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <>
      <Helmet>
        <title>Order</title>
      </Helmet>
      <StyledMain>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const { data } = await createOrderMutation({
              variables: { input: { address, cartId } },
              refetchQueries: me ? [{ query: GetMyOrdersDocument }] : [],
            });

            const orderId = data!.createOrder.id;

            await resetCart();

            history.push(`/order-confirmation/${orderId}`);
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Order</Typography>
            </Grid>
            <Grid item xs={12}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.product.name}</TableCell>
                      <TableCell>{item.size.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        {formatter.format(item.product.price * item.quantity)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1">
                Total amount: {formatter.format(totalAmount)}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" color="secondary">
                When you have submitted the order, make sure to transer the
                total amount of money to Swish account number 0793374685. Your
                order will be shipped to the delivery address within 24 hours
                after the payment is received.
              </Typography>
            </Grid>
            <Box marginBottom={2} />
            <Grid item xs={12}>
              <Typography variant="h6">Address</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="address"
                name="address"
                value={address}
                label="Delivery address"
                onChange={(e) => setAddress(e.target.value as string)}
                fullWidth
              />
            </Grid>
          </Grid>
          <Box marginBottom={2} />
          <Grid container spacing={2}>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => history.push("/")}
              >
                Resume Shopping
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => history.push("/cart")}
              >
                Go to Cart
              </Button>
            </Grid>
            <FlexGrow />
            <Grid item>
              <LoadingButton
                loading={loading}
                variant="contained"
                color="secondary"
                type="submit"
              >
                Create order
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </StyledMain>
    </>
  );
};

export default OrderPage;
