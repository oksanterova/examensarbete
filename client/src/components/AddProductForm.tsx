import React, { useState } from "react";
import { Grid, Typography, TextField, Button } from "@material-ui/core";
import {
  useGetSizesQuery,
  useGetCategoriesQuery,
  useCreateProductMutation,
  CreateProductInput
} from "../generated/graphql";
import MultiSelectField from "./MultiSelectField";

type MultiSelectValue = {
  id: string;
  name: string;
};

const AddProductForm: React.FC = () => {
  const [sizes, setSizes] = useState<MultiSelectValue[]>([]);
  const [categories, setCategories] = useState<MultiSelectValue[]>([]);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const input: CreateProductInput = {
    name,
    description,
    categoryIds: categories.map(category => category.id),
    sizeIds: sizes.map(size => size.id)
  };
  const [createProductMutation] = useCreateProductMutation({
    variables: {
      input: input
    }
  });

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

  if (sizeLoading || categoryLoading) return <h1>Loading</h1>;

  if (sizeError || categoryError) return <h1>Error</h1>;

  return (
    <form onSubmit={e => createProductMutation()}>
      <Typography variant="h6" gutterBottom>
        Product Creation
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
            Create product
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddProductForm;
