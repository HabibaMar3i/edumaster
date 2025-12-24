import HomePage from '../pages/HomePage/HomePage'
import AdminHomePage from '../pages/admin/AdminHomePage'

export default function RoleBasedRedirect() {
    const role = localStorage.getItem('role')
    
    if (role === 'admin' || role === 'super-admin') {
        return <AdminHomePage />
    }
    
    return <HomePage />
}