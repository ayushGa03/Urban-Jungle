import React from "react";
import Naavbar from "../components/Naavbar";
import Footer from "../sections/Home/Footer";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <Naavbar />

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 bg-[#0d0d0d] text-white text-center px-6">
        <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-[#00ff99] to-[#067a55] bg-clip-text text-transparent drop-shadow-lg tracking-wide">
          Growing Nature, Growing Happiness <i className="fa-solid fa-seedling"></i>
        </h1>
        <p className="text-gray-300 text-lg mt-5 max-w-3xl mx-auto leading-relaxed">
          We inspire a greener lifestyle by connecting people with the beauty of
          nature. From cozy homes to modern workspaces—plants transform any
          space.
        </p>

        <button className="mt-7 bg-[#00ff99] text-black px-10 py-3 rounded-xl font-semibold hover:scale-110 hover:shadow-[0_0_15px_#00ff9980] transition-all duration-300">
          Explore Our Mission
        </button>
      </section>

      {/* STORY SECTION */}
      <section className="bg-[#0f0f0f] py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-14">
          <img
            src="https://www.saferbrand.com/media/Articles/Safer-Brand/26-best-indoor-plants.jpg"
            alt="Green Interior"
            className="rounded-3xl shadow-[0_0_35px_#00ff9970] hover:scale-105 transition-all duration-500 w-full max-w-lg object-cover"
          />

          <div className="text-white flex flex-col gap-5 lg:w-1/2">
            <h2 className="text-4xl font-bold text-[#00ff99] tracking-wide">
              Our Story
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Urban Jungle Co. began with a mission to reconnect people with
              nature. Plants are more than decor—they bring life, calmness and
              positive energy.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Every plant we deliver is carefully selected and nurtured,
              ensuring it arrives fresh and healthy right to your home.
            </p>

            <button className="bg-transparent border border-[#00ff99] text-[#00ff99] px-7 py-3 rounded-xl font-semibold hover:bg-[#00ff99] hover:text-black transition-all duration-300 w-fit">
              Read Full Journey
            </button>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="bg-[#0d0d0d] py-20 px-6 text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-[#00ff99] to-[#067a55] bg-clip-text text-transparent tracking-wide">
          What Makes Us Special?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto mt-14">
          {[
            ["ri-leaf-line", "Eco-Friendly Process"],
            ["ri-truck-line", "Fast & Safe Delivery"],
            ["ri-seedling-line", "Premium Plant Care"],
            ["ri-emotion-happy-line", "Happy Customers"],
          ].map(([icon, label], i) => (
            <div
              key={i}
              className="bg-[#111] p-8 rounded-2xl hover:scale-110 hover:shadow-[0_0_25px_#00ff9999] transition-all duration-300 flex flex-col items-center gap-4"
            >
              <i className={`${icon} text-6xl text-[#00ff99]`}></i>
              <h3 className="text-xl font-semibold text-white">{label}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCT GALLERY REPLACED SECTION */}
      <section className="bg-[#0f0f0f] py-20 px-6">
        <h2 className="text-center text-4xl font-bold text-white mb-12 tracking-wide">
          Our Top Green Beauties <i className="fa-solid fa-leaf"></i>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              img: "https://media.istockphoto.com/id/1396488496/photo/crassula-ovata-houseplant-in-a-green-pot-grey-background.jpg?s=612x612&w=0&k=20&c=lYmcbTpffeIDUmbj1XoVn-DRUAKgRRuTkg1QJ1I2POQ=",
              label: "Jade Plant",
            },
            {
              img: "https://masonhome.in/cdn/shop/files/348_3c0f3f06-b8b8-48b7-9e79-551d76890a64.png?v=1758785141&width=1500",
              label: "Areca Palm",
            },
            {
              img: "https://www.palasa.co.in/cdn/shop/files/DSC1865.jpg?v=1750749622",
              label: "Spider Plant",
            },
            {
              img: "https://m.media-amazon.com/images/I/518eaTa9hmL.jpg",
              label: "Bamboo Plant",
            },
            {
              img: "https://kyari.co/cdn/shop/files/1_c2592c28-67c7-4eeb-ae96-8d693911e234.jpg?v=1737183229&width=480",
              label: "ZZ Plant",
            },
            {
              img: "https://m.media-amazon.com/images/I/71z4dJMMBmL.jpg",
              label: "Rubber Plant",
            },
            {
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvG60R9IM1yc_TC1EwnMDQL-o8t2IlbC0_hg&s",
              label: "Fiddle Leaf Fig",
            },
            {
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-YCmc6G3BVhLQFO3gDMlJsDhd5TA5SS_ViQ&s",
              label: "Pothos Money Plant",
            },
          ].map(({ img, label }, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl shadow-md shadow-[#00ff99]/30 hover:shadow-[#00ff99]/60 transition-all duration-500 hover:scale-105 cursor-pointer"
            >
              <img
                src={img}
                className="w-full h-64 object-cover rounded-2xl"
                alt={label}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center pb-4 opacity-0 hover:opacity-100 transition-all duration-500">
                <h3 className="text-xl font-semibold text-[#00ff99]">
                  {label}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0d0d0d] py-20 text-center text-white">
        <h2 className="text-4xl font-bold tracking-wide">
          Join Our Growing Plant Family <i className="fa-solid fa-leaf"></i>
        </h2>
        <p className="text-gray-300 mt-4 max-w-xl mx-auto text-lg leading-relaxed">
          Thousands of nature lovers trust us to make their homes greener &
          happier.
        </p>

        <Link to="/shop">
          <button className="mt-6 bg-[#00ff99] text-black px-12 py-4 rounded-2xl font-semibold text-xl hover:scale-110 hover:shadow-[0_0_15px_#00ff99] transition-all duration-300">
            Shop Plants Now
          </button>
        </Link>
      </section>

      <Footer />
    </>
  );
};

export default About;
