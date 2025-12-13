import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children, allowedRoles = [] }) {
    const { isAuthenticated, role } = useSelector(state => state.auth)

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
        const redirectPath = (role === 'admin' || role === 'super-admin') ? '/admin-home' : '/'
        return <Navigate to={redirectPath} replace />
    }

    return children
}