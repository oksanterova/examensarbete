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
  TextField
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import LoadingButton from "../components/LoadingButton";
import CartContext from "../CartContext";

const ProductPage = () => {
  // @ts-ignore
  const { id }: { id: string } = useParams();
  const { loading, data, error } = useGetProductQuery({
    variables: { id: id }
  });

  const { cartId } = useContext(CartContext);

  const input: CreateCartItemInput = {
    cartId,
    productId: id,
    sizeId: "1",
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

  const [sizeId, setSizeId] = useState<string>("");

  if (loading) return <h1>Loading</h1>;

  if (error) return <h1>Error</h1>;

  const product = data!.product;

  return (
    <>
      <Typography>{product.name}</Typography>
      <Typography>{product.description}</Typography>
      <TextField
        select
        required
        fullWidth
        value={sizeId}
        label="Size:"
        onChange={e => setSizeId(e.target.value as string)}
      >
        {product.sizes.map(size => (
          <MenuItem key={size.id} value={size.id}>
            {size.name}
          </MenuItem>
        ))}
      </TextField>
      <Typography>Categories:</Typography>
      <List>
        {product.categories.map(category => (
          <ListItem key={category.id}>{category.name}</ListItem>
        ))}
      </List>
      <LoadingButton
        variant="contained"
        size="small"
        color="primary"
        onClick={() => addCartItemMutation()}
        loading={addCartItemLoading}
      >
        <Typography>Add to Cart</Typography>
      </LoadingButton>
    </>
  );
};

export default ProductPage;
