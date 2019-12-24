import React, { useState } from "react";

import { Grid, Typography, TextField } from "@material-ui/core";
import { useGetSizesQuery, useGetCategoriesQuery } from "../generated/graphql";
import MultiSelectField from "./MultiSelectField";

type MultiSelectValue = {
  id: string;
  name: string;
};

const AddProductForm: React.FC = () => {
  const [sizes, setSizes] = useState<MultiSelectValue[]>([]);
  const [categories, setCategories] = useState<MultiSelectValue[]>([]);

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
    <>
      <Typography variant="h6" gutterBottom>
        Product Creation
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="name"
            name="name"
            label="Enter product name"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            multiline
            id="description"
            name="description"
            label="Provide product description"
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
      </Grid>
    </>
  );
};

export default AddProductForm;
