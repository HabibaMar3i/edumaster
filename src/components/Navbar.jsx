import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/slice/authSlice';
import { clearUser } from '../features/user/slice/userSlice';
import { useNavigate } from 'react-router-dom';

export default function NavbarComponent() {
    const { isAuthenticated } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearUser());
        navigate('/register');
    };

    return (
        <nav className="flex items-center justify-between px-6 md:px-16 py-6 text-white bg-teal-500">
            {/* Logo */}
            <div className="text-2xl font-bold tracking-wide">
                <Link to="/">EduMaster</Link>
            </div>

            {/* Links */}
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

            {/* Buttons */}
            <div className="flex gap-3">
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
    );
}
