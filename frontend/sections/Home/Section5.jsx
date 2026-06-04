import React from "react";
import "remixicon/fonts/remixicon.css";

const Section5 = () => {
  return (
    <div className="w-full py-20 bg-[#0d0d0d] text-white flex flex-col items-center gap-10 px-6">

      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl font-bold bg-linear-to-r from-[#00ff99] to-[#067a55] bg-clip-text text-transparent">
        What Our Customers Say
      </h1>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl w-full">

        {/* Card 1 */}
        <div className="p-6 bg-[#111] rounded-xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-[#00ff99]/40 cursor-pointer">
          <div className="flex gap-3 items-center">
            <img
              src="https://randomuser.me/api/portraits/women/54.jpg"
              alt="customer"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-lg">Priya Sharma</h2>
              <p className="text-[#00ff99] text-sm">Verified Customer</p>
            </div>
          </div>
          <p className="text-gray-300 mt-4">
            "Amazing experience! The plants arrived healthy and fresh.
            Customer support was super helpful. Highly recommended!"
          </p>
          <div className="flex text-[#00ff99] gap-1 mt-3">
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
            <i className="ri-star-half-fill"></i>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-6 bg-[#111] rounded-xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-[#00ff99]/40 cursor-pointer">
          <div className="flex gap-3 items-center">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="customer"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-lg">Rahul Verma</h2>
              <p className="text-[#00ff99] text-sm">Plant Lover</p>
            </div>
          </div>
          <p className="text-gray-300 mt-4">
            "Delivery was on time and the packaging was super safe.
            I’ve already ordered 3 more plants!"
          </p>
          <div className="flex text-[#00ff99] gap-1 mt-3">
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-6 bg-[#111] rounded-xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-[#00ff99]/40 cursor-pointer">
          <div className="flex gap-3 items-center">
            <img
              src="https://randomuser.me/api/portraits/women/65.jpg"
              alt="customer"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-lg">Sneha Kapoor</h2>
              <p className="text-[#00ff99] text-sm">Happy Buyer</p>
            </div>
          </div>
          <p className="text-gray-300 mt-4">
            "Best quality plants and beautiful packaging.
            Made my living room look stunning!"
          </p>
          <div className="flex text-[#00ff99] gap-1 mt-3">
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
            <i className="ri-star-fill"></i>
            <i className="ri-star-line"></i>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Section5;
