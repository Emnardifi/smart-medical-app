import { Routes, Route } from "react-router-dom"

import Layout from "../components/layout/Layout";

import Login from "../pages/Login"
import Register from "../pages/Register"
import Dashboard from "../pages/Dashboard"
import Analyze from "../pages/Analyze"
import Report from "../pages/Report"
import Profile from "../pages/Profile"
import Home from "../pages/Home"

import ForgotPassword from "../pages/ForgotPassword"
import ResetPassword from "../pages/ResetPassword"

function AppRouter() {
  return (
    <Routes>

      {/* Redirection page principale */}
      <Route path="/" element={<Home />} />

      {/* Routes publiques */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Routes avec Layout */}
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />

      <Route
        path="/analyze"
        element={
          <Layout>
            <Analyze />
          </Layout>
        }
      />

      <Route
        path="/report"
        element={
          <Layout>
            <Report />
          </Layout>
        }
      />

      <Route
        path="/profile"
        element={
          <Layout>
            <Profile />
          </Layout>
        }
      />

    </Routes>
  )
}

export default AppRouter