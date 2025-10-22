import SectionWrapper from "../../SectionWrapper";
import service1 from "/public/pictures/ig4.jpg";
import service2 from "/public/pictures/ig5.jpg";
import service3 from "/public/pictures/ig7.jpg";

const Gallery = () => {
  const features = [
    {
      image: service1,
      title: "",
      desc: "",
    },
    {
      image: service2,
      title: "",
      desc: "",
    },
    {
      image: service3,
      title: "",
      desc: "",
    },
  ];

  return (
    <SectionWrapper id="gallery" className="pt-12 pb-16">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto space-y-3 sm:text-center">
          <h2 className="text-white text-4xl font-extrabold text-center">
            Works done
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





