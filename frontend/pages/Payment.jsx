import React, { useState, useContext } from "react";
import Naavbar from "../components/Naavbar";
import Footer from "../sections/Home/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../src/Context/AuthContext";
import { CartContext } from "../Context/CartContext";
import { ordersAPI } from "../src/services/api";
import toast from "react-hot-toast";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { clearCart } = useContext(CartContext);

  const cartItems = location.state?.cartItems || [];
  const totalAmount = location.state?.totalAmount || 0;

  const [selectedUPI, setSelectedUPI] = useState(null);
  const [loading, setLoading] = useState(false);
  const [shippingData, setShippingData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    pincode: user?.pincode || "",
  });

  const upiApps = [
    {
      name: "Google Pay",
      logo: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-pay-icon.png",
    },
    {
      name: "PhonePe",
      logo: "https://e7.pngegg.com/pngimages/332/615/png-clipart-phonepe-india-unified-payments-interface-india-purple-violet.png",
    },
    {
      name: "Paytm",
      logo: "https://www.citypng.com/public/uploads/preview/paytm-circle-logo-hd-png-701751694706614zmho56voff.png",
    },
  ];

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = async () => {
    if (!selectedUPI) {
      toast.error("Please select a UPI app!");
      return;
    }

    if (!shippingData.address || !shippingData.pincode) {
      toast.error("Please fill in all shipping details!");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        items: cartItems.map((item) => ({
          productId: item.id,
          name: item.name,
          price: typeof item.price === "number" ? item.price : parseInt(item.price.replace(/₹|\/-|-/g, "")),
          quantity: item.quantity || 1,
          // Don't send image data - backend can fetch it using productId
        })),
        totalAmount,
        shippingAddress: shippingData,
      };

      const response = await ordersAPI.create(orderData);

      toast.success("Order placed successfully!");
      clearCart(); // Clear cart from state and DB
      
      // Show order confirmation
      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Order placement failed!");
      console.log("Payment error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Naavbar />

      <div className="pt-32 min-h-screen bg-[#0d0d0d] text-white flex justify-center px-4 sm:px-6 pb-10">
        <div className="bg-[#111111bb] backdrop-blur-xl w-full max-w-3xl p-6 sm:p-10 rounded-3xl shadow-[0_0_30px_#00ff9966] flex flex-col gap-6">

          <h1 className="text-3xl sm:text-5xl font-extrabold text-center bg-gradient-to-r from-[#00ff99] to-[#067a55] bg-clip-text text-transparent">
            Complete Your Purchase <i className="fa-solid fa-seedling ml-1"></i>
          </h1>

          {/* ORDER SUMMARY */}
          <div className="bg-[#0d0d0dcc] p-4 sm:p-5 rounded-2xl">
            <h2 className="text-xl font-semibold text-[#00ff99] mb-4">Order Summary</h2>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-gray-300 text-sm">
                  <span>{item.name} x {item.quantity || 1}</span>
                  <span>₹{(typeof item.price === "number" ? item.price : parseInt(item.price.replace(/₹|\/-|-/g, ""))) * (item.quantity || 1)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-green-500/30 mt-3 pt-3 flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-[#00ff99]">₹{totalAmount}/-</span>
            </div>
          </div>

          {/* SHIPPING DETAILS */}
          <div className="bg-[#0d0d0dcc] p-4 sm:p-5 rounded-2xl">
            <h2 className="text-xl font-semibold text-[#00ff99] mb-4">Shipping Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                type="text"
                name="name"
                value={shippingData.name}
                onChange={handleShippingChange}
                placeholder="Full Name"
                className="px-3 py-2 bg-black/50 border border-green-500/50 rounded text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
              />
              <input
                type="email"
                name="email"
                value={shippingData.email}
                onChange={handleShippingChange}
                placeholder="Email"
                className="px-3 py-2 bg-black/50 border border-green-500/50 rounded text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
              />
              <input
                type="tel"
                name="phone"
                value={shippingData.phone}
                onChange={handleShippingChange}
                placeholder="Phone"
                className="px-3 py-2 bg-black/50 border border-green-500/50 rounded text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
              />
              <input
                type="text"
                name="address"
                value={shippingData.address}
                onChange={handleShippingChange}
                placeholder="Address"
                className="px-3 py-2 bg-black/50 border border-green-500/50 rounded text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
              />
              <input
                type="text"
                name="city"
                value={shippingData.city}
                onChange={handleShippingChange}
                placeholder="City"
                className="px-3 py-2 bg-black/50 border border-green-500/50 rounded text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
              />
              <input
                type="text"
                name="state"
                value={shippingData.state}
                onChange={handleShippingChange}
                placeholder="State"
                className="px-3 py-2 bg-black/50 border border-green-500/50 rounded text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
              />
              <input
                type="text"
                name="pincode"
                value={shippingData.pincode}
                onChange={handleShippingChange}
                placeholder="Pincode"
                className="px-3 py-2 bg-black/50 border border-green-500/50 rounded text-white placeholder-gray-400 focus:outline-none focus:border-green-400"
              />
            </div>
          </div>

          {/* UPI APPS */}
          <h2 className="text-2xl font-semibold text-center text-[#00ff99]">Choose UPI App</h2>

          <div className="grid grid-cols-3 gap-3 sm:gap-5">
            {upiApps.map((app, index) => (
              <div
                key={index}
                onClick={() => setSelectedUPI(app.name)}
                className={`flex flex-col items-center cursor-pointer border rounded-2xl p-3 sm:p-5 bg-[#0d0d0d] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_#00ff99] ${
                  selectedUPI === app.name
                    ? "border-[#00ff99] shadow-[0_0_20px_#00ff99]"
                    : "border-gray-700"
                }`}
              >
                <img src={app.logo} alt={app.name} className="w-10 h-10 sm:w-14 sm:h-14 object-contain" />
                <p className="mt-2 sm:mt-3 text-sm sm:text-base font-semibold">{app.name}</p>
              </div>
            ))}
          </div>

          {/* PAYMENT BUTTON */}
          <div className="bg-[#0d0d0dcc] p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-lg sm:text-xl font-semibold">
              Total: <span className="text-[#00ff99] font-bold">₹{totalAmount}/-</span>
            </h2>

            <button
              disabled={!selectedUPI || loading}
              onClick={handlePayment}
              className={`py-3 w-full sm:w-auto px-8 rounded-2xl text-lg font-bold transition-all duration-300 ${
                selectedUPI && !loading
                  ? "bg-[#00ff99] text-black hover:scale-110 hover:shadow-[0_0_20px_#00ff99]"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              {loading ? "Processing..." : <><i className="fa-solid fa-credit-card mr-2"></i>Pay with {selectedUPI || "UPI"}</>}
            </button>
          </div>

          <Link
            to="/cart"
            className="text-center text-gray-300 hover:text-[#00ff99] transition-all duration-300 hover:underline text-sm sm:text-base"
          >
            ← Back to Cart
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Payment;
