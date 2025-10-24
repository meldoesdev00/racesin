import Head from "next/head";
import About from "../components/ui/About";
import About2 from "../components/ui/CTA2";
import Achivements from "../components/ui/Achivements";
import Divider from "../components/ui/Divider";
import Gallery from "../components/ui/Gallery";
import Hero from "../components/ui/Hero";
import Services from "../components/ui/Services";
import Contact from "../components/ui/Contact";
import Footer from "../components/ui/Footer";

export default function Home() {
  return (
    <>
      <Head>
        <title>Racesin Motorsport | is more than just a name - it's an attitude, a style, and a vision.</title>
        <meta name="robots" content="index" />
      </Head>

      <Hero />
      <About />
      <About2 />
      <Divider />
      <Achivements />
      <Divider />
      <Services />
      <Divider />
      <Gallery />
      <Divider />
      <Contact />
      <Footer />
    </>
  );
}
