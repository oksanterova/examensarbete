import React, { useEffect, useState, useCallback } from "react";
import { useCreateCartMutation } from "./generated/graphql";

const CartContext = React.createContext<{
  cartId: string;
  resetCart: () => Promise<void>;
}>({
  cartId: "",
  resetCart: async () => {}
});

export const CartContextProvider: React.FC<{
  children: React.ReactNode | React.ReactNode[] | null;
}> = ({ children }) => {
  const [cartId, setCartId] = useState<string | null>(null);
  const [createCartMutation] = useCreateCartMutation();

  const resetCart = useCallback(async () => {
    const { data } = await createCartMutation();
    const cartId = data!.createCart.id;

    localStorage.setItem("cartId", cartId);
    setCartId(cartId);
  }, [createCartMutation]);

  useEffect(() => {
    const existingCartId = localStorage.getItem("cartId");

    if (existingCartId) {
      setCartId(existingCartId);
    } else {
      resetCart();
    }
  }, [resetCart]);

  if (cartId === null) {
    return <h1>Loading</h1>;
  }

  return (
    <CartContext.Provider value={{ cartId, resetCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
