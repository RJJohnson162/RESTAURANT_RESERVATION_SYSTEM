import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartData, setCartData] = useState({ cuisines: [], seats: [] });

  useEffect(() => {
    if (ls && cartData.cuisines.length > 0) {
      ls.setItem("cartCuisines", JSON.stringify(cartData.cuisines));
    }
    if (ls && cartData.seats.length > 0) {
      ls.setItem("cartSeats", JSON.stringify(cartData.seats));
    }
  }, [cartData, ls]);

  useEffect(() => {
    if (ls) {
      const cartCuisineData = ls.getItem("cartCuisines");
      if (cartCuisineData) {
        setCartData((prev) => ({
          ...prev,
          cuisines: JSON.parse(cartCuisineData),
        }));
      }

      const cartSeatData = ls.getItem("cartSeats");
      if (cartSeatData) {
        setCartData((prev) => ({
          ...prev,
          seats: JSON.parse(cartSeatData),
        }));
      }
    }
  }, [ls]);

  function addCuisine(cuisineId) {
    setCartData((prev) => ({
      ...prev,
      cuisines: [...prev.cuisines, cuisineId],
    }));
  }

  function addSeat(seatId) {
    setCartData((prev) => ({
      ...prev,
      seats: [...prev.seats, seatId],
    }));
  }

  function removeItem(cuisineId) {
    setCartData((prev) => {
      const pos = prev.cuisines.indexOf(cuisineId);
      if (pos !== -1) {
        const updatedCuisines = prev.cuisines.filter(
          (value, index) => index !== pos
        );
        const updatedSeats = prev.seats.filter((value, index) => index !== pos);
        const updatedCartData = {
          ...prev,
          cuisines: updatedCuisines,
          seats: updatedSeats,
        };
        ls?.setItem("cartCuisines", JSON.stringify(updatedCuisines));
        ls?.setItem("cartSeats", JSON.stringify(updatedSeats));
        return updatedCartData;
      }
      return prev;
    });
  }

  function removeSeat(seatId) {
    setCartData((prev) => ({
      ...prev,
      seats: prev.seats.filter((id) => id !== seatId),
    }));
  }

  function clearCart() {
    setCartData({ cuisines: [], seats: [] });
    ls?.removeItem("cartCuisines");
    ls?.removeItem("cartSeats");
  }

  return (
    <CartContext.Provider
      value={{
        cartData,
        addCuisine,
        removeItem,
        clearCart,
        addSeat,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
