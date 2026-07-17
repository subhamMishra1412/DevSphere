import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import AuthLayout from "@/layouts/AuthLayout";
import DashboardLayout from "@/layouts/DashboardLayout";

import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";

import DashboardPage from "@/pages/dashboard/DashboardPage";

import ProjectsPage from "@/pages/projects/ProjectsPage";
import CreateProjectPage from "@/pages/projects/CreateProjectPage";
import ProjectDetailsPage from "@/pages/projects/ProjectDetailsPage";
import EditProjectPage from "@/pages/projects/EditProjectPage";

import NotFoundPage from "@/pages/errors/NotFoundPage";
import SettingPage from "@/pages/settings/SettingPage";

function AppRouter() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Protected Routes (Everything inside here gets the Dashboard Layout) */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/new" element={<CreateProjectPage />} />
        <Route path="/projects/:id" element={<ProjectDetailsPage />} />
        <Route path="/projects/:id/edit" element={<EditProjectPage />} />
        
        {/* Settings route successfully moved INSIDE the dashboard layout! */}
        <Route path="/settings" element={<SettingPage />} />
      </Route>

      {/* Catch-all 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;