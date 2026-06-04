import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../src/Context/AuthContext";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { adminLogin, loading } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      await adminLogin(formData.email, formData.password);
      navigate("/admin/dashboard");
    } catch (error) {
      console.log("Admin login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* ADMIN BADGE */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#00ff99]/10 border-2 border-[#00ff99]/30 mb-4">
            <i className="fa-solid fa-shield-halved text-[#00ff99] text-3xl"></i>
          </div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#00ff99] to-[#067a55] bg-clip-text text-transparent">
            Admin Panel
          </h1>
          <p className="text-gray-400 mt-2">Sign in to manage your store</p>
        </div>

        <div className="bg-[#111111bb] backdrop-blur-xl border border-[#00ff99]/20 rounded-2xl p-8 shadow-[0_0_30px_#00ff9920]">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <div>
              <label className="block text-sm font-semibold text-[#00ff99] mb-2">
                <i className="fa-solid fa-envelope mr-2 text-xs"></i>Admin Email
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
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#00ff99]/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#00ff99] transition-all duration-300"
              />
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3 bg-[#00ff99] hover:bg-[#05e98c] text-black font-bold rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_#00ff9960] disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <><i className="fa-solid fa-spinner fa-spin"></i> Signing in...</>
              ) : (
                <><i className="fa-solid fa-right-to-bracket"></i> Sign In as Admin</>
              )}
            </button>
          </form>

          {/* REGISTER LINK */}
          <p className="text-center text-gray-400 mt-6 text-sm">
            Don't have an admin account?{" "}
            <button
              onClick={() => navigate("/admin/register")}
              className="text-[#00ff99] font-semibold hover:text-[#05e98c] transition-colors"
            >
              Register here
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

export default AdminLogin;
