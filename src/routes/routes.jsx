import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from '../utilities/protectedRoute'
import Layout from '../Layout/mainlayout'
import DashboardLayout from '../Layout/dashboard'
import HomePage from '../Pages/HomePage/HomePage'
import TaskPage from '../Pages/Task/TaskPage'
import FriendsReward from '../Pages/FriendsReward/FrienddsReward'
import OTPPage from '../Pages/authentication/Otp/OtpPage'
import ForgotPasswordPage from '../Pages/authentication/ForgotPasword/ForgotapasswordPage'
import ResetPasswordPage from '../Pages/authentication/ResetPasswordPage/ResetPasswordPage'
import LoginPage from '../Pages/authentication/login/Login'
import SignUpPage from '../Pages/authentication/signup/SignUp'
import UnauthorizedPage from '../Pages/Unauthorized'
import Dashboard from '../Pages/Dashboard/AdminDashboard/dashboard'
import Users from '../Pages/Dashboard/Users/User'
import AddTask from '../Pages/Dashboard/AddTask/Addtask'

const Router = () => {
  const currentUser = {
    type: 4 // Replace with actual user type logic (e.g., from context or state)
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/sign-up' element={<SignUpPage />} />
      <Route path='/sign-up/otp' element={<OTPPage />} />
      <Route path='/forgot-password' element={<ForgotPasswordPage />} />
      <Route path='/reset-password' element={<ResetPasswordPage />} />
      <Route path='/' element={<LoginPage />} />

      {/* Unauthorized Route */}
      <Route
        element={
          <ProtectedRoute allowedUserTypes={[1, 2, 3, 4]} user={currentUser} />
        }
      >
        <Route
          path='/unauthorized'
          element={
            <Layout>
              <UnauthorizedPage />
            </Layout>
          }
        />
      </Route>

      {/* Authenticated Routes */}
      <Route
        element={<ProtectedRoute allowedUserTypes={[4]} user={currentUser} />}
      >
        <Route
          path='/homepage'
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          path='/task'
          element={
            <Layout>
              <TaskPage />
            </Layout>
          }
        />
        <Route
          path='/friends-reward'
          element={
            <Layout>
              <FriendsReward />
            </Layout>
          }
        />
      </Route>

      {/* Admin Dashboard Routes */}
      <Route
        element={
          <ProtectedRoute allowedUserTypes={[1, 2, 4]} user={currentUser} />
        }
      >
        <Route
          path='/dashboard'
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path='/users'
          element={
            <DashboardLayout>
              <Users />
            </DashboardLayout>
          }
        />
        <Route
          path='/Addtask'
          element={
            <DashboardLayout>
              <AddTask /> {/* Fixed casing */}
            </DashboardLayout>
          }
        />
      </Route>

      {/* Catch-All Route */}
      <Route
        path='*'
        element={
          <Layout>
            <UnauthorizedPage />
          </Layout>
        }
      />
    </Routes>
  )
}

export default Router
