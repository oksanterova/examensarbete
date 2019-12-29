import React, { useContext } from "react";
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
  IconButton
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import {
  useGetCartQuery,
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
  GetCartDocument
} from "../generated/graphql";

const Cart: React.FC = () => {
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

  return (
    <>
      <Typography gutterBottom variant="h5" component="h2">
        Cart
      </Typography>
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
    </>
  );
};

export default Cart;
