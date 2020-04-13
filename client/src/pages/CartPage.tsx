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
  Box,
  Button
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import LoadingButton from "../components/LoadingButton";
import {
  useGetCartQuery,
  useDeleteCartItemMutation,
  useUpdateCartItemMutation,
  GetCartDocument
} from "../generated/graphql";
import StyledMain from "../components/StyledMain";
import Loader from "../components/Loader";
import Error from "../components/Error";
import styled from "styled-components";

const FlexGrow = styled.div`
  flex-grow: 1;
`;

const CartPage: React.FC = () => {
  const history = useHistory();
  const { cartId } = useContext(CartContext);
  const { data, loading, error } = useGetCartQuery({
    variables: {
      cartId
    }
  });
  const items = data?.cart?.items ?? [];

  const [deleteCartItemMutation] = useDeleteCartItemMutation();

  const [updateCartItemMutation] = useUpdateCartItemMutation();

  const quantities = [1, 2, 3, 4, 5];

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Error errorMessage="Sorry! Something went wrong... Please try again!" />
    );
  }

  if (items.length === 0) {
    return (
      <StyledMain>
        <Typography variant="h6">Your cart is empty</Typography>
      </StyledMain>
    );
  }

  const totalAmount = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <StyledMain>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Cart</Typography>
        </Grid>
        <Grid item xs={12}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
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
                    {formatter.format(item.product.price * item.quantity)}
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
          <Typography variant="body1" gutterBottom>
            Total amount: {formatter.format(totalAmount)}
          </Typography>
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
        <FlexGrow />
        <Grid item>
          <LoadingButton
            loading={loading}
            variant="contained"
            color="secondary"
            onClick={event => history.push("/order")}
          >
            Go to checkout
          </LoadingButton>
        </Grid>
      </Grid>
    </StyledMain>
  );
};

export default CartPage;
