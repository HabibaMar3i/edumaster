const stats = [
    { value: "15K+", label: "Students" },
    { value: "75%", label: "Total success" },
    { value: "35", label: "Main questions" },
    { value: "26", label: "Chief experts" },
    { value: "16", label: "Years of experience" },
];

export default function OurSuccess() {
    return (
        <section className="bg-white py-24 px-6 md:px-20">
            {/* Title */}
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-black mb-4">
                    Our Success
                </h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Ornare id fames interdum porttitor nulla turpis etiam.
                    Diam vitae sollicitudin at nec nam et pharetra gravida.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-10 text-center">
                {stats.map((item, i) => (
                    <div key={i}>
                        <h3 className="text-5xl font-bold text-teal-400 mb-2">
                            {item.value}
                        </h3>
                        <p className="text-gray-500 text-sm font-medium">
                            {item.label}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
