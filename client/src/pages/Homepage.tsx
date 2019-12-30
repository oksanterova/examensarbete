import React from "react";
import { useGetProductsQuery, Product } from "../generated/graphql";

import {
  Typography,
  CardContent,
  Container,
  Grid,
  Card,
  CardMedia
} from "@material-ui/core";
import styled from "styled-components";
import StyledMain from "../components/StyledMain";

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
  padding-top: 100%;
`;

const ProductCard: React.FC<Product> = product => {
  return (
    <CustomCard>
      <ProductMedia
        image="http://placekitten.com/200/300"
        title="Image title"
      />
      <CardContent>
        <Typography variant="h5" component="h2">
          {product.name}
        </Typography>
      </CardContent>
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
    <StyledMain fullWidth>
      <CardGrid maxWidth="xl">
        <Grid container spacing={4}>
          {data?.products.map(product => (
            <Grid item key={product.id} xs={12} sm={4} md={2}>
              <ProductCard {...product} />
            </Grid>
          ))}
        </Grid>
      </CardGrid>
    </StyledMain>
  );
};

export default Homepage;
