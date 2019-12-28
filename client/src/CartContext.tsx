import React, { useEffect, useState } from "react";
import { useCreateCartMutation } from "./generated/graphql";

const CartContext = React.createContext<{ cartId: string }>({
  cartId: ""
});

export const CartContextProvider: React.FC<{
  children: React.ReactNode | React.ReactNode[] | null;
}> = ({ children }) => {
  const [cartId, setCartId] = useState<string | null>(null);
  const [createCartMutation] = useCreateCartMutation();

  useEffect(() => {
    const existingCartId = localStorage.getItem("cartId");

    async function fetchData() {
      const { data } = await createCartMutation();
      const cartId = data!.createCart.id;

      localStorage.setItem("cartId", cartId);
      setCartId(cartId);
    }

    if (existingCartId) {
      setCartId(existingCartId);
    } else {
      fetchData();
    }
  }, [createCartMutation]);

  if (cartId === null) {
    return <h1>Loading</h1>;
  }

  return (
    <CartContext.Provider value={{ cartId }}>{children}</CartContext.Provider>
  );
};

export default CartContext;
