import SectionWrapper from "../../SectionWrapper"

const Testimonials = () => {
    const testimonials = [
        {
            name: "Raimo",
            title: "Founder of Parder Racing",
            quote: "Renting a race-prepped car from this team was an absolute game-changer for my track day. The vehicle was in top mechanical condition, and their crew made sure everything was dialed in before I hit the track. It wasn’t just a rental—it felt like I had a full support team behind me. Easily the best track rental experience I’ve had."
        },
        {
            name: "Reine",
            title: "Upcoming racing driver",
            quote: "The coaching I received from this team took my driving to the next level. Their data analysis, one-on-one feedback, and in-car communication were spot-on. I knocked nearly two seconds off my lap time in just one weekend. These guys don't just coach—they make you faster, smarter, and safer on track."
        },
        {
            name: "Tarmo",
            title: "System manager",
            quote: "I trust this team with all my race car maintenance. Whether it's a suspension setup, engine diagnostics, or pre-race inspections, they treat every detail like it’s a pro-level race weekend. I’ve never had a mechanical DNF since working with them—reliability and performance have been rock solid."
        }
    ]

    return (
        <SectionWrapper className="pt-10">
            <div id="testimonials" className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="max-w-2xl sm:text-center md:mx-auto">
                    <h2 className="text-white text-3xl font-extrabold sm:text-4xl">
                        What others are saying about us
                    </h2>
                </div>
                <div className="mt-12">
                    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {testimonials.map((item, idx) => (
                            <li key={idx} className="bg-transparent p-4 rounded-xl">
                                <figure className="md:text-center">
                                    <div>
                                        <span className="block text-white font-semibold">{item.name}</span>
                                        <span className="block text-gray-400 text-sm mt-0.5">{item.title}</span>
                                    </div>
                                    <blockquote>
                                        <p className="mt-6 text-gray-300">
                                            {item.quote}
                                        </p>
                                    </blockquote>
                                </figure>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </SectionWrapper>
    )
}

export default Testimonials
