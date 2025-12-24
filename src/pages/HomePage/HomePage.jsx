import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero.jsx";
import OurSuccess from "./components/OurSuccess";
import FeatureCards from "./components/FeatureCards";
import CTA from "./components/CTA";
import WhatIs from "./components/WhatIs.jsx";
import Footer from "./components/Footer.jsx";
export default function HomePage() {
    return (
        <div className="min-h-screen bg-teal-500 ">
            <Navbar />
            <Hero />
            <div className="bg-white text-white px-6 md:px-20">
                <OurSuccess />
                <FeatureCards />
                <WhatIs />
                <CTA />
            </div>
            <Footer />

        </div>
    )
}
