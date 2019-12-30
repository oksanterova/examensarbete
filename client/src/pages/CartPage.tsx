import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import CartContext from "../CartContext";
import {
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  IconButton,
  Grid,
  Box
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import LoadingButton from "../components/LoadingButton";

import {
  useGetCartQuery,
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
  GetCartDocument
} from "../generated/graphql";

const CartPage: React.FC = () => {
  const history = useHistory();
  const { cartId } = useContext(CartContext);
  const { data, loading, error } = useGetCartQuery({
    variables: {
      cartId
    }
  });

  const [deleteCartItemMutation] = useDeleteCartItemMutation();

  const [updateCartItemMutation] = useUpdateCartItemMutation();

  const items = data?.cart.items;

  const quantities = [1, 2, 3, 4, 5];

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  if (items?.length === 0) {
    return <h1>Your cart is empty</h1>;
  }

  return (
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
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items?.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.product.name}</TableCell>
                <TableCell>{item.size.name}</TableCell>
                <TableCell>
                  <Select
                    required
                    value={item.quantity}
                    onChange={e =>
                      updateCartItemMutation({
                        variables: {
                          id: item.id,
                          quantity: e.target.value as number
                        },
                        refetchQueries: [
                          { query: GetCartDocument, variables: { cartId } }
                        ],
                        awaitRefetchQueries: true
                      })
                    }
                  >
                    {quantities.map(quantity => (
                      <MenuItem key={quantity} value={quantity}>
                        {quantity}
                      </MenuItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  {" "}
                  <IconButton
                    onClick={() =>
                      deleteCartItemMutation({
                        variables: { id: item.id },
                        refetchQueries: [
                          { query: GetCartDocument, variables: { cartId } }
                        ],
                        awaitRefetchQueries: true
                      })
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
      <Grid item xs={12}>
        <Box marginTop={2}>
          <LoadingButton
            loading={loading}
            variant="contained"
            color="primary"
            onClick={event => history.push("/order")}
          >
            Go to checkout
          </LoadingButton>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CartPage;
