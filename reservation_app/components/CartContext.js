import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartItems, setCartItems] = useState([]);
  const [cartCuisines, setCartCuisines] = useState([]);

  useEffect(() => {
    if (cartItems?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, ls]);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartItems(JSON.parse(ls.getItem("cart")));
    }
  }, [ls]);

  useEffect(() => {
    // Fetch cartCuisines from API based on cartItems
    // For demonstration purposes, let's assume it's an empty array initially
    setCartCuisines([]);
  }, [cartItems]);

  function addItem(itemId) {
    setCartItems((prev) => {
      const updatedCart = [...prev, itemId];
      ls?.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }

  function removeItem(itemId) {
    setCartItems((prev) => {
      const updatedCart = prev.filter((value) => value !== itemId);
      ls?.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  }

  function clearCart() {
    setCartItems([]);
    ls?.removeItem("cart");
  }

  // Define addCuisine function
  function addCuisine(cuisineId) {
    // Implement the logic for adding cuisine to the cart
    // For now, let's assume it's similar to addItem function
    addItem(cuisineId);
  }

  // Define removeCuisine function
  function removeCuisine(cuisineId) {
    // Implement the logic for removing cuisine from the cart
    // For now, let's assume it's similar to removeItem function
    removeItem(cuisineId);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addItem,
        removeItem,
        clearCart,
        addCuisine,
        removeCuisine,
        cartCuisines,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
