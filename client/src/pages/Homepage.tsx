import React from "react";
import { useGetProductsQuery, GetProductsQuery } from "../generated/graphql";

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

const CardGrid = styled(Container)`
  margin: 0;
  padding-top: ${props => props.theme.spacing(12)}px;
  padding-bottom: ${props => props.theme.spacing(4)}px;
`;

const CustomCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ProductMedia = styled(CardMedia)`
  padding-top: 100%;
  cursor: pointer;
`;

type ProductCardProps = GetProductsQuery["products"][0];

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  productImageId,
  price
}) => {
  const history = useHistory();
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  });

  return (
    <CustomCard>
      <ProductMedia
        image={`/product-image/${productImageId}`}
        title={name}
        onClick={() => {
          history.push(`/product/${id}`);
        }}
      />
      <CardContent>
        <Button
          onClick={() => {
            history.push(`/product/${id}`);
          }}
        >
          <Typography variant="h6">{name}</Typography>
        </Button>
        <Typography>{formatter.format(price)}</Typography>
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
    <CardGrid maxWidth="xl">
      <Grid container spacing={3}>
        {data?.products.map(product => (
          <Grid item key={product.id} xs={6} sm={4} md={2}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </CardGrid>
  );
};

export default Homepage;
