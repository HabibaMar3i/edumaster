import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/slice/authSlice';
import { clearUser } from '../features/user/slice/userSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function NavbarComponent() {
    const { isAuthenticated } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearUser());
        navigate('/register');
    };

    return (
        <div className="relative">
            <nav className="flex items-center justify-between px-6 md:px-16 py-6 text-white bg-teal-500">
                {/* Logo */}
                <div className="text-2xl font-bold tracking-wide">
                    <Link to="/">EduMaster</Link>
                </div>

                {/* Mobile menu button */}
                <button 
                    className="md:hidden flex flex-col gap-1"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span className="w-6 h-0.5 bg-white"></span>
                    <span className="w-6 h-0.5 bg-white"></span>
                    <span className="w-6 h-0.5 bg-white"></span>
                </button>

                {/* Desktop Links */}
                <ul className="hidden md:flex gap-8 text-sm">
                    <li className="hover:opacity-80 cursor-pointer">
                        <Link to="/">Home</Link>
                    </li>
                    {isAuthenticated && (
                        <>
                            <li className="hover:opacity-80 cursor-pointer">
                                <Link to="/lessons">Lessons</Link>
                            </li>
                            <li className="hover:opacity-80 cursor-pointer">
                                <Link to="/exams">Exams</Link>
                            </li>
                            <li className="hover:opacity-80 cursor-pointer">
                                <Link to="/profile">Profile</Link>
                            </li>
                        </>
                    )}
                    <li className="hover:opacity-80 cursor-pointer">
                        <Link to="/about">About Us</Link>
                    </li>
                </ul>

                {/* Desktop Buttons */}
                <div className="hidden md:flex gap-3">
                    {!isAuthenticated ? (
                        <>
                            <Link to="/login" className="px-6 py-2 rounded-full bg-white text-teal-500 text-sm">
                                Login
                            </Link>
                            <Link to="/register" className="px-6 py-2 rounded-full bg-teal-300 text-white text-sm">
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <button 
                            onClick={handleLogout}
                            className="px-6 py-2 rounded-full bg-red-500 text-white text-sm hover:bg-red-600"
                        >
                            Log Out
                        </button>
                    )}
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-teal-500 md:hidden z-50">
                    <div className="flex flex-col p-6 gap-4">
                        <Link to="/" className="hover:opacity-80" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        {isAuthenticated && (
                            <>
                                <Link to="/lessons" className="hover:opacity-80" onClick={() => setIsMenuOpen(false)}>Lessons</Link>
                                <Link to="/exams" className="hover:opacity-80" onClick={() => setIsMenuOpen(false)}>Exams</Link>
                                <Link to="/profile" className="hover:opacity-80" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                            </>
                        )}
                        <Link to="/about" className="hover:opacity-80" onClick={() => setIsMenuOpen(false)}>About Us</Link>
                        
                        <div className="flex flex-col gap-3 mt-4">
                            {!isAuthenticated ? (
                                <>
                                    <Link to="/login" className="px-6 py-2 rounded-full bg-white text-teal-500 text-sm text-center" onClick={() => setIsMenuOpen(false)}>
                                        Login
                                    </Link>
                                    <Link to="/register" className="px-6 py-2 rounded-full bg-teal-300 text-white text-sm text-center" onClick={() => setIsMenuOpen(false)}>
                                        Sign Up
                                    </Link>
                                </>
                            ) : (
                                <button 
                                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                                    className="px-6 py-2 rounded-full bg-red-500 text-white text-sm hover:bg-red-600"
                                >
                                    Log Out
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
