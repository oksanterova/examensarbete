import React, { useContext } from "react";
import {
  useGetProductsQuery,
  useAddCartItemMutation,
  Product,
  CreateCartItemInput,
  GetCartDocument
} from "../generated/graphql";

import {
  Typography,
  CardContent,
  Container,
  Grid,
  Card,
  CardActions,
  Button,
  CardMedia,
  CircularProgress
} from "@material-ui/core";
import styled from "styled-components";
import CartContext from "../CartContext";
import LoadingButton from "../components/LoadingButton";

const CardGrid = styled(Container)`
  padding-top: ${props => props.theme.spacing(8)}px;
  padding-bottom: ${props => props.theme.spacing(8)}px;
`;

const CustomCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ProductMedia = styled(CardMedia)`
  paddingtop: "56.25%"; // 16:9
`;

const ProductCard: React.FC<Product> = product => {
  const { cartId } = useContext(CartContext);

  const input: CreateCartItemInput = {
    cartId,
    productId: product.id,
    sizeId: "1",
    quantity: 1
  };

  const [addCartItemMutation, { loading }] = useAddCartItemMutation({
    variables: {
      input
    },
    refetchQueries: [{ query: GetCartDocument, variables: { cartId } }],
    awaitRefetchQueries: true
  });

  return (
    <CustomCard>
      <ProductMedia
        image="https://source.unsplash.com/random"
        title="Image title"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {product.name}
        </Typography>
        <Typography>{JSON.stringify(product)}</Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          size="small"
          color="primary"
          onClick={() => addCartItemMutation()}
          loading={loading}
        >
          <Typography>Add to Cart</Typography>
        </LoadingButton>
      </CardActions>
    </CustomCard>
  );
};

const Homepage: React.FC = () => {
  const { loading, data, error } = useGetProductsQuery();

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <CardGrid maxWidth="md">
      <Grid container spacing={4}>
        {data?.products.map(product => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </CardGrid>
  );
};

export default Homepage;
