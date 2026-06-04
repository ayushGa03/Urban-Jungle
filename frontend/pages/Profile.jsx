import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Naavbar from "../components/Naavbar";
import Footer from "../sections/Home/Footer";
import { AuthContext } from "../src/Context/AuthContext";
import { ordersAPI } from "../src/services/api";
import toast from "react-hot-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, updateProfile, loading } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        pincode: user.pincode || "",
      });
      fetchOrders();
    }
  }, [user, navigate]);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await ordersAPI.getMyOrders();
      setOrders(res.data.orders);
    } catch (error) {
      console.log("Error fetching orders:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData, null);
      setIsEditing(false);
    } catch (error) {
      console.log("Update error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Naavbar />

      <div className="pt-24 pb-10 px-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-green-400 mb-8"><i className="fa-solid fa-user mr-3"></i>My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* PROFILE SECTION */}
          <div className="md:col-span-1">
            <div className="bg-green-900/20 backdrop-blur-md border border-green-500/30 rounded-lg p-6">
              <div className="text-center">
                {user?.profileImage && (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                )}
                <h2 className="text-2xl font-bold text-green-400">{user?.name}</h2>
                <p className="text-gray-300 mt-2">{user?.email}</p>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="w-full mt-6 py-2 bg-green-500 hover:bg-green-600 text-black font-bold rounded transition"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>

              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="w-full mt-3 py-2 bg-red-500/20 border border-red-500 hover:bg-red-500/30 text-white font-bold rounded transition"
              >
                Logout
              </button>
            </div>
          </div>

          {/* EDIT FORM OR INFO DISPLAY */}
          <div className="md:col-span-2">
            <div className="bg-green-900/20 backdrop-blur-md border border-green-500/30 rounded-lg p-6">
              <h3 className="text-xl font-bold text-green-400 mb-6">
                {isEditing ? "Edit Information" : "Personal Information"}
              </h3>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-green-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-black/50 border border-green-500/50 rounded text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-green-300 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-black/50 border border-green-500/50 rounded text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-green-300 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-black/50 border border-green-500/50 rounded text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-green-300 mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-black/50 border border-green-500/50 rounded text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-green-300 mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-black/50 border border-green-500/50 rounded text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-green-300 mb-2">
                        Pincode
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-black/50 border border-green-500/50 rounded text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-6 py-2 bg-green-500 hover:bg-green-600 text-black font-bold rounded transition disabled:opacity-50"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </form>
              ) : (
                <div className="space-y-3">
                  <p>
                    <span className="text-green-300 font-semibold">Phone:</span>{" "}
                    {user?.phone || "Not provided"}
                  </p>
                  <p>
                    <span className="text-green-300 font-semibold">Address:</span>{" "}
                    {user?.address || "Not provided"}
                  </p>
                  <p>
                    <span className="text-green-300 font-semibold">City:</span>{" "}
                    {user?.city || "Not provided"}
                  </p>
                  <p>
                    <span className="text-green-300 font-semibold">State:</span>{" "}
                    {user?.state || "Not provided"}
                  </p>
                  <p>
                    <span className="text-green-300 font-semibold">Pincode:</span>{" "}
                    {user?.pincode || "Not provided"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ORDERS SECTION */}
        <div className="mt-10">
          <h2 className="text-3xl font-bold text-green-400 mb-6"><i className="fa-solid fa-box mr-3"></i>My Orders</h2>

          {loadingOrders ? (
            <div className="text-center py-8">
              <p className="text-gray-300">Loading orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-green-900/20 backdrop-blur-md border border-green-500/30 rounded-lg p-8 text-center">
              <p className="text-gray-300">You haven't placed any orders yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-green-900/20 backdrop-blur-md border border-green-500/30 rounded-lg p-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-green-300 font-semibold">Order ID</p>
                      <p className="text-gray-300 text-sm">{order._id.slice(-8)}</p>
                    </div>
                    <div>
                      <p className="text-green-300 font-semibold">Total Amount</p>
                      <p className="text-gray-300 font-bold">₹{order.totalAmount}</p>
                    </div>
                    <div>
                      <p className="text-green-300 font-semibold">Status</p>
                      <p
                        className={`font-semibold ${
                          order.status === "delivered"
                            ? "text-green-400"
                            : order.status === "cancelled"
                            ? "text-red-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {order.status.toUpperCase()}
                      </p>
                    </div>
                    <div>
                      <p className="text-green-300 font-semibold">Date</p>
                      <p className="text-gray-300 text-sm">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
