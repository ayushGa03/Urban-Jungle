import React, { useState, useEffect, useContext } from "react";
import "remixicon/fonts/remixicon.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../src/Context/AuthContext";
import { productsAPI, ordersAPI } from "../src/services/api";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("overview");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "",
    type: "",
    description: "",
    price: "",
    rating: "",
    reviews: "",
    stock: "",
    category: "Plants",
  });
  const [productImage, setProductImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // PROTECT ROUTE
  useEffect(() => {
    if (!user) {
      navigate("/admin/login");
    } else if (!isAdmin) {
      toast.error("Access denied. Admin only.");
      navigate("/");
    }
  }, [user, isAdmin, navigate]);

  // FETCH DATA
  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
      fetchOrders();
    }
  }, [isAdmin]);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const res = await productsAPI.getAll();
      setProducts(res.data.products);
    } catch (error) {
      console.log("Error fetching products:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await ordersAPI.getAllOrders();
      setOrders(res.data.orders);
    } catch (error) {
      console.log("Error fetching orders:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleProductFormChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setProductForm({
      name: "",
      type: "",
      description: "",
      price: "",
      rating: "",
      reviews: "",
      stock: "",
      category: "Plants",
    });
    setProductImage(null);
    setShowAddForm(false);
    setEditingProduct(null);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.type || !productForm.price) {
      toast.error("Please fill all required fields");
      return;
    }
    if (!productImage && !editingProduct) {
      toast.error("Please select an image");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", productForm.name);
      formData.append("type", productForm.type);
      formData.append("description", productForm.description);
      formData.append("price", productForm.price);
      formData.append("rating", productForm.rating || "0");
      formData.append("reviews", productForm.reviews || "0");
      formData.append("stock", productForm.stock || "100");
      formData.append("category", productForm.category);
      if (productImage) formData.append("image", productImage);

      if (editingProduct) {
        await productsAPI.update(editingProduct._id, formData);
        toast.success("Product updated!");
      } else {
        await productsAPI.create(formData);
        toast.success("Product added!");
      }

      resetForm();
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      type: product.type,
      description: product.description || "",
      price: product.price.toString(),
      rating: product.rating?.toString() || "",
      reviews: product.reviews?.toString() || "",
      stock: product.stock?.toString() || "",
      category: product.category || "Plants",
    });
    setShowAddForm(true);
    setActiveTab("products");
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await productsAPI.delete(id);
      toast.success("Product deleted!");
      fetchProducts();
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const handleUpdateOrderStatus = async (orderId, status) => {
    try {
      await ordersAPI.update(orderId, { status });
      toast.success("Order status updated!");
      fetchOrders();
    } catch (error) {
      toast.error("Failed to update order status");
    }
  };

  if (!user || !isAdmin) return null;

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length;

  const sidebarItems = [
    { id: "overview", label: "Overview", icon: "fa-solid fa-chart-pie" },
    { id: "products", label: "Products", icon: "fa-solid fa-leaf" },
    { id: "orders", label: "Orders", icon: "fa-solid fa-boxes-stacked" },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#111] border-r border-[#00ff99]/10 flex flex-col min-h-screen fixed left-0 top-0">
        <div className="p-6 border-b border-[#00ff99]/10">
          <h2 className="text-xl font-bold bg-gradient-to-r from-[#00ff99] to-[#067a55] bg-clip-text text-transparent">
            <i className="fa-solid fa-shield-halved mr-2"></i>Admin Panel
          </h2>
          <p className="text-gray-500 text-sm mt-1">{user?.name}</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                activeTab === item.id
                  ? "bg-[#00ff99]/10 text-[#00ff99] border border-[#00ff99]/30 shadow-[0_0_10px_#00ff9920]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <i className={`${item.icon} mr-2 text-sm`}></i>{item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[#00ff99]/10 space-y-2">
          <button
            onClick={() => navigate("/")}
            className="w-full px-4 py-2 text-sm text-gray-400 hover:text-white bg-white/5 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-arrow-left text-xs"></i> Back to Store
          </button>
          <button
            onClick={() => {
              logout();
              navigate("/admin/login");
            }}
            className="w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl transition-all"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 p-8">
        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="animate-fadeIn">
            <h1 className="text-3xl font-bold text-[#00ff99] mb-8">
              Dashboard Overview
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[
                {
                  label: "Total Products",
                  value: products.length,
                  icon: "fa-solid fa-leaf",
                  color: "from-green-500/20 to-green-900/20",
                  border: "border-green-500/30",
                },
                {
                  label: "Total Orders",
                  value: orders.length,
                  icon: "fa-solid fa-box",
                  color: "from-blue-500/20 to-blue-900/20",
                  border: "border-blue-500/30",
                },
                {
                  label: "Pending Orders",
                  value: pendingOrders,
                  icon: "fa-solid fa-clock",
                  color: "from-yellow-500/20 to-yellow-900/20",
                  border: "border-yellow-500/30",
                },
                {
                  label: "Revenue",
                  value: `₹${totalRevenue.toLocaleString()}`,
                  icon: "fa-solid fa-indian-rupee-sign",
                  color: "from-purple-500/20 to-purple-900/20",
                  border: "border-purple-500/30",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className={`bg-gradient-to-br ${stat.color} backdrop-blur-md border ${stat.border} rounded-2xl p-6 hover:scale-105 transition-all duration-300`}
                >
                  <div className="text-3xl mb-3"><i className={stat.icon}></i></div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            {/* RECENT ORDERS */}
            <div className="bg-[#111] border border-[#00ff99]/10 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-[#00ff99] mb-4">
                Recent Orders
              </h3>
              {orders.slice(0, 5).length === 0 ? (
                <p className="text-gray-500">No orders yet.</p>
              ) : (
                <div className="space-y-3">
                  {orders.slice(0, 5).map((order) => (
                    <div
                      key={order._id}
                      className="flex items-center justify-between bg-[#0d0d0d] p-4 rounded-xl"
                    >
                      <div>
                        <p className="text-sm font-medium">
                          #{order._id.slice(-8)}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {order.userId?.name || "Unknown"} •{" "}
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[#00ff99] font-bold">
                          ₹{order.totalAmount}
                        </p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            order.status === "delivered"
                              ? "bg-green-500/20 text-green-400"
                              : order.status === "cancelled"
                              ? "bg-red-500/20 text-red-400"
                              : order.status === "shipped"
                              ? "bg-blue-500/20 text-blue-400"
                              : "bg-yellow-500/20 text-yellow-400"
                          }`}
                        >
                          {order.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === "products" && (
          <div className="animate-fadeIn">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-[#00ff99]">
                Manage Products
              </h1>
              <button
                onClick={() => {
                  if (showAddForm) {
                    resetForm();
                  } else {
                    setShowAddForm(true);
                  }
                }}
                className="px-6 py-3 bg-[#00ff99] text-black font-bold rounded-xl hover:bg-[#05e98c] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_#00ff9960]"
              >
                {showAddForm ? "✕ Cancel" : "+ Add Product"}
              </button>
            </div>

            {/* ADD/EDIT PRODUCT FORM */}
            {showAddForm && (
              <div className="bg-[#111] border border-[#00ff99]/20 rounded-2xl p-6 mb-8 shadow-[0_0_20px_#00ff9910]">
                <h3 className="text-xl font-semibold text-[#00ff99] mb-4">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h3>
                <form onSubmit={handleAddProduct}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={productForm.name}
                        onChange={handleProductFormChange}
                        placeholder="e.g. Jade Plant"
                        className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#00ff99]/20 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#00ff99] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        Type *
                      </label>
                      <input
                        type="text"
                        name="type"
                        value={productForm.type}
                        onChange={handleProductFormChange}
                        placeholder="e.g. Indoor Bonsai"
                        className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#00ff99]/20 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#00ff99] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        Price (₹) *
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={productForm.price}
                        onChange={handleProductFormChange}
                        placeholder="e.g. 399"
                        className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#00ff99]/20 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#00ff99] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        Stock
                      </label>
                      <input
                        type="number"
                        name="stock"
                        value={productForm.stock}
                        onChange={handleProductFormChange}
                        placeholder="e.g. 100"
                        className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#00ff99]/20 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#00ff99] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        Rating (0-5)
                      </label>
                      <input
                        type="number"
                        name="rating"
                        value={productForm.rating}
                        onChange={handleProductFormChange}
                        placeholder="e.g. 4.5"
                        step="0.1"
                        min="0"
                        max="5"
                        className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#00ff99]/20 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#00ff99] transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1">
                        Category
                      </label>
                      <input
                        type="text"
                        name="category"
                        value={productForm.category}
                        onChange={handleProductFormChange}
                        placeholder="e.g. Plants"
                        className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#00ff99]/20 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#00ff99] transition"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-gray-400 mb-1">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={productForm.description}
                        onChange={handleProductFormChange}
                        placeholder="Product description..."
                        rows="3"
                        className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#00ff99]/20 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-[#00ff99] transition resize-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm text-gray-400 mb-1">
                        Product Image{" "}
                        {editingProduct ? "(leave empty to keep current)" : "*"}
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setProductImage(e.target.files[0])}
                        className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-[#00ff99]/10 file:text-[#00ff99] file:font-medium hover:file:bg-[#00ff99]/20 file:cursor-pointer file:transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-6">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-8 py-3 bg-[#00ff99] text-black font-bold rounded-xl hover:bg-[#05e98c] transition-all duration-300 disabled:opacity-50"
                    >
                      {submitting
                        ? "Saving..."
                        : editingProduct
                        ? "Update Product"
                        : "Add Product"}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-8 py-3 bg-white/5 text-gray-400 rounded-xl hover:bg-white/10 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* PRODUCTS LIST */}
            {loadingProducts ? (
              <div className="text-center py-10">
                <p className="text-gray-400">Loading products...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-[#111] border border-[#00ff99]/10 rounded-2xl p-10 text-center">
                <p className="text-gray-500 text-lg">
                  No products yet. Click "Add Product" to get started!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-[#111] border border-[#00ff99]/10 rounded-2xl p-4 flex items-center gap-5 hover:border-[#00ff99]/30 transition-all duration-300"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white truncate">
                        {product.name}
                      </h3>
                      <p className="text-gray-500 text-sm">{product.type}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-[#00ff99] font-bold">
                          ₹{product.price}
                        </span>
                        <span className="text-gray-500 text-sm">
                          Stock: {product.stock}
                        </span>
                        <span className="text-yellow-400 text-sm">
                          ⭐ {product.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-xl hover:bg-blue-500/20 transition-all text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product._id)}
                        className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500/20 transition-all text-sm font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === "orders" && (
          <div className="animate-fadeIn">
            <h1 className="text-3xl font-bold text-[#00ff99] mb-8">
              Manage Orders
            </h1>

            {loadingOrders ? (
              <div className="text-center py-10">
                <p className="text-gray-400">Loading orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-[#111] border border-[#00ff99]/10 rounded-2xl p-10 text-center">
                <p className="text-gray-500 text-lg">No orders yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-[#111] border border-[#00ff99]/10 rounded-2xl p-6 hover:border-[#00ff99]/20 transition-all duration-300"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Order ID</p>
                        <p className="text-white font-mono text-sm">
                          #{order._id.slice(-8)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Customer</p>
                        <p className="text-white text-sm">
                          {order.userId?.name || "Unknown"}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {order.userId?.email || ""}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Amount</p>
                        <p className="text-[#00ff99] font-bold">
                          ₹{order.totalAmount}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="text-white text-sm">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Status</p>
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleUpdateOrderStatus(order._id, e.target.value)
                          }
                          className={`px-3 py-1.5 rounded-xl text-sm font-medium bg-[#0d0d0d] border cursor-pointer focus:outline-none transition-all ${
                            order.status === "delivered"
                              ? "border-green-500/30 text-green-400"
                              : order.status === "cancelled"
                              ? "border-red-500/30 text-red-400"
                              : order.status === "shipped"
                              ? "border-blue-500/30 text-blue-400"
                              : order.status === "confirmed"
                              ? "border-purple-500/30 text-purple-400"
                              : "border-yellow-500/30 text-yellow-400"
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    {/* ORDER ITEMS */}
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <p className="text-gray-500 text-sm mb-2">Items:</p>
                      <div className="flex flex-wrap gap-3">
                        {order.items?.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 bg-[#0d0d0d] px-3 py-2 rounded-xl"
                          >
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-8 h-8 rounded-lg object-cover"
                              />
                            )}
                            <span className="text-sm text-gray-300">
                              {item.name} × {item.quantity}
                            </span>
                            <span className="text-[#00ff99] text-sm font-medium">
                              ₹{item.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* SHIPPING INFO */}
                    {order.shippingAddress && (
                      <div className="mt-3 pt-3 border-t border-white/5">
                        <p className="text-gray-500 text-sm">
                          <i className="fa-solid fa-location-dot mr-1"></i> {order.shippingAddress.address},{" "}
                          {order.shippingAddress.city},{" "}
                          {order.shippingAddress.state} -{" "}
                          {order.shippingAddress.pincode}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
