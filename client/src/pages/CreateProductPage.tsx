import React from "react";
import ProductForm from "../components/ProductForm";
import {
  ProductInput,
  useCreateProductMutation,
  GetProductsDocument
} from "../generated/graphql";
import StyledMain from "../components/StyledMain";

const CreateProductPage = () => {
  const [createProductMutation] = useCreateProductMutation({
    refetchQueries: [{ query: GetProductsDocument }],
    awaitRefetchQueries: true
  });

  async function submit(input: ProductInput): Promise<void> {
    await createProductMutation({
      variables: { input },
      refetchQueries: [{ query: GetProductsDocument }],
      awaitRefetchQueries: true
    });
  }

  const buttonAction = "Create product";
  const title = "Product creation";

  return (
    <StyledMain>
      <ProductForm submit={submit} buttonAction={buttonAction} title={title} />
    </StyledMain>
  );
};

export default CreateProductPage;
