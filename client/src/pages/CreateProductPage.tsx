import React from "react";
import ProductForm from "../components/ProductForm";
import { ProductInput, useCreateProductMutation } from "../generated/graphql";

const CreateProductPage = () => {
  const [createProductMutation] = useCreateProductMutation();

  async function submit(input: ProductInput): Promise<void> {
    await createProductMutation({ variables: { input } });
  }

  return <ProductForm submit={submit} />;
};

export default CreateProductPage;
