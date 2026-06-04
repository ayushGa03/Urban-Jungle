import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "../src/Context/AuthContext";
import { cartAPI } from "../src/services/api";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user, token } = useContext(AuthContext);
  const [syncing, setSyncing] = useState(false);

  // LOAD CART FROM DB WHEN USER LOGS IN
  useEffect(() => {
    if (user && token) {
      fetchCartFromDB();
    } else {
      // Keep local cart for guests
    }
  }, [user, token]);

  const fetchCartFromDB = async () => {
    try {
      const res = await cartAPI.getCart();
      if (res.data.cart && res.data.cart.items) {
        const dbItems = res.data.cart.items.map((item) => ({
          id: item.productId,
          productId: item.productId,
          name: item.name,
          price: `₹${item.price}/-`,
          priceNum: item.price,
          quantity: item.quantity,
          img: item.image,
          image: item.image,
        }));
        setCart(dbItems);
      }
    } catch (error) {
      console.log("Error fetching cart:", error);
    }
  };

  // ADD TO CART
  const addToCart = async (product, qty = 1) => {
    // Extract numeric price
    let priceNum = product.priceNum;
    if (!priceNum && product.price) {
      if (typeof product.price === "string") {
        priceNum = parseInt(product.price.replace(/₹|\/-|-|,/g, ""));
      } else {
        priceNum = product.price;
      }
    }

    // Update local state
    setCart((prev) => {
      const exist = prev.find(
        (item) =>
          item.id === product.id ||
          item.id === product._id ||
          item.productId === product._id
      );
      if (exist) {
        return prev.map((item) =>
          item.id === product.id ||
          item.id === product._id ||
          item.productId === product._id
            ? { ...item, quantity: (item.quantity || 1) + qty }
            : item
        );
      } else {
        return [
          ...prev,
          {
            ...product,
            id: product._id || product.id,
            productId: product._id || product.id,
            quantity: qty,
            priceNum,
            img: product.image || product.img,
          },
        ];
      }
    });

    // Sync to DB if logged in
    if (user && token) {
      try {
        await cartAPI.addItem({
          productId: product._id || product.id,
          name: product.name,
          price: priceNum,
          quantity: qty,
          image: product.image || product.img || "",
        });
      } catch (error) {
        console.log("Error syncing cart to DB:", error);
      }
    }
  };

  // REMOVE ITEM
  const removeFromCart = async (id) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== id && item.productId !== id)
    );

    // Sync to DB if logged in
    if (user && token) {
      try {
        await cartAPI.removeItem(id);
      } catch (error) {
        console.log("Error removing from cart DB:", error);
      }
    }
  };

  // CLEAR CART
  const clearCart = async () => {
    setCart([]);
    if (user && token) {
      try {
        await cartAPI.clearCart();
      } catch (error) {
        console.log("Error clearing cart DB:", error);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
