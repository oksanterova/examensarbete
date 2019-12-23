import React from "react";
import { useGetProductsQuery } from "../generated/graphql";

const Homepage: React.FC = () => {
  const { loading, data, error } = useGetProductsQuery();

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <ul>
      {data?.products.map(product => (
        <li key={product.id}>{JSON.stringify(product)}</li>
      ))}
    </ul>
  );
};

export default Homepage;
