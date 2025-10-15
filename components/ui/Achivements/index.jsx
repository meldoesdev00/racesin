import React from "react";

const Achievements = () => {
  const events = [
    {
      date: "Aug 2021",
      title: "Founded company",
      description:
        "Nihil aut nam. Dignissimos a pariatur et quos omnis. Aspernatur asperiores et dolorem dolorem",
    },
    {
      date: "Dec 2021",
      title: "Secured $65m in funding",
      description:
        "Nihil aut nam. Dignissimos a pariatur et quos omnis. Aspernatur asperiores et dolorem dolorem",
    },
    {
      date: "2022-2023",
      title: "Strong season in BMW 325 Cup",
      description: "Finished 3rd overall in the series",
    },
    {
      date: "2024",
      title: "Launched Racesin Motorsports",
      description: "Launched Racesin Motorsports as CEO",
    },
    {
      date: "2023",
      title: "Baltic Touring",
      description:
        "Part of EST1 Racing multiple podiums and endurance wins with teammate Priit Kadastik",
    },
    {
      date: "2023/2024",
      title: "Baltic Endurance Champion",
      description: "Multiple race wins and double-wins at weekend events",
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
        "Strong showing in GT4 class (class P2 and top-10 overall reported in coverage of the event).",
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
