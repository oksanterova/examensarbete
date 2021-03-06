import React from "react";
import { useHistory } from "react-router-dom";
import {
  Typography,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Button,
  Grid,
  Box,
} from "@material-ui/core";
import { useGetOrderQuery } from "../generated/graphql";
import { useParams } from "react-router-dom";
import StyledMain from "../components/StyledMain";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Helmet } from "react-helmet";

const OrderConfirmation = () => {
  const history = useHistory();
  // @ts-ignore
  const { id }: { id: string } = useParams();

  const { data, loading, error } = useGetOrderQuery({
    variables: {
      id,
    },
  });

  const items = data?.order.items ?? [];

  if (loading) return <Loader />;
  if (error)
    return (
      <Error errorMessage="Sorry! Something went wrong... Please try again!" />
    );

  let options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const createdAt = new Date(data?.order.createdAt).toLocaleString(
    "en-us",
    options
  );

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <>
      <Helmet>
        <title>Order Confirmation</title>
      </Helmet>
      <StyledMain>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Order Confirmation</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              Your order number {data?.order.id.substring(0, 8)}
            </Typography>
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
            <Typography>
              created on {createdAt} will be shipped to your address:{" "}
              {data?.order.address}
            </Typography>
            <Grid item xs={12}>
              <Typography variant="body1" color="secondary">
                within 24 hours after the payment of total amount is received.
                Thank you!
              </Typography>
            </Grid>
            <Box marginBottom={2} />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => history.push("/")}
            >
              Back to Store
            </Button>
          </Grid>
        </Grid>
      </StyledMain>
    </>
  );
};

export default OrderConfirmation;
