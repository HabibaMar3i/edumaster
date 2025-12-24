import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MainLayout from "./layouts/MainLayout";
import Lessons from "./pages/Lessons";
import Exams from "./pages/Exams";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminHomePage from "./pages/admin/AdminHomePage";
import LessonsDashboard from "./pages/admin/LessonsDashboard/LessonsDashboard";
import QuestionsDashboard from "./pages/admin/QuestionsDashboard/QuestionsDashboard";
import ExamsDashboard from "./pages/admin/ExamsDashboard/ExamsDashboard";
import CreateExam from "./pages/admin/ExamsDashboard/CreateExam";
import EditExam from "./pages/admin/ExamsDashboard/EditExam";

import HomePage from "./pages/HomePage/HomePage";


import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import RoleBasedRedirect from "./components/RoleBasedRedirect";
import AddQuestions from "./pages/admin/QuestionsDashboard/AddQuestions";
import ProfileDetail from "./pages/admin/profile/profileDetail.jsx";
import EditProfile from "./pages/admin/profile/editProfile.jsx";
import ResetPassword from "./pages/admin/profile/resetPassword.jsx";
import About from "./pages/About";
function App() {
  const routes = createBrowserRouter([
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <RoleBasedRedirect /> },
        { path: "lessons", element: <Lessons /> },
        { path: "lessons/:id", element: <Lessons /> },
        { path: "exams", element: <Exams /> },
        {
          path: "admin-home",
          element: (
            <ProtectedRoute allowedRoles={["admin", "super-admin"]}>
              <AdminHomePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "admin-lessons",
          element: (
            <ProtectedRoute allowedRoles={["admin", "super-admin"]}>
              <LessonsDashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "admin-questions",
          element: (
            <ProtectedRoute allowedRoles={["admin", "super-admin"]}>
              <QuestionsDashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "admin-questions/add/:idExam",
          element: (
            <ProtectedRoute allowedRoles={["admin", "super-admin"]}>
              <AddQuestions />
            </ProtectedRoute>
          ),
        },
        {
          path: "admin-exams",
          element: (
            <ProtectedRoute allowedRoles={["admin", "super-admin"]}>
              <ExamsDashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "create-exam",
          element: (
            <ProtectedRoute allowedRoles={["admin", "super-admin"]}>
              <CreateExam />
            </ProtectedRoute>
          ),
        },
        {
          path: "edit-exam/:id",
          element: (
            <ProtectedRoute allowedRoles={["admin", "super-admin", "user"]}>
              <EditExam />
            </ProtectedRoute>
          ),
        },
        {
          path: "profile",
          children: [
            {
              index: true,
              element: (
                <ProtectedRoute allowedRoles={["admin", "super-admin", "user"]}>
                  <ProfileDetail />
                </ProtectedRoute>
              ),
            },
            {
              path: "editUser/:userId",
              element: (
                <ProtectedRoute allowedRoles={["admin", "super-admin", "user"]}>
                  <EditProfile />
                </ProtectedRoute>
              ),
            },
            {
              path: "resetPassword",
              element: (
                <ProtectedRoute allowedRoles={["admin", "super-admin", "user"]}>
                  <ResetPassword />
                </ProtectedRoute>
              ),
            },
          ],
        },
        { path: "/about", element: <ProtectedRoute><About /></ProtectedRoute> },

      ],
    },
    {
      path: "/login",
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: "/register",
      element: (
        <PublicRoute>
          <Register />
        </PublicRoute>
      ),
    },
    { path: "*", element: <NotFound /> },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
}

export default App;
