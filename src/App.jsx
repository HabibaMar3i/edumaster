import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import MainLayout from './layouts/MainLayout';
import Lessons from './pages/Lessons';
import Exams from './pages/Exams';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminHomePage from './pages/admin/AdminHomePage';
import LessonsDashboard from './pages/admin/LessonsDashboard';
import QuestionsDashboard from './pages/admin/QuestionsDashboard';
import ExamsDashboard from './pages/admin/ExamsDashboard';
import NotFound from './pages/NotFound';
import { ToastContainer, toast } from 'react-toastify';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
function App() {
  const notify = () => toast("Wow so easy!");
  const routes = createBrowserRouter([
    {
      path: '/', element: <ProtectedRoute><MainLayout /></ProtectedRoute>, children: [
        { index: true, element: <HomePage /> },
        { path: 'lessons', element: <Lessons /> },
        { path: 'lessons/:id', element: <Lessons /> },
        { path: 'exams', element: <Exams /> },
        { path: 'admin-home', element: <ProtectedRoute allowedRoles={['admin']}><AdminHomePage /></ProtectedRoute> },
        { path: 'admin-lessons', element: <ProtectedRoute allowedRoles={['admin']}><LessonsDashboard /></ProtectedRoute> },
        { path: 'admin-questions', element: <ProtectedRoute allowedRoles={['admin']}><QuestionsDashboard /></ProtectedRoute> },
        { path: 'admin-exams', element: <ProtectedRoute allowedRoles={['admin']}><ExamsDashboard /></ProtectedRoute> },
      ]
    },
    { path: '/login', element: <PublicRoute><Login /></PublicRoute> },
    { path: '/register', element: <PublicRoute><Register /></PublicRoute> },
    { path: '*', element: <NotFound/> }
  ])
  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  )
}

export default App
