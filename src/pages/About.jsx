import { Card, CardBody, Button, Chip } from "@heroui/react";
import { BookOpen, Users, Award, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className="font-sans">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-[#49bbbd] to-teal-500 text-white py-20 px-6 text-center relative overflow-hidden">
                <div className="max-w-4xl mx-auto z-10 relative">
                    <Chip variant="flat" className="bg-white/20 text-white mb-4 backdrop-blur-md">
                        Shape the Future
                    </Chip>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        Empowering Egypt's Future
                    </h1>
                    <p className="text-lg md:text-xl text-teal-50 max-w-2xl mx-auto mb-8">
                        Providing world-class educational resources, expert mentorship, and
                        comprehensive exam preparation for every student in Egypt.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link to="/register">
                            <Button className="bg-white text-[#49bbbd] font-semibold shadow-lg" size="lg">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </div>
                {/* Decorative background element */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* Statistics Grid */}
            <section className="py-16 px-6 bg-gray-50/50">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { count: "50k+", label: "Students Enrolled" },
                        { count: "200+", label: "Expert Teachers" },
                        { count: "1,000+", label: "Online Courses" }
                    ].map((stat, index) => (
                        <Card key={index} className="border-none shadow-md hover:shadow-xl transition-all duration-300">
                            <CardBody className="p-8 text-center">
                                <div className="text-[#49bbbd] font-bold text-4xl mb-2">{stat.count}</div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Core Values */}
            <section className="py-16 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                        Our Core Values
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Value 1 */}
                        <Card className="border-none shadow-md hover:-translate-y-1 transition-transform duration-300">
                            <CardBody className="p-8 flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-teal-50 text-[#49bbbd] rounded-full flex items-center justify-center mb-6">
                                    <Users size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-800">Accessibility</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    We believe quality education should be accessible to every student across Egypt, regardless of location or background.
                                </p>
                            </CardBody>
                        </Card>

                        {/* Value 2 */}
                        <Card className="border-none shadow-md hover:-translate-y-1 transition-transform duration-300">
                            <CardBody className="p-8 flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-teal-50 text-[#49bbbd] rounded-full flex items-center justify-center mb-6">
                                    <BookOpen size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-800">Quality</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Our curriculum follows the highest standards, designed by top educators to ensure comprehensive learning.
                                </p>
                            </CardBody>
                        </Card>

                        {/* Value 3 */}
                        <Card className="border-none shadow-md hover:-translate-y-1 transition-transform duration-300">
                            <CardBody className="p-8 flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-teal-50 text-[#49bbbd] rounded-full flex items-center justify-center mb-6">
                                    <Award size={32} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-800">Success</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    We are committed to helping students achieve their academic goals and build a bright future.
                                </p>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </section>

            {/* "Why EduMaster?" Section */}
            <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-teal-50/30">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="order-2 lg:order-1">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">
                            Why Choose EduMaster?
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Unlike generic platforms, EduMaster is tailored specifically for the <strong>Egyptian National Curriculum</strong>. We understand the unique challenges students face and provide targeted solutions to overcome them.
                        </p>
                        <ul className="space-y-4 mb-8">
                            {[
                                "Aligned with Ministry of Education standards",
                                "Native Arabic instruction with English terminology support",
                                "Interactive exam simulations mirroring real tests",
                                "24/7 Academic support from subject matter experts"
                            ].map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <CheckCircle className="text-[#49bbbd] flex-shrink-0 mt-1 mr-3" size={20} />
                                    <span className="text-gray-700">{item}</span>
                                </li>
                            ))}
                        </ul>
                        <Link to="/lessons">
                            <Button className="bg-[#49bbbd] text-white font-medium" endContent={<ArrowRight size={18} />}>
                                Explore Courses
                            </Button>
                        </Link>
                    </div>

                    {/* Image Placeholder */}
                    <div className="order-1 lg:order-2">
                        <Card className="w-full h-80 border-none shadow-xl">
                            <div className="w-full h-full bg-gradient-to-tr from-[#49bbbd] to-teal-400 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 opacity-20"
                                    style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, white 2px, transparent 0)', backgroundSize: '24px 24px' }}>
                                </div>
                                <span className="relative text-white font-semibold text-xl z-10 px-6 text-center">
                                    EduMaster Classroom Environment
                                </span>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
