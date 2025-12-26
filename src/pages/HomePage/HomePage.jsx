import Hero from "./components/Hero";
import OurSuccess from "./components/OurSuccess";
import FeatureCards from "./components/FeatureCards";
import WhatIs from "./components/WhatIs";
export default function HomePage() {
    return (
        <div className="min-h-screen bg-teal-500 ">
            <Hero />
            <div className="bg-white text-white px-6 md:px-20">
                <OurSuccess />
                <FeatureCards />
                <WhatIs />
            </div>
        </div>
    )
}
