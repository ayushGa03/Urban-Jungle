import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { authAPI } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // LOAD USER ON MOUNT - ONLY ONCE
  useEffect(() => {
    if (token && !isInitialized) {
      fetchUser();
    } else if (!token) {
      setIsInitialized(true);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const res = await authAPI.getMe();
      setUser(res.data.user);
    } catch (error) {
      console.log("Error fetching user:", error);
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
    } finally {
      setIsInitialized(true);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);

      const res = await authAPI.register(formData);
      
      // Store token in localStorage first
      localStorage.setItem("token", res.data.token);
      
      // Then set state
      setToken(res.data.token);
      setUser(res.data.user);
      
      toast.success("Registered successfully!");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await authAPI.login(email, password);
      
      // Store token in localStorage first
      localStorage.setItem("token", res.data.token);
      
      // Then set state
      setToken(res.data.token);
      setUser(res.data.user);
      
      toast.success("Logged in successfully!");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const adminRegister = async (name, email, password, adminSecretKey) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("adminSecretKey", adminSecretKey);

      const res = await authAPI.adminRegister(formData);
      
      // Store token in localStorage first
      localStorage.setItem("token", res.data.token);
      
      // Then set state
      setToken(res.data.token);
      setUser(res.data.user);
      
      toast.success("Admin registered successfully!");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Admin registration failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const adminLogin = async (email, password) => {
    setLoading(true);
    try {
      const res = await authAPI.adminLogin(email, password);
      
      // Store token in localStorage first
      localStorage.setItem("token", res.data.token);
      
      // Then set state
      setToken(res.data.token);
      setUser(res.data.user);
      
      toast.success("Admin logged in successfully!");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Admin login failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    toast.success("Logged out!");
  };

  const updateProfile = async (updateData, profileImage) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(updateData).forEach((key) => {
        if (updateData[key]) formData.append(key, updateData[key]);
      });
      if (profileImage) formData.append("profileImage", profileImage);

      const res = await authAPI.updateProfile(formData);
      setUser(res.data.user);
      toast.success("Profile updated!");
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAdmin,
        register,
        login,
        adminRegister,
        adminLogin,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
