import { useRouter } from "next/router";
import SectionWrapper from "../../SectionWrapper";
import service1 from "/public/pictures/coaching2.jpg";
import service2 from "/public/pictures/simulator.jpg";
import service6 from "/public/pictures/pic2.jpg";

const Services = () => {
  const router = useRouter();

  const features = [
    {
      image: service1,
      title: "Coaching",
      desc: "Expert racing team coaching focused on optimizing performance, strategy, and teamwork to achieve peak results on and off the track.",
      action: "contact", // smooth scroll
    },
    {
      image: service2,
      title: "Racesin Simulators",
      desc: "High-quality racing simulator frames built from aluminum profiles. Available as ready-made products or custom-built solutions tailored to your needs.",
      action: "products", // redirect
    },
    {
      image: service6,
      title: "Track-day service",
      desc: "Consultation, setup, and full service for sim racing rigs, racing gear, and profile-based systems.",
      action: "contact",
    },
  ];

  // ✅ Smooth scroll helper
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  // ✅ Handle click per service type
  const handleClick = (action) => {
    if (action === "products") {
      router.push("/products");
    } else {
      handleScroll(action);
    }
  };

  return (
    <SectionWrapper id="services" className="pt-12 pb-16">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto space-y-3 text-left sm:text-center">
          <h2 className="text-white text-4xl font-extrabold text-left sm:text-center">
            What services we offer?
          </h2>
          <p className="mt-3 text-gray-500">
            At Racesin, we bring together authentic racing experience, advanced
            simulator technology, and precision custom engineering. Our
            expertise allows us to deliver tailored solutions for both the real
            and virtual racing world.
          </p>
        </div>

        {/* Service Cards */}
        <div className="mt-10">
          <ul className="grid gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item, idx) => (
              <li key={idx} className="space-y-4">
                <button
                  onClick={() => handleClick(item.action)}
                  className="block group w-full text-left focus:outline-none"
                >
                  <div
                    className="h-64 w-auto rounded-lg overflow-hidden shadow-lg transform transition-transform group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${item.image.src})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </button>

                <div>
                  <h4 className="text-lg text-white font-semibold">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm text-gray-500">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Services;


