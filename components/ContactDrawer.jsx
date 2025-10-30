"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import Input from "./ui/Input";
import Button from "./ui/Button";

const ContactDrawer = ({ isOpen, onClose, product, price, rentalMode = false }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    track: "",
    date: "",
    message: "",
    rentalMode,
    product,
  });

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!product) return;

    // BUY MODE (unchanged)
    if (!rentalMode) {
      setFormData((prev) => ({
        ...prev,
        message: `I'm interested in purchasing "${product}" for ${price}. Please contact me with more details.`,
      }));
    }

    // RENTAL MODE (auto-fill rental message)
    if (rentalMode) {
      setFormData((prev) => ({
        ...prev,
        message: `I would like to rent the "${product}". Please provide availability and more information.`,
      }));
    }
  }, [product, price, rentalMode]);

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
        setFormData({
          name: "",
          email: "",
          phone: "",
          track: "",
          date: "",
          message: "",
          rentalMode,
          product,
        });
      } else {
        const data = await res.json();
        setStatus(`❌ Failed to send: ${data.error || "Try again later."}`);
      }
    } catch (error) {
      console.error(error);
      setStatus("❌ Something went wrong. Please try again later.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed z-50 bg-[#1c1b1b] text-white p-6 sm:p-8 rounded-t-2xl sm:rounded-none sm:rounded-l-2xl shadow-2xl w-full sm:w-[480px] max-h-[100vh] overflow-y-auto right-0 bottom-0 sm:top-0"
            initial={{ x: "100%", y: "0%" }}
            animate={{
              x: 0,
              y: 0,
              transition: { type: "spring", damping: 25, stiffness: 300 },
            }}
            exit={{ x: "100%", transition: { duration: 0.3 } }}
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#c5a05f]">
                {rentalMode ? "Rental Request" : "Get in touch"}
              </h2>
              <button onClick={onClose}>
                <X className="w-6 h-6 text-gray-300 hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 font-medium">
              {/* NAME */}
              <div>
                <label className="text-white">Your name</label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  type="text"
                  required
                  className="mt-2"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-white">Email</label>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  required
                  className="mt-2"
                />
              </div>

              {/* PHONE */}
              <div>
                <label className="text-white">Phone</label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="text"
                  className="mt-2"
                />
              </div>

              {/* RENTAL FIELDS */}
              {rentalMode && (
                <>
                  <div>
                    <label className="text-white">Track (optional)</label>
                    <Input
                      name="track"
                      value={formData.track}
                      onChange={handleChange}
                      type="text"
                      className="mt-2"
                      placeholder="Example: Porsche Ring"
                    />
                  </div>

                  <div>
                    <label className="text-white">Date (optional)</label>
                    <Input
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      type="date"
                      className="mt-2"
                    />
                  </div>
                </>
              )}

              {/* MESSAGE */}
              <div>
                <label className="text-white">
                  {rentalMode ? "Tell us more about your rental" : "How we can help you?"}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full mt-2 h-36 px-3 py-2 resize-none bg-transparent outline-none border border-gray-600 focus:border-[#c5a05f] shadow-sm rounded-lg text-white"
                ></textarea>
              </div>

              {/* SUBMIT BUTTON */}
              <Button
                type="submit"
                className="w-full bg-[#c5a05f] hover:bg-[#b89255] text-white active:bg-[#a5804c]"
              >
                {rentalMode ? "Request Rental" : "Submit"}
              </Button>

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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactDrawer;
