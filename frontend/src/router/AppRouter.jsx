//  Import des éléments nécessaires de react-router-dom
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
//  Import du Layout ou il y a  (Navbar + contenu)
import Layout from "../components/Layout"

//  Import des pages
import Login from "../pages/Login"
import Register from "../pages/Register"
import Dashboard from "../pages/Dashboard"
import Analyze from "../pages/Analyze"
import History from "../pages/History"
import Profile from "../pages/Profile"

function AppRouter() {
  return (
    //  BrowserRouter permet d'activer le système de routage dans l'application
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Analyze" />} />  {/*on a ajouter une route pour que le serveur yhezna lil login direct */}

        {/* =========================
              Routes publiques
            ========================= */}

        {/*  Page de connexion */}
        <Route path="/Login" element={<Login />} />

        {/*  Page d'inscription */}
        <Route path="/Register" element={<Register />} />


        {/* =========================
             Routes avec Layout
            ========================= */}

        {/*  Dashboard avec Navbar */}
        <Route
          path="/Dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        {/*  Page Analyze avec Navbar */}
        <Route
          path="/Analyze"
          element={
            <Layout>
              <Analyze />
            </Layout>
          }
        />

        {/*  Page History avec Navbar */}
        <Route
          path="/History"
          element={
            <Layout>
              <History />
            </Layout>
          }
        />

        {/*  Page Profile avec Navbar */}
        <Route
          path="/Profile"
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

//  Export du router pour l'utiliser dans App.jsx
export default AppRouter