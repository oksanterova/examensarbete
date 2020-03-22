import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import {
  useGetSizesQuery,
  useGetCategoriesQuery,
  ProductInput,
  Product
} from "../generated/graphql";
import NumberFormat from "react-number-format";
import MultiSelectField from "./MultiSelectField";
import Loader from "../components/Loader";
import Error from "../components/Error";

type MultiSelectValue = {
  id: string;
  name: string;
};

type ProductFormProps = {
  product?: Partial<Product>;
  submit: (input: ProductInput) => Promise<void>;
  title: string;
  buttonAction: string;
};

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  submit,
  title,
  buttonAction
}) => {
  const history = useHistory();
  const [sizes, setSizes] = useState<MultiSelectValue[]>(product?.sizes ?? []);
  const [categories, setCategories] = useState<MultiSelectValue[]>(
    product?.categories ?? []
  );
  const [name, setName] = useState<string>(product?.name ?? "");
  const [price, setPrice] = useState<string>(product?.price?.toFixed(2) ?? "");
  const [description, setDescription] = useState<string>(
    product?.description ?? ""
  );
  const input: ProductInput = {
    name,
    price: 0,
    description,
    categoryIds: categories.map(category => category.id),
    sizeIds: sizes.map(size => size.id)
  };

  const {
    data: sizeData,
    loading: sizeLoading,
    error: sizeError
  } = useGetSizesQuery();

  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError
  } = useGetCategoriesQuery();

  if (sizeLoading || categoryLoading) return <Loader />;

  if (sizeError || categoryError) return <Error />;

  return (
    <form
      onSubmit={async e => {
        e.preventDefault();
        await submit(input);
        history.push("/product-manager");
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="name"
            name="name"
            value={name}
            label="Enter product name"
            onChange={e => setName(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <NumberFormat
            value={price}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
            renderText={value => <div>{value}</div>}
          />
          <NumberFormat
            required
            id="price"
            name="price"
            customInput={TextField}
            label="Enter product price"
            fullWidth
            thousandSeparator={true}
            prefix={"$"}
            value={price}
            onValueChange={({ value }) => {
              setPrice(value);
            }}
            isNumericString
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            multiline
            id="description"
            name="description"
            value={description}
            label="Provide product description"
            onChange={e => setDescription(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <MultiSelectField
            id="size"
            label="Select available sizes"
            required
            fullWidth
            value={sizes}
            options={sizeData?.sizes ?? []}
            onChange={setSizes}
          />
        </Grid>
        <Grid item xs={12}>
          <MultiSelectField
            id="category"
            label="Select relevant categories"
            required
            fullWidth
            value={categories}
            options={categoryData?.categories ?? []}
            onChange={setCategories}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            {buttonAction}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProductForm;
