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
  Grid
} from "@material-ui/core";
import { useGetOrderQuery } from "../generated/graphql";
import { useParams } from "react-router-dom";

const OrderConfirmation = () => {
  const history = useHistory();
  // @ts-ignore
  const { id }: { id: string } = useParams();

  const { data, loading, error } = useGetOrderQuery({
    variables: {
      id
    }
  });

  const items = data?.order.items;

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error</h1>;

  let options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric"
  };
  const createdAt = new Date(data?.order.createdAt).toLocaleString(
    "en-us",
    options
  );

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2">
            Order Confirmation
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="h3">
            Your order number {data?.order.id}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items?.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell>{item.size.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" component="h3">
            created on {createdAt} will be shiped to your address:{" "}
            {data?.order.address}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => history.push("/")}
          >
            Home
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderConfirmation;
