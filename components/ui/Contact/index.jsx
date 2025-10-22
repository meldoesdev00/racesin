"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import Input from "../Input";
import Button from "../Button";

const Contact = () => {
  const searchParams = useSearchParams();

  // 🧠 If redirected from "Buy Now", extract product info
  const product = searchParams.get("product");
  const price = searchParams.get("price");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  // 💬 Prefill message if product info exists
  useEffect(() => {
    if (product) {
      setFormData((prev) => ({
        ...prev,
        message: `I'm interested in purchasing "${product}" for ${price}. Please contact me with more details.`,
      }));
    }
  }, [product, price]);

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
      className="pt-16 pb-20 bg-transparent"
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Centered container */}
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8">
        <div className="mx-auto flex flex-col lg:flex-row items-start justify-center gap-12 lg:gap-60">
          {/* LEFT SIDE — Get in touch */}
          <div className="max-w-md">
            <h2 className="text-white text-4xl font-extrabold">Get in touch</h2>
            <p className="mt-4 text-gray-400 leading-relaxed">
              We are here to help. Get in touch with sales or our press team and let us know how we can help.
            </p>

            <ul className="mt-8 space-y-6">
              <li className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-[#c5a05f]" />
                <p className="text-gray-300">+372 565 8880</p>
              </li>

              <li className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-[#c5a05f]" />
                <p className="text-gray-300">romet@racesin.com</p>
              </li>
            </ul>
          </div>

          {/* RIGHT SIDE — Contact Form */}
          <div className="flex-1 w-full max-w-md">
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
