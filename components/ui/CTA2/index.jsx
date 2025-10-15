import SectionWrapper from "../../SectionWrapper"
import NavLink from "../NavLink"
import ctaImage from "/public/pictures/aboutpic4.jpg"
import Image from "next/image"

const About2 = () => {
    return (
        <SectionWrapper id="cta2" className="pt-20">
            <div className="custom-screen">
                <div className="items-center gap-x-12 lg:flex lg:flex-row-reverse">
                    <div className="flex-1 sm:hidden lg:block">
                        <Image
                            src={ctaImage}
                            className="rounded-lg md:max-w-lg"
                            alt="Create Successful Business Models with Our IT Solutions"
                        />
                    </div>
                    <div className="max-w-xl mt-6 md:mt-0 lg:max-w-2xl">
                        <h2 className="text-white text-3xl font-extrabold sm:text-4xl">
                            How did Racesin Motorsport begin?
                        </h2>
                        <p className="mt-3 text-gray-500">
                            Racesin Motorsport was born from a lifelong passion for racing, deeply rooted in the Reisin family’s history. The name “Racesin,” inspired by the family name, represents both tradition and a fresh beginning. <br /> <br />
                            From this heritage grew the dream of building a racing team of their own. <br />
                            Led by Romet Reisin, Racesin Motorsport was created with a clear vision: to combine family experience with modern technology and an unstoppable drive for success – honoring its roots while racing toward the future.
                         </p>   
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}

export default About2
