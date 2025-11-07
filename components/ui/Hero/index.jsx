import React, { useState } from "react";
import { useRouter } from "next/router";

const Hero = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="relative h-screen bg-black overflow-hidden">
      {/* Vimeo background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/2 left-1/2 w-[177.78vh] h-[100vh] -translate-x-1/2 -translate-y-1/2 sm:w-[100vw] sm:h-[56.25vw]">
          <iframe
            src="https://player.vimeo.com/video/1129637842?background=1&autoplay=1&muted=1&loop=1&playsinline=1"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="absolute top-1/2 left-1/2 w-full h-full min-w-[100%] min-h-[100%] transform -translate-x-1/2 -translate-y-1/2 scale-[1.3] sm:scale-[1.1]"
            style={{
              objectFit: "cover",
              pointerEvents: "none",
            }}
          ></iframe>
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-10"></div>

      {/* Navbar */}
      <header className="absolute inset-x-0 top-0 z-30">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-8 lg:px-16"
        >
          <div className="flex lg:flex-1">
            <a
              onClick={() => scrollToSection("hero")}
              className="-m-1.5 p-1.5 cursor-pointer"
            >
              <img
                src="/racesin_logo.svg"
                alt="Racesin Logo"
                className="h-12 w-auto"
              />
            </a>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-100"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
                className="w-6 h-6"
              >
                <path
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-12 text-gray-100">
            <button onClick={() => scrollToSection("about")} className="text-sm font-semibold">
              About Us
            </button>
            <button onClick={() => scrollToSection("achievements")} className="text-sm font-semibold">
              Achievements
            </button>
            <button onClick={() => scrollToSection("services")} className="text-sm font-semibold">
              Our Services
            </button>
            <button onClick={() => router.push("/products")} className="text-sm font-semibold">
              Products
            </button>
            <button onClick={() => scrollToSection("gallery")} className="text-sm font-semibold">
              Works
            </button>
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <button
              onClick={() => scrollToSection("contact")}
              className="rounded-md bg-[#c5a05f] px-5 py-2 text-base font-semibold text-white shadow-md hover:bg-[#b18d54] active:bg-[#9c7a49] focus:ring ring-offset-2 ring-[#c5a05f] transition-all duration-200"
            >
              Let&apos;s talk
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/30 backdrop-blur-md">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-gray-300 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <nav className="flex flex-col items-center space-y-8 text-white text-2xl font-semibold">
              <button onClick={() => scrollToSection("about")}>About Us</button>
              <button onClick={() => scrollToSection("achievements")}>Achievements</button>
              <button onClick={() => scrollToSection("services")}>Our Services</button>
              <button onClick={() => router.push("/products")}>Products</button>
              <button onClick={() => scrollToSection("gallery")}>Works</button>
              <button
                onClick={() => scrollToSection("contact")}
                className="mt-8 rounded-md bg-[#c5a05f] px-8 py-4 text-lg font-semibold text-white hover:bg-[#b18d54] active:bg-[#9c7a49] focus:ring ring-[#c5a05f] transition-all duration-200"
              >
                Let&apos;s talk
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Text */}
      <div
        id="hero"
        className="relative flex items-center justify-center h-full px-6 pt-18 lg:px-8 z-20 text-center"
      >
        <div className="mx-auto max-w-2xl text-gray-100">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
            Racesin Motorsport <br /> is more than just a name
          </h1>
          <p className="mt-6 text-lg font-medium sm:text-xl">
            it&apos;s an attitude, a style, and a vision.
          </p>

          <div
            onClick={() => scrollToSection("about")}
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer"
          >
            <p className="text-sm font-semibold text-white">
              Scroll down to find out more
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 mt-3 text-white animate-bounce"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

