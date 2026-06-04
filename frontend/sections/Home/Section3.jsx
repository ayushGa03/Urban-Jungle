import React from "react";

const Section3 = () => {
  return (
    <div className="w-full py-16 bg-[#0d0d0d] flex flex-col items-center gap-10 text-white">
      
      <h1 className="text-4xl sm:text-5xl font-bold text-[#00ff99] tracking-wide">
        Trending Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl w-full px-4 mt-10">
        
   
        <div className="bg-[#111] rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#00ff99]/40 cursor-pointer">
          <img
            src="https://plus.unsplash.com/premium_photo-1708769592969-9f42825496a7?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Plant"
            className="w-full h-52 object-cover"
          />
          <div className="p-4 flex flex-col gap-2">
            <i className="ri-star-fill text-[#00ff99] text-xl"></i>
            <h1 className="text-xl font-semibold">Peace Lily</h1>
            <p className="text-sm text-gray-300">Indoor plant</p>
            <p className="text-lg font-bold text-[#00ff99]">₹499/-</p>
          </div>
        </div>

        <div className="bg-[#111] rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#00ff99]/40 cursor-pointer">
          <img
            src="https://m.media-amazon.com/images/I/71vDeWZkH8L._AC_UF350,350_QL80_.jpg"
            alt="Plant"
            className="w-full h-52 object-cover"
          />
          <div className="p-4 flex flex-col gap-2">
            <i className="ri-star-fill text-[#00ff99] text-xl"></i>
            <h1 className="text-xl font-semibold">Aloe Vera</h1>
            <p className="text-sm text-gray-300">Medicinal plant</p>
            <p className="text-lg font-bold text-[#00ff99]">₹299/-</p>
          </div>
        </div>

        <div className="bg-[#111] rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#00ff99]/40 cursor-pointer">
          <img
            src="https://plantsguru.com/cdn/shop/files/Sansevieria_Trifasciata_Small_-_Snake_Plant.jpg?v=1746105034&width=1920"
            alt="Plant"
            className="w-full h-52 object-cover"
          />
          <div className="p-4 flex flex-col gap-2">
            <i className="ri-star-fill text-[#00ff99] text-xl"></i>
            <h1 className="text-xl font-semibold">Snake Plant</h1>
            <p className="text-sm text-gray-300">Air purifier</p>
            <p className="text-lg font-bold text-[#00ff99]">₹699/-</p>
          </div>
        </div>

        <div className="bg-[#111] rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#00ff99]/40 cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1543168256-418811576931?w=400"
            alt="Plant"
            className="w-full h-52 object-cover"
          />
          <div className="p-4 flex flex-col gap-2">
            <i className="ri-star-fill text-[#00ff99] text-xl"></i>
            <h1 className="text-xl font-semibold">Monstera</h1>
            <p className="text-sm text-gray-300">Decorative plant</p>
            <p className="text-lg font-bold text-[#00ff99]">₹899/-</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Section3;
