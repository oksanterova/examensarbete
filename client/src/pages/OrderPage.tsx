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
  Box
} from "@material-ui/core";
import { useGetCartQuery, useCreateOrderMutation } from "../generated/graphql";
import MeContext from "../MeContext";
import StyledMain from "../components/StyledMain";

const OrderPage = () => {
  const history = useHistory();
  const me = useContext(MeContext);
  const { cartId, resetCart } = useContext(CartContext);

  const { data, loading, error } = useGetCartQuery({
    variables: {
      cartId
    }
  });

  const [createOrderMutation] = useCreateOrderMutation();
  const [address, setAddress] = useState<string>(me?.address ?? "");

  const items = data?.cart.items;

  if (loading) return <h1>Loading</h1>;
  if (error) return <h1>Error</h1>;

  return (
    <StyledMain>
      <form
        onSubmit={async e => {
          e.preventDefault();

          const { data } = await createOrderMutation({
            variables: { input: { address, cartId } }
          });
          const orderId = data!.createOrder.id;

          await resetCart();

          history.push(`/order-confirmation/${orderId}`);
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" component="h2">
              Cart
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
            <Typography gutterBottom variant="h5" component="h2">
              Address
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address"
              name="address"
              value={address}
              label="Delivery address"
              onChange={e => setAddress(e.target.value as string)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Box marginTop={2}>
              <LoadingButton
                loading={loading}
                variant="contained"
                color="primary"
                type="submit"
              >
                Create order
              </LoadingButton>
            </Box>
          </Grid>
        </Grid>
      </form>
    </StyledMain>
  );
};

export default OrderPage;
