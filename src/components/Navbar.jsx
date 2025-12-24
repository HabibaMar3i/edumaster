import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from "@heroui/react";
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
        <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} className="text-[22px] font-normal">
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Link to="/" className="font-bold text-inherit">
                        EduMaster
                    </Link>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-[80px]" justify="end">
                {isAuthenticated && (
                    <>
                        <NavbarItem>
                            <Link to="/" className="text-foreground">
                                Home
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link to="/about" className="text-foreground">
                                About Us
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link to="/lessons" className="text-foreground">
                                Lessons
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link to="/exams" className="text-foreground">
                                Exams
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link to="/profile" className="text-foreground">
                                Profile
                            </Link>
                        </NavbarItem>
                    </>
                )}
                
                {!isAuthenticated ? (
                    <>
                        <NavbarItem>
                            <Link to="/about" className="text-foreground">
                                About Us
                            </Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link to="/login">Login</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Link to="/register">
                                <Button color="primary" variant="flat">
                                    Register
                                </Button>
                            </Link>
                        </NavbarItem>
                    </>
                ) : (
                    <NavbarItem>
                        <Button color="danger" onClick={handleLogout} variant="flat">
                            Log Out
                        </Button>
                    </NavbarItem>
                )}
            </NavbarContent>

            <NavbarMenu>
                {isAuthenticated && (
                    <>
                        <NavbarMenuItem onClick={() => setIsMenuOpen(false)}>
                            <Link to="/" className="w-full" size="lg">
                                Home
                            </Link>
                        </NavbarMenuItem>
                        <NavbarMenuItem onClick={() => setIsMenuOpen(false)}>
                            <Link to="/about" className="w-full" size="lg">
                                About Us
                            </Link>
                        </NavbarMenuItem>
                        <NavbarMenuItem onClick={() => setIsMenuOpen(false)}>
                            <Link to="/lessons" className="w-full" size="lg">
                                Lessons
                            </Link>
                        </NavbarMenuItem>
                        <NavbarMenuItem onClick={() => setIsMenuOpen(false)}>
                            <Link to="/exams" className="w-full" size="lg">
                                Exams
                            </Link>
                        </NavbarMenuItem>
                        <NavbarMenuItem onClick={() => setIsMenuOpen(false)}>
                            <Link to="/profile" className="w-full" size="lg">
                                Profile
                            </Link>
                        </NavbarMenuItem>
                    </>
                )}
                
                {!isAuthenticated ? (
                    <>
                        <NavbarMenuItem onClick={() => setIsMenuOpen(false)}>
                            <Link to="/about" className="w-full" size="lg">
                                About Us
                            </Link>
                        </NavbarMenuItem>
                        <NavbarMenuItem onClick={() => setIsMenuOpen(false)}>
                            <Link to="/login" className="w-full" size="lg">
                                Login
                            </Link>
                        </NavbarMenuItem>
                        <NavbarMenuItem onClick={() => setIsMenuOpen(false)}>
                            <Link to="/register" className="w-full" size="lg">
                                Register
                            </Link>
                        </NavbarMenuItem>
                    </>
                ) : (
                    <NavbarMenuItem>
                        <Button color="danger" onClick={() => { handleLogout(); setIsMenuOpen(false); }} variant="flat" className="w-full">
                            Log Out
                        </Button>
                    </NavbarMenuItem>
                )}
            </NavbarMenu>
        </Navbar>
    )
}
