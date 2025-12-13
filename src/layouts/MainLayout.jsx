import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AdminSidebar from '../components/AdminSidebar'

export default function MainLayout() {
    const role = localStorage.getItem('role')
    
    if (role === 'admin') {
        return (
            <div className="flex">
                <AdminSidebar />
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
        )
    }
    
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    )
}
