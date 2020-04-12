import React, { useState, useCallback } from "react";
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
import { useDropzone } from "react-dropzone";
import styled from "styled-components";
import LoadingButton from "./LoadingButton";

const ImagePreview = styled.img`
  width: 128px;
`;

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

type UploadButtonProps = {
  id?: string;
  onUpload: (arg: { id: string }) => void;
};

const UploadButton: React.FC<UploadButtonProps> = ({
  onUpload,
  id: initialId
}) => {
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(initialId);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const formData = new FormData();
    formData.append("image", acceptedFiles[0]);

    setLoading(true);

    fetch("/product-image", {
      method: "post",
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        const id = data.id;

        setId(id);
        setLoading(false);
        onUpload({ id: data.id });
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Grid container spacing={3} {...getRootProps()}>
      <Grid item xs={12}>
        <input
          style={{ display: "none" }}
          accept="image/*"
          id="contained-button-file"
          type="file"
          {...getInputProps()}
        />
        <label htmlFor="contained-button-file">
          <LoadingButton loading={loading} variant="contained" color="primary">
            Upload
          </LoadingButton>
        </label>
      </Grid>
      <Grid item xs={12}>
        {id && <ImagePreview src={`/product-image/${id}`} />}
      </Grid>
    </Grid>
  );
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
  const [productImageId, setProductImageId] = useState<string | undefined>(
    product?.productImageId
  );

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

        if (!productImageId) {
          return;
        }

        const input: ProductInput = {
          name,
          price: parseFloat(price),
          description,
          categoryIds: categories.map(category => category.id),
          sizeIds: sizes.map(size => size.id),
          productImageId
        };

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
          <UploadButton
            id={productImageId}
            onUpload={({ id }) => setProductImageId(id)}
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
