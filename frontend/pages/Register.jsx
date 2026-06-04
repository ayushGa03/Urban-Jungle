import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Naavbar from "../components/Naavbar";
import Footer from "../sections/Home/Footer";
import { AuthContext } from "../src/Context/AuthContext";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const { register, loading } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [profileImage, setProfileImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
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
      await register(formData.name, formData.email, formData.password);
      navigate("/");
    } catch (error) {
      console.log("Register error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Naavbar />

      <div className="pt-24 pb-10 px-6">
        <div className="max-w-md mx-auto bg-green-900/20 backdrop-blur-md border border-green-500/30 rounded-lg p-8 mt-10">
          <h2 className="text-3xl font-bold text-green-400 mb-6 text-center">
            <i className="fa-solid fa-leaf mr-2"></i>Register
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* NAME */}
            <div>
              <label className="block text-sm font-semibold text-green-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-2 bg-black/50 border border-green-500/50 rounded text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition"
              />
            </div>

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
                placeholder="Enter password (min 6 characters)"
                className="w-full px-4 py-2 bg-black/50 border border-green-500/50 rounded text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition"
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block text-sm font-semibold text-green-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className="w-full px-4 py-2 bg-black/50 border border-green-500/50 rounded text-white placeholder-gray-400 focus:outline-none focus:border-green-400 transition"
              />
            </div>

            {/* PROFILE IMAGE */}
            <div>
              <label className="block text-sm font-semibold text-green-300 mb-2">
                Profile Picture (Optional)
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="w-full text-sm text-gray-400"
              />
            </div>

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-2.5 bg-green-500 hover:bg-green-600 text-black font-bold rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_#22c55e60] flex items-center justify-center gap-2"
            >
              {loading ? (
                <><i className="fa-solid fa-spinner fa-spin"></i> Registering...</>
              ) : (
                <><i className="fa-solid fa-user-plus"></i> Register</>
              )}
            </button>
          </form>

          {/* LOGIN LINK */}
          <p className="text-center text-gray-300 mt-6">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-green-400 font-semibold hover:text-green-300"
            >
              Login here
            </button>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
