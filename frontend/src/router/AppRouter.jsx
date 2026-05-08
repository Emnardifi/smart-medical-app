import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Layout from "../components/Layout"

import Login from "../pages/Login"
import Register from "../pages/Register"
import Dashboard from "../pages/Dashboard"
import Analyze from "../pages/Analyze"
import History from "../pages/History"
import Profile from "../pages/Profile"

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirection page principale */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Routes publiques */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

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
          path="/history"
          element={
            <Layout>
              <History />
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
    </BrowserRouter>
  )
}

export default AppRouter