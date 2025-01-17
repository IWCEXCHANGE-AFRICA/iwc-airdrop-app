import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../utilities/protectedRoute";
import Layout from "../Layout/mainlayout";
import DashboardLayout from "../Layout/dashboard";
import Dashboard from "../Pages/Dashboard/AdminDashboard/dashboard";
import Users from "../Pages/Dashboard/Users/User";
import AddTask from "../Pages/Dashboard/AddTask/Addtask";
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

const Router = () => {
  const defaultUser = {
    type: 4 // Replace with actual user type logic (e.g., from context or state)
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/sign-up" element={<RegisterPage />} />
      <Route path="/sign-up/otp" element={<VerifyOtp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/" element={<LoginPage />} />

      {/* Unauthorized Route */}
      <Route
        element={
          <ProtectedRoute allowedUserTypes={[1, 2, 3, 4]} user={defaultUser} />
        }
      >
        <Route
          path="/unauthorized"
          element={
            <Layout>
              <UnauthorizedPage />
            </Layout>
          }
        />
      </Route>

      {/* Authenticated Routes */}
      <Route
        element={<ProtectedRoute allowedUserTypes={[4]} user={defaultUser} />}
      >
        <Route
          path="/homepage"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
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
          <ProtectedRoute allowedUserTypes={[1, 2, 4]} user={defaultUser} />
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
          path="/Addtask"
          element={
            <DashboardLayout>
              <AddTask /> {/* Fixed casing */}
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
