import React from "react";

const Achievements = () => {
  const events = [
    {
      date: "2022",
      title: "3rd place | BMW 325 Cup",
      description:
        "Baltic, Estonian and Lithuanian Championship 3rd place overrall",
    },
    {
      date: "2023",
      title: "3rd place | BMW 325 Cup",
      description:
        "Baltic, Estonian and Lithuanian Championship 3rd place overrall",
    },
    {
      date: "2023",
      title: "Baltic Champion | 2H Nankang Endurance Academy",
      description: "Baltic Champion in 2H Nankang Endurance Academy BMW 325 Cup class",
    },
    {
      date: "2024",
      title: "Poland and Baltic Champion | GT3 class",
      description: "Poland and Baltic Champion in D3500 (GT3) class (2H Endurance)",
    },
    {
      date: "2024",
      title: "Baltic 3rd | BaTCC GT AM class",
      description:
        "Baltic 3rd overall BaTCC GT AM class (TCR and GT4 class) (2H Endurance)",
    },
    {
      date: "2025",
      title: "Moved into GT4",
      description:
        "Moved into Porsche competition with Porsche Latvia Racing Team",
    },
    {
      date: "2025",
      title: "Palanga (Aurum 1006 km)",
      description:
        "P2 and top-10 overall reported in coverage of the event.",
    },
  ];

  return (
    <div id="achievements" className="py-16 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-white text-4xl font-extrabold text-left sm:text-center mb-12">
          Achievements <br /> over time
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {events.map((event, idx) => (
            <div
              key={idx}
              className="text-left sm:text-center transition-transform duration-200 hover:scale-105"
            >
              <span className="text-[#c5a05f] text-m font-medium block">
                {event.date}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-white">
                {event.title}
              </h3>
              <p className="mt-3 text-gray-400">{event.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
