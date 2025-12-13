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
function App() {
  const routes = createBrowserRouter([
    {
      path: '/', element: <MainLayout />, children: [
        { index: true, element: <HomePage /> },
        { path: 'lessons', element: <Lessons /> },
        { path: 'lessons/:id', element: <Lessons /> },
        { path: 'exams', element: <Exams /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'admin-home', element: <AdminHomePage /> },
        { path: 'admin-lessons', element: <LessonsDashboard /> },
        { path: 'admin-questions', element: <QuestionsDashboard /> },
        { path: 'admin-exams', element: <ExamsDashboard /> },
      ]
    },
    { path: '*', element: <NotFound/> }
  ])
  return (
    <>
      <RouterProvider router={routes}>
        <h1>Hello App!</h1>
      </RouterProvider>
    </>
  )
}

export default App
