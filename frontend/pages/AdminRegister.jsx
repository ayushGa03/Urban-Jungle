import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../src/Context/AuthContext";
import toast from "react-hot-toast";

const AdminRegister = () => {
  const navigate = useNavigate();
  const { adminRegister, loading } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    adminSecretKey: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.adminSecretKey
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      await adminRegister(
        formData.name,
        formData.email,
        formData.password,
        formData.adminSecretKey
      );
      navigate("/admin/dashboard");
    } catch (error) {
      console.log("Admin register error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md">
        {/* ADMIN BADGE */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#00ff99]/10 border-2 border-[#00ff99]/30 mb-4">
            <i className="fa-solid fa-shield-halved text-[#00ff99] text-3xl"></i>
          </div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#00ff99] to-[#067a55] bg-clip-text text-transparent">
            Admin Registration
          </h1>
          <p className="text-gray-400 mt-2">
            Create an admin account to manage the store
          </p>
        </div>

        <div className="bg-[#111111bb] backdrop-blur-xl border border-[#00ff99]/20 rounded-2xl p-8 shadow-[0_0_30px_#00ff9920]">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* NAME */}
            <div>
              <label className="block text-sm font-semibold text-[#00ff99] mb-2">
                <i className="fa-solid fa-user mr-2 text-xs"></i>Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#00ff99]/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00ff99] transition-all duration-300"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm font-semibold text-[#00ff99] mb-2">
                <i className="fa-solid fa-envelope mr-2 text-xs"></i>Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#00ff99]/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00ff99] transition-all duration-300"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-semibold text-[#00ff99] mb-2">
                <i className="fa-solid fa-lock mr-2 text-xs"></i>Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min 6 characters"
                className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#00ff99]/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00ff99] transition-all duration-300"
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block text-sm font-semibold text-[#00ff99] mb-2">
                <i className="fa-solid fa-check-double mr-2 text-xs"></i>Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#00ff99]/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00ff99] transition-all duration-300"
              />
            </div>

            {/* ADMIN SECRET KEY */}
            <div>
              <label className="block text-sm font-semibold text-[#00ff99] mb-2">
                <i className="fa-solid fa-key mr-2 text-xs"></i>Admin Secret Key
              </label>
              <input
                type="password"
                name="adminSecretKey"
                value={formData.adminSecretKey}
                onChange={handleChange}
                placeholder="Enter admin secret key"
                className="w-full px-4 py-3 bg-[#0d0d0d] border border-yellow-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 transition-all duration-300"
              />
              <p className="text-yellow-400/70 text-xs mt-1">
                <i className="fa-solid fa-circle-info mr-1"></i>Contact the store owner for the admin secret key
              </p>
            </div>

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3 bg-[#00ff99] hover:bg-[#05e98c] text-black font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_#00ff9960] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><i className="fa-solid fa-spinner fa-spin"></i> Creating Account...</>
              ) : (
                <><i className="fa-solid fa-user-shield"></i> Create Admin Account</>
              )}
            </button>
          </form>

          {/* LOGIN LINK */}
          <p className="text-center text-gray-400 mt-6 text-sm">
            Already have an admin account?{" "}
            <button
              onClick={() => navigate("/admin/login")}
              className="text-[#00ff99] font-semibold hover:text-[#05e98c] transition-colors"
            >
              Login here
            </button>
          </p>

          {/* BACK TO SHOP */}
          <p className="text-center mt-4">
            <button
              onClick={() => navigate("/")}
              className="text-gray-500 text-sm hover:text-gray-300 transition-colors flex items-center justify-center gap-1.5 mx-auto"
            >
              <i className="fa-solid fa-arrow-left text-xs"></i> Back to Store
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
