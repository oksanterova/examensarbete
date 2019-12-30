import React from "react";
import ProductForm from "../components/ProductForm";
import {
  useUpdateProductMutation,
  ProductInput,
  useGetProductQuery
} from "../generated/graphql";
import { useParams } from "react-router-dom";
import StyledMain from "../components/StyledMain";

const EditProductPage: React.FC = () => {
  // @ts-ignore
  const { id }: { id: string } = useParams();
  const [updateProductMutation] = useUpdateProductMutation();

  const { data, loading, error } = useGetProductQuery({
    variables: { id: id }
  });

  async function submit(input: ProductInput): Promise<void> {
    await updateProductMutation({ variables: { input, id } });
  }

  if (loading) return <h1>Loading</h1>;

  if (error) return <h1>Error</h1>;

  return (
    <StyledMain>
      <ProductForm product={data?.product} submit={submit} />
    </StyledMain>
  );
};

export default EditProductPage;
