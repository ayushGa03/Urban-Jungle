import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Naavbar from "../components/Naavbar";
import Footer from "../sections/Home/Footer";
import { AuthContext } from "../src/Context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useContext(AuthContext);
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
      await login(formData.email, formData.password);
      navigate("/");
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Naavbar />

      <div className="pt-24 pb-10 px-6">
        <div className="max-w-md mx-auto bg-green-900/20 backdrop-blur-md border border-green-500/30 rounded-lg p-8 mt-10">
          <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">
            <i className="fa-solid fa-leaf mr-2"></i>Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* EMAIL */}
            <div>
              <label className="block text-sm font-semibold text-green-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-black/50 border border-green-500/50 rounded text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-semibold text-green-300 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 bg-black/50 border border-green-500/50 rounded text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition"
              />
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-2.5 bg-green-500 hover:bg-green-600 text-black font-bold rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_#22c55e60] flex items-center justify-center gap-2"
            >
              {loading ? (
                <><i className="fa-solid fa-spinner fa-spin"></i> Logging in...</>
              ) : (
                <><i className="fa-solid fa-right-to-bracket"></i> Login</>
              )}
            </button>
          </form>

          {/* REGISTER LINK */}
          <p className="text-center text-gray-300 mt-6">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-green-400 font-semibold hover:text-green-300"
            >
              Register here
            </button>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
