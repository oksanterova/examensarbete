import React from "react";
import ProductForm from "../components/ProductForm";
import { ProductInput, useCreateProductMutation } from "../generated/graphql";
import StyledMain from "../components/StyledMain";

const CreateProductPage = () => {
  const [createProductMutation] = useCreateProductMutation();

  async function submit(input: ProductInput): Promise<void> {
    await createProductMutation({ variables: { input } });
  }

  return (
    <StyledMain>
      <ProductForm submit={submit} />
    </StyledMain>
  );
};

export default CreateProductPage;
