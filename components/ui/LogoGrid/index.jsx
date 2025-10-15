import Image from "next/image";
import eal from "../../../public/logos/eal.svg";
import delfisport from "../../../public/logos/delfisport.svg";
import tv3 from "../../../public/logos/logo-tv3-white.svg";

const logos = [
  { src: eal, alt: "eal" },
  { src: delfisport, alt: "delfisport" },
  { src: tv3, alt: "tv3" },
];

const repeatedLogos = [...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos, ...logos]; // more repeats for smoother flow

const LogoGrid = () => {
  return (
    <div className="overflow-hidden py-8">
      <div className="relative w-full">
        <div className="flex animate-marquee gap-16 whitespace-nowrap">
          {repeatedLogos.map((item, idx) => (
            <div key={idx} className="flex-shrink-0">
              <Image
                src={item.src}
                alt={item.alt}
                className="h-8 w-auto opacity-30"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoGrid;




