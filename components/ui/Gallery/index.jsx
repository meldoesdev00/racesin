import SectionWrapper from "../../SectionWrapper";
import service1 from "/public/pictures/pic3.jpeg";
import service2 from "/public/pictures/pic3.jpeg";
import service3 from "/public/pictures/pic3.jpeg";
import service4 from "/public/pictures/pic4.jpeg";

const Gallery = () => {
  const features = [
    {
      image: service1,
      title: "Simulator Reints-v1",
      desc: "We provide rental and full maintenance services for real race cars — making motorsport more accessible.",
    },
    {
      image: service2,
      title: "Simulator Reints-v2",
      desc: "High-quality racing simulator frames built from aluminum profiles. Available as ready-made products or custom-built solutions tailored to your needs.",
    },
    {
      image: service3,
      title: "Simulator Reints-v3",
      desc: "Versatile aluminum profile constructions for workbenches, shelving, 3D printer frames, work environments, and more.",
    },
  ];

  return (
    <SectionWrapper id="gallery" className="pt-12 pb-16">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto space-y-3 sm:text-center">
          <h2 className="text-white text-4xl font-extrabold text-center">
            Done works for clients
          </h2>
        </div>

        {/* Gallery Grid */}
        <div className="mt-10">
          <ul className="grid gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item, idx) => (
              <li key={idx} className="space-y-4">
                <div className="block group cursor-default">
                  <div
                    className="h-64 w-auto rounded-lg overflow-hidden shadow-lg transform transition-transform duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${item.image.src})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                </div>

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

export default Gallery;





