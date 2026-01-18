import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import AuthLayout from "./Shared/AuthLayout/AuthLayout";
import NotFound from "./Shared/NotFound/NotFound";
import Login from "./AuthModule/Components/Login/Login";
import Register from "./AuthModule/Components/Register/Register";
import ForgetPassword from "./AuthModule/Components/ForgetPassword/ForgetPassword";
import ResetPassword from "./AuthModule/Components/ResetPassword/ResetPassword";
import VerifyAccount from "./AuthModule/Components/VerifyAccount/VerifyAccount";
import MasterLayout from "./Shared/MasterLayout/MasterLayout";
import Dashboard from "./DashboardMoudule/Dashboard";
import { AuthContextProvider } from "./Context/AuthContext";
import { Bounce, ToastContainer } from "react-toastify";
import ChangePassword from "./AuthModule/Components/ChangePassword/ChangePassword";
import Users from "./UsersModule/Components/Users/Users";
import AllTask from "./TasksModule/Components/Tasks/AllTask";
import AddTask from "./TasksModule/Components/AddTask/AddTask";
import ProtectedRoute from "./Shared/ProtectedRoute/ProtectedRoute";
import Projects from "./ProjectModule/Component/Projects/Projects";
import ProjectData from "./ProjectModule/Component/Projects/ProjectData";
import ChatBot from "./Shared/ChatBot/ChatBot";
import { ThemeContextProvider } from "./Context/DarkModeContext";

function App() {
  let routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: localStorage.getItem("access_token") ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Login />
          ),
        },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "verify-account", element: <VerifyAccount /> },
        { path: "reset-password", element: <ResetPassword /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "change-password", element: <ChangePassword /> },

        {
          path: "users",
          element: (
            <ProtectedRoute allowedRoles={["Manager"]}>
              <Users />
            </ProtectedRoute>
          ),
        },
        { path: "tasks", element: <AllTask /> },
        {
          path: "addtask",
          element: (
            <ProtectedRoute allowedRoles={["Manager"]}>
              <AddTask />
            </ProtectedRoute>
          ),
        },

        {
          path: "addtask/:id",
          element: (
            <ProtectedRoute allowedRoles={["Manager"]}>
              <AddTask />
            </ProtectedRoute>
          ),
        },
        { path: "Projects", element: <Projects /> },
        {
          path: "Project-Data",
          element: (
            <ProtectedRoute allowedRoles={["Manager"]}>
              <ProjectData />
            </ProtectedRoute>
          ),
        },
        {
          path: "Project-Data/:id",
          element: (
            <ProtectedRoute allowedRoles={["Manager"]}>
              <ProjectData />
            </ProtectedRoute>
          ),
        },
        { path: "Chat", element: <ChatBot /> },
      ],
    },
  ]);

  return (
    <>
      <ThemeContextProvider>
        <AuthContextProvider>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />
          <RouterProvider router={routes}></RouterProvider>
        </AuthContextProvider>
      </ThemeContextProvider>
    </>
  );
}

export default App;
