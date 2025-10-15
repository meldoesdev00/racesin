import SectionWrapper from "../../SectionWrapper"
import ctaImage from "/public/pictures/aboutpic2.jpg"
import Image from "next/image"

const About = () => {
    return (

        
        <SectionWrapper id="about" className="pb-0">
            <div className="custom-screen">
                <div className="items-center gap-x-12 lg:flex">

                    <div className="flex-1 sm:hidden lg:block">
                        <Image
                          src={ctaImage}
                          className="rounded-lg md:max-w-lg"
                          alt="Racesin Motorsport Team"
                        />
                    </div>
                    <div className="max-w-xl mt-6 md:mt-0 lg:max-w-2xl">
                        <h2 className="text-white text-3xl font-extrabold sm:text-4xl">
                            What is Racesin Motorsports?
                        </h2>
                        <p className="mt-3 text-gray-500">
                            Racesin Motorsport is all about passion, dedication, and the love of racing. <br />
                            Founded by Romet Reisin, the team was created to turn the dream of professional motorsport into reality. <br /> <br />
                            Our goal isn’t just to win on the track – it’s also to build a community of people who share the same love for speed, engineering, and competition.

                            What started as a personal project has grown into much more than just a racing team. <br /> <br />
                            Racesin Motorsport is now a place for learning, teamwork, and pushing limits together.
                            Whether it’s circuit racing, sim racing, or new technical ideas, we always focus on quality, collaboration, and our strong passion for motorsport.
                        </p>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}

export default About
