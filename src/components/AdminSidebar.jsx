import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { Button, Card, CardBody, Divider } from '@heroui/react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: 'fas fa-home' },
  { name: 'Admin Lessons', href: '/admin-lessons', icon: 'fas fa-chalkboard-teacher' },
  { name: 'Admin Questions', href: '/admin-questions', icon: 'fas fa-question-circle' },
  { name: 'Admin Exams', href: '/admin-exams', icon: 'fas fa-clipboard-list' },
]

export default function AdminSidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <Card className="w-64 min-h-screen rounded-none" style={{backgroundColor: '#49BBBD'}}>
      <CardBody className="p-0 flex flex-col h-full">
        <div className="p-6 flex-1">
          <h2 className="text-xl font-bold mb-6 text-white">EduMaster Admin</h2>
          <nav className="space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center p-3 rounded-lg transition-colors block ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <i className={`${item.icon} mr-3`}></i>
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
        <Divider className="bg-white/20" />
        <div className="p-6">
          <Button
            onClick={handleLogout}
            color="danger"
            variant="flat"
            className="w-full"
            startContent={<i className="fas fa-sign-out-alt"></i>}
          >
            Logout
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}
