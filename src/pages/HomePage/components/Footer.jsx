export default function Footer() {
    return (
        <footer className="bg-[#25284A] text-gray-300 py-20 px-6">
            <div className="max-w-6xl mx-auto text-center">

                {/* ===== Logo + Title ===== */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 border-2 border-teal-400 rotate-45 flex items-center justify-center">
                            <span className="-rotate-45 font-bold text-white">EduMaster</span>
                        </div>
                    </div>

                    <div className="hidden md:block h-8 w-px bg-gray-500" />

                    <p className="text-white text-lg font-medium">
                        Virtual Class <br className="hidden md:block" /> for Zoom
                    </p>
                </div>

                {/* ===== Newsletter ===== */}
                <h3 className="text-xl mb-6 text-gray-200">
                    Subscribe to get our Newsletter
                </h3>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full sm:w-80 px-6 py-3 rounded-full bg-transparent border border-gray-500 outline-none focus:border-teal-400"
                    />
                    <button className="px-10 py-3 rounded-full bg-teal-400 text-white font-medium hover:opacity-90 transition">
                        Subscribe
                    </button>
                </div>

                {/* ===== Links ===== */}
                <div className="flex flex-wrap justify-center gap-6 text-sm mb-6">
                    <a href="#" className="hover:text-white">Careers</a>
                    <span className="opacity-40">|</span>
                    <a href="#" className="hover:text-white">Privacy Policy</a>
                    <span className="opacity-40">|</span>
                    <a href="#" className="hover:text-white">Terms & Conditions</a>
                </div>

                {/* ===== Copyright ===== */}
                <p className="text-sm opacity-60">
                    © 2021 Class Technologies Inc.
                </p>
            </div>
        </footer>
    );
}
