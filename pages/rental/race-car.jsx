import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import ContactDrawer from "@/components/ContactDrawer";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

// IMPORT IMAGES
import Car1 from "/public/pictures/Car1.jpg";
import Car2 from "/public/pictures/Car2.jpg";

export default function SwiftRentalPage() {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  const images = [Car1, Car2];
  const productName = "Suzuki Swift V1600";

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, []);

  const specs = [
    { label: "Engine", value: "Suzuki M16A 1.6L, 4-cylinder NA" },
    { label: "Power", value: "≈ 135–140 hp @ 7,200 rpm" },
    { label: "Torque", value: "≈ 150 Nm @ 5,000 rpm" },
    { label: "Drive", value: "Front-wheel drive (FWD)" },
    { label: "Transmission", value: "5-speed manual" },
    { label: "Chassis", value: "FIA-spec roll cage, racing suspension" },
    { label: "Wheels/Tyres", value: "15” slicks or semi-slicks" },
    { label: "Interior", value: "Bucket seat, 6-point harness, AIM logger" },
    { label: "Category", value: "V1600 / Touring Car" },
  ];

  return (
    <>
      <Head>
        <title>{productName} Rental | Racesin Motorsport</title>
      </Head>

      <div className="min-h-screen bg-[#121111] text-white pb-20">
        {/* NAV */}
        <header className="absolute inset-x-0 top-0 z-50">
          <nav className="flex items-center justify-between p-8 lg:px-16">
            <button onClick={() => router.push("/")} className="-m-1.5 p-1.5 cursor-pointer">
              <img src="/racesin_logo.svg" alt="Racesin Logo" className="h-12 w-auto" />
            </button>

            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-2 text-sm font-semibold hover:text-[#c5a05f] transition"
            >
              <ArrowLeft className="w-5 h-5" /> Back
            </button>
          </nav>
        </header>

        {/* CONTENT */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-36 sm:pt-28">

          {/* TITLE */}
          <h1 className="text-4xl font-bold mb-6">{productName}</h1>
          <p className="text-gray-400 max-w-3xl text-lg leading-relaxed mb-12">
            The Suzuki Swift V1600 is reliable and competitive race car. <br />
            Ideal for training, testing or racing in Baltic and Nordic championships.
          </p>

          {/* IMAGE + SPECS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* IMAGES */}
            <div
              className="relative bg-[#1c1b1b] rounded-xl overflow-hidden shadow-2xl h-[360px] sm:h-[420px] md:h-[480px] cursor-pointer"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              {images.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt={productName}
                  fill
                  priority
                  className={`object-cover absolute inset-0 transition-opacity duration-700 ease-out ${
                    imageIndex === i ? "opacity-100" : "opacity-0"
                  } ${hovering ? "scale-[1.03]" : "scale-100"} transition-transform duration-700`}
                />
              ))}
            </div>

            {/* SPECS */}
            <div>
              <h2 className="text-2xl font-semibold mb-5 text-[#c5a05f]">Technical Specs</h2>
              <ul className="space-y-3 text-gray-300">
                {specs.map((s, i) => (
                  <li key={i} className="flex justify-between border-b border-gray-800 pb-2">
                    <span className="text-gray-400">{s.label}</span>
                    <span className="font-medium text-right">{s.value}</span>
                  </li>
                ))}
              </ul>

              {/* CTA BUTTON */}
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="mt-10 w-full sm:w-auto bg-[#c5a05f] hover:bg-[#b89255] text-white font-medium px-8 py-4 rounded-xl transition"
              >
                Request Rental
              </button>
            </div>
          </div>
        </div>

        {/* CONTACT DRAWER (RENTAL MODE) */}
        <ContactDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          product={productName}
          rentalMode={true}
        />
      </div>
    </>
  );
}
