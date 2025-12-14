import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from "@heroui/react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function NavbarComponent() {
    const { isAuthenticated } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/register');
    };

    return (
        <Navbar className="text-[22px] font-normal">
            <NavbarBrand>
                <Link to="/" className="font-bold text-inherit">
                    EduMaster
                </Link>
            </NavbarBrand>
            
            <NavbarContent justify="end" className="gap-[80px]">
                {isAuthenticated && (
                    <>
                        <NavbarItem>
                            <Link to="/" className="text-foreground">
                                Home
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
                    </>
                )}
                
                {!isAuthenticated ? (
                    <>
                        <NavbarItem className="hidden lg:flex">
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
        </Navbar>
    )
}
