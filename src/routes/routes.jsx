import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../utilities/protectedRoute";
import Layout from "../Layout/UserLayout";
import DashboardLayout from "../Layout/AdminLayout";
import {
  HomePage,
  TaskPage,
  ReferralPage,
  RegisterPage,
  LoginPage,
  UnauthorizedPage,
  ForgotPassword,
  VerifyOtp,
  ResetPassword
} from "../Pages/Public";
import {
  Dashboard,
  Users,
  Tasks,
  AddTasks,
  Settings,
  TaskEditForm
} from "../Pages/Dashboard";

const Router = () => {
  const defaultUser = {
    type: 4 // Replace with actual user type logic (e.g., from context or state)
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/sign-up" element={<RegisterPage />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* formerly default index Pages */}
      <Route path="/sign-in" element={<LoginPage />} />

      {/* formerly default index Pages */}
      <Route path="/" element={<HomePage />} />

      {/* Formerly authorized Route */}
      <Route
        path="/homepage"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />

      {/* Unauthorized Route */}

      <Route
        path="/unauthorized"
        element={
          <Layout>
            <UnauthorizedPage />
          </Layout>
        }
      />

      {/* Authenticated Routes */}
      <Route
        element={<ProtectedRoute allowedUserTypes={[4]} user={defaultUser} />}
      >
        <Route
          path="/task"
          element={
            <Layout>
              <TaskPage />
            </Layout>
          }
        />
        <Route
          path="/friends-reward"
          element={
            <Layout>
              <ReferralPage />
            </Layout>
          }
        />
      </Route>

      {/* Admin Dashboard Routes */}
      <Route
        element={
          <ProtectedRoute allowedUserTypes={[1, 2]} user={defaultUser} />
        }
      >
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/users"
          element={
            <DashboardLayout>
              <Users />
            </DashboardLayout>
          }
        />
        <Route
          path="/tasks"
          element={
            <DashboardLayout>
              <Tasks /> {/* Fixed casing */}
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/tasks/add"
          element={
            <DashboardLayout>
              <AddTasks /> {/* Fixed casing */}
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/tasks/edit"
          element={
            <DashboardLayout>
              <TaskEditForm /> {/* Fixed casing */}
            </DashboardLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <DashboardLayout>
              <Settings /> {/* Fixed casing */}
            </DashboardLayout>
          }
        />
      </Route>

      {/* Catch-All Route */}
      <Route
        path="*"
        element={
          <Layout>
            <UnauthorizedPage />
          </Layout>
        }
      />
    </Routes>
  );
};

export default Router;
