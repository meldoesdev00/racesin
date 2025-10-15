"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Input from "../Input";
import Button from "../Button";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("⏳ Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        const data = await res.json();
        setStatus(`❌ Failed to send: ${data.error || "Try again later."}`);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("❌ Something went wrong. Please try again later.");
    }
  };

  return (
    <motion.div
      id="contact"
      className="pt-10 pb-12"
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="custom-screen text-gray-300">
        <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none">
          {/* Left Section */}
          <div className="max-w-lg sm:text-center lg:text-left">
            <h2 className="text-white text-3xl font-extrabold sm:text-4xl">
              Talk to us
            </h2>
            <p className="mt-3 text-gray-400">
              We are here to help. Get in touch with sales or our press team and
              let us know how we can help.
            </p>

            {/* Instagram Grid */}
            <div className="mt-10 hidden sm:block">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {["ig1", "ig2", "ig3", "ig4", "ig5", "ig6"].map((img, i) => (
                  <a
                    key={i}
                    href="https://www.instagram.com/racesin.official"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group relative"
                  >
                    <img
                      src={`/pictures/${img}.jpg`}
                      alt={`Instagram post ${i + 1}`}
                      className="w-full aspect-square object-cover rounded-lg group-hover:opacity-80 transition"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex-1 mt-12 sm:max-w-lg lg:max-w-md lg:mt-5">
            <form onSubmit={handleSubmit} className="space-y-5 font-medium">
              <div>
                <label className="text-white">Your name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  required
                  className="mt-2 focus:border-[#c5a05f]"
                />
              </div>
              <div>
                <label className="text-white">Email</label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  required
                  className="mt-2 focus:border-[#c5a05f]"
                />
              </div>
              <div>
                <label className="text-white">Phone</label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="text"
                  className="mt-2 focus:border-[#c5a05f]"
                />
              </div>
              <div>
                <label className="text-white">How we can help you?</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 h-36 px-3 py-2 resize-none bg-transparent outline-none border border-gray-600 focus:border-[#c5a05f] shadow-sm rounded-lg text-white"
                ></textarea>
              </div>

              <div className="pt-1">
                <Button className="w-full bg-[#c5a05f] text-white hover:bg-[#b89255] active:bg-[#a5804c] ring-offset-2 ring-[#c5a05f] focus:ring">
                  Submit
                </Button>
              </div>

              {status && (
                <p
                  className={`text-center text-sm mt-3 ${
                    status.startsWith("✅")
                      ? "text-green-500"
                      : status.startsWith("⏳")
                      ? "text-yellow-400"
                      : "text-red-500"
                  }`}
                >
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;

