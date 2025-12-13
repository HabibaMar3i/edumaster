import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'

export default function AdminLayout() {
    return (
        <div>
            <AdminSidebar/>
            <Outlet />
        </div>
    )
}
