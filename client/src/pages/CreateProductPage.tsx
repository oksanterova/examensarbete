import React from "react";
import ProductForm from "../components/ProductForm";
import {
  ProductInput,
  useCreateProductMutation,
  GetProductsDocument,
} from "../generated/graphql";
import StyledMain from "../components/StyledMain";
import { Helmet } from "react-helmet";

const CreateProductPage = () => {
  const [createProductMutation] = useCreateProductMutation({
    refetchQueries: [{ query: GetProductsDocument }],
    awaitRefetchQueries: true,
  });

  async function submit(input: ProductInput): Promise<void> {
    await createProductMutation({
      variables: { input },
      refetchQueries: [{ query: GetProductsDocument }],
      awaitRefetchQueries: true,
    });
  }

  const buttonAction = "Create product";
  const title = "Product creation";

  return (
    <>
      <Helmet>
        <title>Create Product</title>
      </Helmet>
      <StyledMain>
        <ProductForm
          submit={submit}
          buttonAction={buttonAction}
          title={title}
        />
      </StyledMain>
    </>
  );
};

export default CreateProductPage;
