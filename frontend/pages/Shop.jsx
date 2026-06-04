import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import Naavbar from "../components/Naavbar";
import Footer from "../sections/Home/Footer";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../src/Context/AuthContext";
import { productsAPI } from "../src/services/api";
import toast from "react-hot-toast";

const Shop = () => {
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [qty, setQty] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await productsAPI.getAll();
      setProducts(res.data.products);
    } catch (error) {
      console.log("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const increase = (product) => {
    if (!user) {
      toast.error("Please login to add items to cart");
      navigate("/login");
      return;
    }
    const productId = product._id || product.id;
    setQty((prev) => {
      const newCount = (prev[productId] || 0) + 1;
      addToCart(product, 1);
      return { ...prev, [productId]: newCount };
    });
  };

  const decrease = (product) => {
    const productId = product._id || product.id;
    setQty((prev) => {
      const newCount = (prev[productId] || 1) - 1;
      if (newCount <= 0) return { ...prev, [productId]: 0 };
      return { ...prev, [productId]: newCount };
    });
  };

  return (
    <>
      <Naavbar />
      <div className="pt-32 pb-20 bg-[#0d0d0d] text-white text-center font-[Poppins]">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-[#00ff99] to-[#067a55] bg-clip-text text-transparent animate-fadeIn">
          Shop Your Favorite Plants <i className="fa-solid fa-leaf"></i>
        </h1>

        {loading ? (
          <div className="mt-20">
            <p className="text-gray-400 text-lg">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="mt-20">
            <p className="text-gray-400 text-lg">
              No products available yet. Check back soon! <i className="fa-solid fa-seedling"></i>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto px-6 mt-10 animate-fadeInSlow">
            {products.map((item) => {
              const productId = item._id || item.id;
              const count = qty[productId] || 0;
              const displayPrice =
                typeof item.price === "number"
                  ? `₹${item.price}/-`
                  : item.price;
              const displayImg = item.image || item.img;
              const displayRating = item.rating || 0;
              const displayReviews = item.reviews || 0;

              return (
                <div
                  key={productId}
                  className="bg-[#111111c5] backdrop-blur-md rounded-2xl shadow-xl p-5 
                  hover:scale-[1.05] hover:shadow-[0_0_20px_#00ff99] transition-all duration-500"
                >
                  <div className="overflow-hidden rounded-xl">
                    <img
                      src={displayImg}
                      className="w-full h-56 object-cover rounded-xl hover:scale-110 transition-all duration-700"
                    />
                  </div>

                  <h2 className="text-xl font-bold mt-3">{item.name}</h2>
                  <p className="text-gray-400 text-sm">{item.type}</p>

                  <div className="flex items-center justify-center gap-2 mt-2">
                    <span className="text-[#00ff99] font-bold">
                      {displayRating}
                    </span>
                    <span className="text-yellow-300 text-lg">⭐</span>
                    <span className="text-gray-400 text-sm">
                      ({displayReviews})
                    </span>
                  </div>

                  <p className="text-[#00ff99] font-bold text-xl mt-1">
                    {displayPrice}
                  </p>

                  {count === 0 ? (
                    <button
                      onClick={() => increase(item)}
                      className="mt-4 w-full bg-[#00ff99] text-black py-2 rounded-md font-semibold hover:bg-[#05e98c] transition-all duration-300 hover:scale-105"
                    >
                      Add to Cart +
                    </button>
                  ) : (
                    <div className="flex justify-between mt-4 bg-[#0d0d0d] py-2 px-4 rounded-md">
                      <button
                        onClick={() => decrease(item)}
                        className="text-xl font-bold"
                      >
                        −
                      </button>
                      <span className="font-bold">{count}</span>
                      <button
                        onClick={() => increase(item)}
                        className="text-xl font-bold"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Shop;
