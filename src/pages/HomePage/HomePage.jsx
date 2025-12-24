import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import OurSuccess from "./components/OurSuccess";
import FeatureCards from "./components/FeatureCards";
import WhatIs from "./components/WhatIs";
import Footer from "./components/Footer";
export default function HomePage() {
    return (
        <div className="min-h-screen bg-teal-500 ">
            <Navbar />
            <Hero />
            <div className="bg-white text-white px-6 md:px-20">
                <OurSuccess />
                <FeatureCards />
                <WhatIs />
            </div>
            <Footer />

        </div>
    )
}
