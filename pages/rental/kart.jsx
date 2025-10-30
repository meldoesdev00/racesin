import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import ContactDrawer from "@/components/ContactDrawer";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";

// IMPORT IMAGES
import Kart1 from "/public/pictures/Kart1.jpg";
import Kart2 from "/public/pictures/Kart2.jpg";

export default function KartRentalPage() {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [hovering, setHovering] = useState(false);

  const images = [Kart1, Kart2];
  const productName = "Rotax DD2 – Tony Kart";

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % images.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, []);

  const specs = [
    { label: "Engine", value: "Rotax 125 MAX DD2, 2-stroke, 125cc" },
    { label: "Power", value: "≈ 34 hp @ 12,000 rpm" },
    { label: "Torque", value: "≈ 22 Nm @ 10,500 rpm" },
    { label: "Transmission", value: "2-speed paddle shift, direct drive" },
    { label: "Top Speed", value: "Up to 140 km/h" },
    { label: "Chassis", value: "Tony Kart DD2 – CIK/FIA homologated" },
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
            If you want to feel real racing intensity, this kart rental gives you
            a truly competitive package. Ideal for testing, training, or improving
            racecraft at high speed.
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
