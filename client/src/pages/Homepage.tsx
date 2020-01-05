import React from "react";
import { useGetProductsQuery, Product } from "../generated/graphql";

import {
  Typography,
  CardContent,
  Container,
  Grid,
  Card,
  CardMedia,
  Button
} from "@material-ui/core";
import styled from "styled-components";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { useHistory } from "react-router";

const Main = styled.main`
  width: auto;
  padding-top: ${props => props.theme.spacing(0)}px;
  margin-left: ${props => props.theme.spacing(0)}px;
  margin-right: ${props => props.theme.spacing(0)}px;

  ${props => props.theme.breakpoints.up(600 + props.theme.spacing(3) * 2)} {
    width: 100%;
    margin-top: ${props => props.theme.spacing(0)}px;
    padding-top: ${props => props.theme.spacing(3)}px;
    margin-left: auto;
    margin-right: auto;
  }
`;

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
  const history = useHistory();

  return (
    <CustomCard>
      <ProductMedia
        image="http://placekitten.com/200/300"
        title={product.name}
      />
      <CardContent>
        <Button
          onClick={() => {
            const productId = product.id;
            history.push(`/product/${productId}`);
          }}
        >
          <Typography variant="h6">{product.name}</Typography>
        </Button>
      </CardContent>
    </CustomCard>
  );
};

const Homepage: React.FC = () => {
  const { loading, data, error } = useGetProductsQuery();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <Main>
      <CardGrid maxWidth="xl">
        <Grid container spacing={3}>
          {data?.products.map(product => (
            <Grid item key={product.id} xs={12} sm={4} md={2}>
              <ProductCard {...product} />
            </Grid>
          ))}
        </Grid>
      </CardGrid>
    </Main>
  );
};

export default Homepage;
