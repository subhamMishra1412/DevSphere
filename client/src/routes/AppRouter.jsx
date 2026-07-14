import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";

import DashboardPage from "@/pages/dashboard/DashboardPage";

import CreateProjectPage from "@/pages/projects/CreateProjectPage";
import EditProjectPage from "@/pages/projects/EditProjectPage";
import ProjectDetailsPage from "@/pages/projects/ProjectDetailsPage";

import NotFoundPage from "@/pages/errors/NotFoundPage";

function AppRouter() {
  return (
    <Routes>

      {/* Public Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Protected Routes */}
      <Route
    element={
        <ProtectedRoute>
            <DashboardLayout />
        </ProtectedRoute>
        }
        >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/projects/new" element={<CreateProjectPage />} />
        <Route path="/projects/:id" element={<ProjectDetailsPage />} />
        <Route path="/projects/:id/edit" element={<EditProjectPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />

    </Routes>
  );
}

export default AppRouter;