import React, { useContext } from "react";
import CartContext from "../CartContext";
import { Card, Typography, CardContent } from "@material-ui/core";

import { useGetCartQuery } from "../generated/graphql";

const Cart: React.FC = () => {
  const { cartId } = useContext(CartContext);
  const { data, loading, error } = useGetCartQuery({
    variables: {
      cartId
    }
  });

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Cart
          </Typography>
          <Typography>{JSON.stringify(data?.cart)}</Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Cart;
