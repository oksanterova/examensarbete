import React, { useContext, useState, FormEventHandler } from "react";
import {
  useGetProductQuery,
  useAddCartItemMutation,
  GetCartDocument,
  CreateCartItemInput,
} from "../generated/graphql";
import {
  Typography,
  List,
  ListItem,
  MenuItem,
  TextField,
  Grid,
  Box,
  Button,
} from "@material-ui/core";
import { useParams, useHistory } from "react-router-dom";
import LoadingButton from "../components/LoadingButton";
import CartContext from "../CartContext";
import StyledMain from "../components/StyledMain";
import Loader from "../components/Loader";
import Error from "../components/Error";
import styled from "styled-components";
import { Helmet } from "react-helmet";

const Image = styled.img`
  width: 250px;
  height: 250px;
`;

const FlexGrow = styled.div`
  flex-grow: 1;
`;

const ProductPage = () => {
  const history = useHistory();
  // @ts-ignore
  const { id }: { id: string } = useParams();
  const { loading, data, error } = useGetProductQuery({
    variables: { id: id },
  });

  const { cartId } = useContext(CartContext);
  const [sizeId, setSizeId] = useState<string | undefined>(undefined);
  const [sizeError, setSizeError] = useState(false);

  const [
    addCartItemMutation,
    { loading: addCartItemLoading },
  ] = useAddCartItemMutation({
    refetchQueries: [{ query: GetCartDocument, variables: { cartId } }],
    awaitRefetchQueries: true,
  });

  if (loading) return <Loader />;

  if (error) {
    return (
      <Error errorMessage="Sorry! Something went wrong... Please try again!" />
    );
  }

  const product = data!.product;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    if (sizeId === undefined) {
      setSizeError(true);
      return;
    }

    const input: CreateCartItemInput = {
      cartId,
      productId: id,
      sizeId,
      quantity: 1,
    };

    addCartItemMutation({ variables: { input } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Helmet>
        <title>{product.name}</title>
        <meta name="description" content={product.description} />
      </Helmet>
      <StyledMain>
        <Typography variant="h6" gutterBottom>
          {product.name}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Image src={`/product-image/${product.productImageId}`} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>
              {formatter.format(product.price)}
            </Typography>
            <Typography>{product.description}</Typography>
            <TextField
              required
              select
              fullWidth
              margin="normal"
              error={sizeError}
              label="Select size:"
              onChange={(e) => {
                setSizeId(e.target.value as string);
                setSizeError(false);
              }}
            >
              {product.sizes.map((size) => (
                <MenuItem key={size.id} value={size.id}>
                  {size.name}
                </MenuItem>
              ))}
            </TextField>
            <Box marginTop={2} />
            <Typography align="center">Categories:</Typography>
            <List>
              {product.categories.map((category) => (
                <ListItem key={category.id}>{category.name}</ListItem>
              ))}
            </List>
          </Grid>
          <Box margin={1} />
          <Grid item xs={12} sm={"auto"}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => history.push("/")}
            >
              Resume Shopping
            </Button>
          </Grid>
          <Grid item xs={12} sm={"auto"}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => history.push("/cart")}
            >
              Go to Cart
            </Button>
          </Grid>
          <FlexGrow />
          <Grid item xs={12} sm={"auto"}>
            <LoadingButton
              variant="contained"
              color="secondary"
              type="submit"
              loading={addCartItemLoading}
            >
              Add to Cart
            </LoadingButton>
          </Grid>
        </Grid>
      </StyledMain>
    </form>
  );
};

export default ProductPage;
