import React, { useContext, useState } from "react";
import {
  useGetProductQuery,
  useAddCartItemMutation,
  GetCartDocument,
  CreateCartItemInput
} from "../generated/graphql";
import {
  Typography,
  List,
  ListItem,
  MenuItem,
  TextField,
  Grid
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import LoadingButton from "../components/LoadingButton";
import CartContext from "../CartContext";
import StyledMain from "../components/StyledMain";
import Loader from "../components/Loader";
import Error from "../components/Error";

const ProductPage = () => {
  // @ts-ignore
  const { id }: { id: string } = useParams();
  const { loading, data, error } = useGetProductQuery({
    variables: { id: id }
  });

  const { cartId } = useContext(CartContext);
  const [sizeId, setSizeId] = useState<string>("");

  const input: CreateCartItemInput = {
    cartId,
    productId: id,
    sizeId,
    quantity: 1
  };

  const [
    addCartItemMutation,
    { loading: addCartItemLoading }
  ] = useAddCartItemMutation({
    variables: {
      input
    },
    refetchQueries: [{ query: GetCartDocument, variables: { cartId } }],
    awaitRefetchQueries: true
  });

  if (loading) return <Loader />;

  if (error) return <Error />;

  const product = data!.product;

  return (
    <StyledMain>
      <Typography variant="h6" gutterBottom>
        {product.name}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography gutterBottom>{product.description}</Typography>
          <TextField
            required
            select
            fullWidth
            value={sizeId}
            label="Select size:"
            onChange={e => setSizeId(e.target.value as string)}
          >
            {product.sizes.map(size => (
              <MenuItem key={size.id} value={size.id}>
                {size.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Typography gutterBottom>Categories:</Typography>
          <List>
            {product.categories.map(category => (
              <ListItem key={category.id}>{category.name}</ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12}>
          <LoadingButton
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => {
              addCartItemMutation();
            }}
            loading={addCartItemLoading}
          >
            Add to Cart
          </LoadingButton>
        </Grid>
      </Grid>
    </StyledMain>
  );
};

export default ProductPage;
