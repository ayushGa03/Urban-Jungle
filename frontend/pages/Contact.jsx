import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import Naavbar from "../components/Naavbar";
import Footer from "../sections/Home/Footer";

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_kt8jcfy",   
        "template_ldjne5g",     
        form.current,
        "92zPswAPwgwGOlcoc"       
      )
      .then(
        () => {
          toast.success("Message sent successfully! 🌿");
          form.current.reset();
        },
        (error) => {
          toast.error("Failed to send message. Try again!");
          console.log(error);
        }
      );
  };

  return (
    <>
      <Naavbar />
      <section className="pt-32 pb-20 bg-[#0d0d0d] text-white text-center px-6">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-[#00ff99] to-[#067a55] bg-clip-text text-transparent">
          Contact Us <i className="fa-solid fa-seedling ml-1"></i>
        </h1>
        <p className="text-gray-300 mt-4 max-w-2xl mx-auto text-lg">
          Have questions or need support? We’re here to help you grow your dream green space.
        </p>
      </section>

      <section className="bg-[#0f0f0f] py-16 px-6 flex justify-center">
        <form
          ref={form}
          onSubmit={sendEmail}
          className="bg-[#111] p-8 rounded-2xl shadow-[0_0_30px_#00ff9970] max-w-xl w-full flex flex-col gap-5"
        >
          <h2 className="text-3xl font-semibold text-center text-[#00ff99]">
            Send Us a Message
          </h2>

          <input type="text" name="user_name" required placeholder="Your Name"
            className="p-3 rounded-md bg-[#0d0d0d] text-white border border-[#00ff99]" />

          <input type="email" name="user_email" required placeholder="Your Email"
            className="p-3 rounded-md bg-[#0d0d0d] text-white border border-[#00ff99]" />

          <input type="tel" name="user_phone" placeholder="Phone Number"
            className="p-3 rounded-md bg-[#0d0d0d] text-white border border-[#00ff99]" />

          <textarea name="message" required placeholder="Your Message"
            className="p-3 rounded-md bg-[#0d0d0d] text-white border border-[#00ff99] h-32" />

          <button type="submit"
            className="mt-2 bg-[#00ff99] text-black font-bold py-3 rounded-lg hover:scale-110 transition-all shadow-lg">
            Send Message
          </button>
        </form>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
