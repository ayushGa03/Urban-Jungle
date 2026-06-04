import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../src/Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Naavbar from "../components/Naavbar";
import Footer from "../sections/Home/Footer";
import toast from "react-hot-toast";

const Cart = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const getPrice = (item) => {
    if (item.priceNum) return item.priceNum;
    if (typeof item.price === "number") return item.price;
    if (typeof item.price === "string") {
      return parseInt(item.price.replace(/₹|\/-|-|,/g, "")) || 0;
    }
    return 0;
  };

  const totalPrice = cart.reduce((total, item) => {
    return total + getPrice(item) * (item.quantity || 1);
  }, 0);

  const handleCheckout = () => {
    if (!user) {
      toast.error("Please login to proceed!");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      toast.error("Cart is empty!");
      return;
    }

    // Normalize cart items for payment page
    const normalizedItems = cart.map((item) => ({
      ...item,
      price: typeof item.price === "number" ? `₹${item.price}/-` : item.price,
      img: item.img || item.image,
    }));

    navigate("/pay", { 
      state: { 
        totalAmount: totalPrice,
        cartItems: normalizedItems
      } 
    });
  };

  return (
    <>
      <Naavbar />
      <div className="pt-32 bg-[#0d0d0d] text-white min-h-screen px-6">
        <h1 className="text-4xl font-bold text-center text-[#00ff99]"><i className="fa-solid fa-cart-shopping mr-3"></i>Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center mt-10 flex justify-center items-center flex-col gap-5">
            <p className="text-gray-300 text-lg">Cart is Empty</p>
            <Link to="/shop">
              <button className="bg-[#00ff99] text-black font-bold px-6 py-3 rounded-lg">
                Go Back
              </button>
            </Link>
          </div>
          
        ) : (
          <div className="max-w-5xl mx-auto mt-10 flex flex-col gap-6">
            {cart.map((item) => {
              const itemId = item.id || item.productId || item._id;
              const displayImg = item.img || item.image;
              const displayPrice = typeof item.price === "number" ? `₹${item.price}/-` : item.price;

              return (
                <div key={itemId} className="bg-[#111] p-4 rounded-lg flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <img src={displayImg} className="h-24 w-24 rounded-lg object-cover" />
                    <div>
                      <h2 className="text-xl font-semibold">{item.name}</h2>
                      <p className="text-[#00ff99]">{displayPrice}</p>
                      <p className="text-gray-400">Qty: {item.quantity}</p>
                    </div>
                  </div>

                  <button
                    className="bg-red-500 px-4 py-2 rounded-lg"
                    onClick={() => removeFromCart(itemId)}
                  >
                    Remove
                  </button>
                </div>
              );
            })}

            <div className="bg-[#111] p-6 rounded-lg flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#00ff99]">
                Total: ₹{totalPrice}/-
              </h2>

              <button
                onClick={handleCheckout}
                className="bg-[#00ff99] text-black font-bold px-6 py-3 rounded-lg hover:bg-green-500 transition"
              >
                Proceed to Buy
              </button>
            </div>
            <Link to="/shop">
              <button className="w-full bg-[#00ff99] text-black font-bold px-6 py-3 rounded-lg">
                Go Back
              </button>
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Cart;
