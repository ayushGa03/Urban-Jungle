import React from "react";

const Section4 = () => {
  return (
    <div className="w-full py-20 bg-[#0d0d0d] text-white flex flex-col lg:flex-row items-center justify-center gap-16 px-6">

      <div className="left w-full lg:w-1/2 flex justify-center">
        <img
          src="https://images.unsplash.com/photo-1569350080887-dd38c27caad0?q=80&w=735&auto=format&fit=crop"
          alt="Plants"
          className="rounded-2xl shadow-lg shadow-[#00ff99]/20 w-full max-w-md object-cover transition-all duration-500 hover:scale-105 hover:shadow-[#00ff99]/40"
        />
      </div>

    
      <div className="right w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl sm:text-5xl font-bold bg-linear-to-r from-[#00ff99] to-[#067a55] bg-clip-text text-transparent">
          Your Premier Destination for All Things Green
        </h1>

        <p className="text-gray-300 leading-relaxed text-lg">
          At <span className="text-[#00ff99] font-semibold">Urban Jungle Co.</span>,
          we believe in the transformative power of plants. Whether you're a seasoned
          gardener or beginning your green journey, our curated selection of plants
          will inspire and enhance your living space.
        </p>

        <div className="sold grid grid-cols-2 gap-6 mt-6">
          <div className="box p-6 bg-[#111] rounded-xl flex flex-col items-center gap-2 text-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#00ff99]/40 cursor-pointer">
            <h1 className="text-3xl font-bold bg-linear-to-r from-[#00ff99] to-[#067a55] bg-clip-text text-transparent">
              98%
            </h1>
            <p className="text-gray-300">Customer Satisfaction</p>
          </div>

          <div className="box p-6 bg-[#111] rounded-xl flex flex-col items-center gap-2 text-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#00ff99]/40 cursor-pointer">
            <h1 className="text-3xl font-bold bg-linear-to-r from-[#00ff99] to-[#067a55] bg-clip-text text-transparent">
              103K
            </h1>
            <p className="text-gray-300">Plants Sold</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Section4;
