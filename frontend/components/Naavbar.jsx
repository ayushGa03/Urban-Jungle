import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../src/Context/AuthContext";

const Naavbar = () => {
  const { cart } = useContext(CartContext);
  const { user, logout, isAdmin } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/shop", label: "Shop" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="bg-black/40 backdrop-blur-md text-white flex items-center justify-between py-4 px-6 md:px-10 shadow-lg">

        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img
            className="w-40 md:w-44"
            src="https://websitedemos.net/generic-ecommerce-02/wp-content/uploads/sites/1526/2025/03/header-logo.svg"
            alt="Urban Jungle"
          />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 text-[17px] font-medium">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`transition-all duration-300 ${
                location.pathname === item.path ? "text-green-400 font-semibold" : "hover:text-green-400"
              }`}
            >
              {item.label}
            </Link>
          ))}

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 ml-2 text-xl items-center">
           <a href="https://www.youtube.com/"> <i className="fa-brands fa-youtube hover:text-red-500 transition-all cursor-pointer"></i></a>
           <a href="https://www.instagram.com/"><i className="fa-brands fa-instagram hover:text-pink-500 transition-all cursor-pointer"></i></a>
           <a href="https://www.facebook.com/"><i className="fa-brands fa-facebook hover:text-blue-500 transition-all cursor-pointer"></i></a>
           <a href="https://x.com/"> <i className="fa-brands fa-twitter hover:text-sky-400 transition-all cursor-pointer"></i></a>
          </div>

          {/* CART ICON */}
          <Link to="/cart" className="relative ml-4">
            <i className="ri-shopping-cart-2-line text-2xl hover:text-green-400 transition-all"></i>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-green-500 text-black font-bold w-5 h-5 flex items-center justify-center text-xs rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          {/* AUTH SECTION */}
          {user ? (
            <div className="flex items-center gap-4 ml-4">
              {isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-1.5 px-3 py-1 bg-yellow-500/10 border border-yellow-500/40 rounded hover:bg-yellow-500/20 transition text-sm font-medium text-yellow-400"
                >
                  <i className="fa-solid fa-shield-halved mr-1.5"></i> Dashboard
                </Link>
              )}
              <Link
                to="/profile"
                className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500 rounded hover:bg-green-500/30 transition"
              >
                <i className="fa-solid fa-user text-sm"></i>
                <span className="text-sm font-medium">{user.name}</span>
              </Link>
              <button
                onClick={logout}
                className="px-3 py-1 bg-red-500/20 border border-red-500 rounded hover:bg-red-500/30 transition text-sm font-medium"
              >
                <i className="fa-solid fa-right-from-bracket mr-1.5 text-xs"></i>Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 ml-4">
              <Link
                to="/login"
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition-all duration-300 hover:shadow-[0_0_12px_#22c55e50] flex items-center gap-2"
              >
                <i className="fa-solid fa-right-to-bracket"></i>Login
              </Link>
              <Link
                to="/admin/login"
                className="px-4 py-2 bg-[#0d0d0d] border border-yellow-500/50 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-500/10 transition-all duration-300 hover:shadow-[0_0_12px_#eab30830] flex items-center gap-2"
              >
                <i className="fa-solid fa-shield-halved"></i>Admin
              </Link>
            </div>
          )}
        </div>

        {/* MOBILE CART + MENU */}
        <div className="flex items-center gap-4 md:hidden">
          <Link to="/cart" className="relative">
            <i className="ri-shopping-cart-2-line text-3xl hover:text-green-400 transition-all cursor-pointer"></i>
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-green-500 text-black font-bold w-5 h-5 flex items-center justify-center text-xs rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          <button className="text-3xl" onClick={() => setMenuOpen(!menuOpen)}>
            <i className={menuOpen ? "ri-close-line" : "ri-menu-line"}></i>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU DROPDOWN */}
      <div
        className={`md:hidden bg-black/90 backdrop-blur-md text-white flex flex-col items-center gap-6 py-6 text-lg font-medium transition-all duration-500 ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setMenuOpen(false)}
            className={`${location.pathname === item.path ? "text-green-400 font-bold" : ""}`}
          >
            {item.label}
          </Link>
        ))}

        {/* SOCIAL ICONS */}
        <div className="flex gap-4 text-xl pt-2">
          <a href="https://www.youtube.com/"><i className="fa-brands fa-youtube"></i></a>
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-twitter"></i>
        </div>

        {/* MOBILE AUTH SECTION */}
        <div className="pt-4 border-t border-green-500/30 w-full flex flex-col items-center gap-3">
          {user ? (
            <>
              {isAdmin && (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMenuOpen(false)}
                  className="w-3/4 text-center px-3 py-2 bg-yellow-500/10 border border-yellow-500/40 rounded hover:bg-yellow-500/20 transition text-sm font-medium text-yellow-400"
                >
                  <i className="fa-solid fa-shield-halved mr-1.5"></i> Admin Dashboard
                </Link>
              )}
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="w-3/4 text-center px-3 py-2 bg-green-500/20 border border-green-500 rounded hover:bg-green-500/30 transition text-sm font-medium"
              >
                <i className="fa-solid fa-user mr-1.5"></i> {user.name}
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="w-3/4 px-3 py-2 bg-red-500/20 border border-red-500 rounded hover:bg-red-500/30 transition text-sm font-medium"
              >
                <i className="fa-solid fa-right-from-bracket mr-1.5"></i>Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="w-3/4 text-center px-3 py-2 bg-green-500 hover:bg-green-600 text-black font-semibold rounded transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="w-3/4 text-center px-3 py-2 bg-green-500/20 border border-green-500 rounded hover:bg-green-500/30 transition text-sm font-medium"
              >
                Register
              </Link>
              <Link
                to="/admin/login"
                onClick={() => setMenuOpen(false)}
                className="w-3/4 text-center px-3 py-2 bg-yellow-500/10 border border-yellow-500/40 rounded hover:bg-yellow-500/20 transition text-sm font-medium text-yellow-400"
              >
                <i className="fa-solid fa-shield-halved mr-1.5"></i> Login as Admin
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Naavbar;
