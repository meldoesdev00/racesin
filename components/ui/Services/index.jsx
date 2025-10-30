import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import SectionWrapper from "../../SectionWrapper";
import service1 from "/public/pictures/coaching2.jpg";
import service2 from "/public/pictures/simulator.jpg";
import service6 from "/public/pictures/pic2.jpg";
import carImage from "/public/pictures/rendikas_car.png";
import kartImage from "/public/pictures/rendikas_kart.png";

const Services = () => {
  const router = useRouter();
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const shouldOpen = localStorage.getItem("returnToServicesOverlay");
      if (shouldOpen) {
        setShowOverlay(true);
        localStorage.removeItem("returnToServicesOverlay");
      }
    }
  }, []);

  const features = [
    {
      image: service1,
      title: "Coaching",
      desc: "Expert racing team coaching focused on optimizing performance, strategy, and teamwork to achieve peak results on and off the track.",
      action: "contact",
    },
    {
      image: service2,
      title: "Racesin Simulators",
      desc: "High-quality racing simulator frames built from aluminum profiles. Available as ready-made products or custom-built solutions tailored to your needs.",
      action: "products",
      pulse: true,
    },
    {
      image: service6,
      title: "Track-day service",
      desc: "Consultation, setup, and full service for sim racing rigs, racing gear, and profile-based systems.",
      action: "overlay",
      pulse: true,
    },
  ];

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const handleClick = (action) => {
    if (action === "products") {
      router.push("/products");
    } else if (action === "overlay") {
      setShowOverlay(true);
    } else {
      handleScroll(action);
    }
  };

  return (
    <SectionWrapper id="services" className="pt-12 pb-16 relative">
      <div
        className={`transition-all duration-500 ${
          showOverlay ? "blur-md pointer-events-none select-none" : ""
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-4">
          <div className="max-w-4xl mx-auto space-y-3 text-left sm:text-center">
            <h2 className="text-white text-4xl font-extrabold text-left sm:text-center">
              What services we offer?
            </h2>
            <p className="mt-3 text-gray-500">
              At Racesin, we bring together authentic racing experience,
              advanced simulator technology, and precision custom engineering.
              Our expertise allows us to deliver tailored solutions for both the
              real and virtual racing world.
            </p>
          </div>

          <div className="mt-10">
            <ul className="grid gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((item, idx) => (
                <li key={idx} className="space-y-4">
                  <button
                    onClick={() => handleClick(item.action)}
                    className="block group w-full text-left focus:outline-none"
                  >
                    <div
                      className={`h-64 w-auto rounded-lg overflow-hidden shadow-lg transform transition-transform
                        group-hover:scale-105
                        ${item.pulse ? "animate-slowpulse" : ""}
                      `}
                      style={{
                        backgroundImage: `url(${item.image.src})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </button>

                  <div>
                    <h4
                      onClick={() => handleClick(item.action)}
                      className="text-lg text-white font-semibold cursor-pointer hover:text-red-400 transition"
                    >
                      {item.title}
                    </h4>
                    <p className="mt-2 text-sm text-gray-500">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {showOverlay && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 
          text-white backdrop-blur-lg transition-opacity duration-500 px-4"
          onClick={() => setShowOverlay(false)}
        >
          <button
            onClick={() => setShowOverlay(false)}
            className="absolute top-6 right-8 text-3xl font-light hover:text-red-500"
          >
            ✕
          </button>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 sm:mb-6 select-none">
            Vehicles to rent
          </h2>

          <p className="text-sm sm:text-base mb-8 text-gray-300 text-center select-none leading-relaxed">
            Tap on the vehicle you would like
            <br className="block sm:hidden" />
            <span className="hidden sm:inline"> to rent for testing or racing.</span>
            <span className="block sm:hidden">to rent for testing or racing.</span>
          </p>

          <div
            className="flex gap-12 sm:gap-20 flex-wrap justify-center items-end"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              onClick={() => {
                localStorage.setItem("returnToServicesOverlay", "true");
                router.push("/rental/race-car");
              }}
              className="flex flex-col items-center group select-none cursor-pointer"
            >
              <div className="relative transition-transform duration-300 ease-out group-hover:scale-[1.03]">
                <Image
                  src={carImage}
                  alt="Rental Car"
                  className="object-contain pointer-events-none w-[260px] sm:w-[320px] md:w-[380px]"
                  draggable="false"
                />
              </div>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg font-semibold tracking-wide">
                Race Car
              </p>
            </div>

            <div
              onClick={() => {
                localStorage.setItem("returnToServicesOverlay", "true");
                router.push("/rental/kart");
              }}
              className="flex flex-col items-center group select-none cursor-pointer"
            >
              <div className="relative transition-transform duration-300 ease-out group-hover:scale-[1.03]">
                <Image
                  src={kartImage}
                  alt="Rental Kart"
                  className="object-contain pointer-events-none w-[300px] sm:w-[380px] md:w-[460px]"
                  draggable="false"
                />
              </div>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg font-semibold tracking-wide">
                Kart
              </p>
            </div>
          </div>
        </div>
      )}
    </SectionWrapper>
  );
};

export default Services;
