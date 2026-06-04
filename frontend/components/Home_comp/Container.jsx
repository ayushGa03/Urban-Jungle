import React from "react";
import Shopbtn from "./Shopbtn";

const Container = () => {
  return (
    <div className=" w-full h-screen flex items-center justify-center absolute top-0 right-0 left-0">
     
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 blur-2xl bg-[#0000004f] " />

    
      <div className="relative z-10 flex flex-col items-center text-white px-6 text-center max-w-4xl mt-25">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-wide uppercase text-green-400 drop-shadow-lg">
          Welcome to Urban Jungle Co.
        </h1>

        <h1 className="text-5xl md:text-5xl lg:text-7xl font-extrabold  leading-tight mt-12">
          Discover the Beauty of <br />
          <span className="bg-linear-to-r from-green-400 via-lime-300 to-green-500 bg-clip-text text-transparent">
            Nature
          </span>{" "}
          at Your <br />
          Fingertips
        </h1>

        <div className="mt-0">
          <Shopbtn />
        </div>
      </div>
    </div>
  );
};

export default Container;
