import React from "react";
import "remixicon/fonts/remixicon.css";

const Section_two = () => {
  return (
    <div className="w-full py-14 bg-[#0d0d0d] flex items-center justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-white">

        <div className="flex flex-col items-center gap-2 transition-all duration-300 hover:scale-105 hover:text-[#00ff99] cursor-pointer">
          <i className="ri-folder-shield-2-line text-4xl transition-all duration-300"></i>
          <h1 className="text-xl font-semibold">Secure Payments</h1>
          <p className="text-sm text-gray-300">Safe, simple, and secure</p>
        </div>

        <div className="flex flex-col items-center gap-2 transition-all duration-300 hover:scale-105 hover:text-[#00ff99] cursor-pointer">
          <i className="ri-truck-line text-4xl transition-all duration-300"></i>
          <h1 className="text-xl font-semibold">Fast Delivery</h1>
          <p className="text-sm text-gray-300">Quick doorstep delivery</p>
        </div>

        <div className="flex flex-col items-center gap-2 transition-all duration-300 hover:scale-105 hover:text-[#00ff99] cursor-pointer">
          <i className="ri-gift-line text-4xl transition-all duration-300"></i>
          <h1 className="text-xl font-semibold">Great Offers</h1>
          <p className="text-sm text-gray-300">Exciting deals every day</p>
        </div>

        <div className="flex flex-col items-center gap-2 transition-all duration-300 hover:scale-105 hover:text-[#00ff99] cursor-pointer">
          <i className="ri-heart-line text-4xl transition-all duration-300"></i>
          <h1 className="text-xl font-semibold">Customer Support</h1>
          <p className="text-sm text-gray-300">Available 24/7 support</p>
        </div>

      </div>
    </div>
  );
};

export default Section_two;
