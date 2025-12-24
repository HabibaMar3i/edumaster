export default function     Navbar() {
    return (
        <nav className="flex items-center justify-between px-6 md:px-16 py-6 text-white">
            {/* Logo */}
            <div className="text-2xl font-bold tracking-wide">
                EduMaster
            </div>

            {/* Links */}
            <ul className="hidden md:flex gap-8 text-sm">
                <li className="hover:opacity-80 cursor-pointer">Home</li>
                <li className="hover:opacity-80 cursor-pointer">Courses</li>
                <li className="hover:opacity-80 cursor-pointer">About Us</li>
            </ul>

            {/* Buttons */}
            <div className="flex gap-3">
                <button className="px-6 py-2 rounded-full bg-white text-teal-500 text-sm">
                    Login
                </button>
                <button className="px-6 py-2 rounded-full bg-teal-300 text-white text-sm">
                    Sign Up
                </button>
            </div>
        </nav>
    );
}
