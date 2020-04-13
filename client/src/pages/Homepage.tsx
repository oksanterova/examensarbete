import React from "react";
import {
  useGetProductsQuery,
  GetProductsQuery,
  useGetCategoriesQuery,
  Category,
  Product
} from "../generated/graphql";
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

export type ProductCardProps = GetProductsQuery["products"][0];

export const ProductCard: React.FC<ProductCardProps> = ({
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

const Homepage: React.FC<{ activeCategories: string[] }> = ({
  activeCategories = []
}) => {
  const history = useHistory();
  const {
    loading: productsLoading,
    data: { products } = { products: [] },
    error: productsError
  } = useGetProductsQuery();
  const {
    loading: categoriesLoading,
    data: { categories } = { categories: [] },
    error: categoriesError
  } = useGetCategoriesQuery();

  if (categoriesLoading || productsLoading) {
    return <Loader />;
  }

  if (productsError || categoriesError) {
    return (
      <Error errorMessage="Sorry! Something went wrong... Please try again!" />
    );
  }

  const isPeopleCategory = ({ name }: { name: string }) => {
    return ["Women", "Men", "Kids"].includes(name);
  };

  const people = categories.filter(isPeopleCategory);
  const clothes = categories.filter(category => !isPeopleCategory(category));

  const activePeople = activeCategories.filter(name =>
    isPeopleCategory({ name })
  );
  const activeClothes = activeCategories.filter(
    name => !isPeopleCategory({ name })
  );

  const isActive = (category: Category) => {
    return activeCategories.includes(category.name);
  };

  const selectCategory = (category: Category) => {
    const newCategories = isActive(category)
      ? activeCategories.filter(
          activeCategory => activeCategory !== category.name
        )
      : [category.name, ...activeCategories].sort();

    if (newCategories.length === 0) {
      history.push("/");
    } else {
      history.push(`?categories=${newCategories.join(",")}`);
    }
  };

  const includesProduct = (product: Product) => {
    const peopleCategory = product.categories.find(
      category =>
        activePeople.length === 0 || activePeople.includes(category.name)
    );

    const clothesCategory = product.categories.find(
      category =>
        activeClothes.length === 0 || activeClothes.includes(category.name)
    );

    return Boolean(peopleCategory && clothesCategory);
  };

  const filteredProducts = products.filter(includesProduct);

  return (
    <CardGrid maxWidth="xl">
      <Grid container spacing={3} justify="space-between">
        <Grid item>
          {people.map(category => (
            <Button
              size="large"
              color={isActive(category) ? "secondary" : undefined}
              onClick={() => selectCategory(category)}
              key={category.id}
            >
              {category.name}
            </Button>
          ))}
        </Grid>
        <Grid item>
          {clothes.map(category => (
            <Button
              size="large"
              color={isActive(category) ? "secondary" : undefined}
              onClick={() => selectCategory(category)}
              key={category.id}
            >
              {category.name}
            </Button>
          ))}
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {filteredProducts.map(product => (
          <Grid item key={product.id} xs={6} sm={4} md={2}>
            <ProductCard {...product} />
          </Grid>
        ))}
      </Grid>
    </CardGrid>
  );
};

export default Homepage;
