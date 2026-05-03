// Import du composant Link pour naviguer entre les pages (sans recharger)
import { Link } from "react-router-dom"

// Import du fichier CSS pour le style
import "./Navbar.css"

function Navbar() {

  // Navbar = barre de navigation affichée en haut de l'application
  return (
    <nav className="navbar">

      {/*  Logo ou nom de l'application */}
      <h2 className="navbar-logo">MedApp</h2>

      {/*  Conteneur des liens de navigation */}
      <div className="navbar-links">

        {/*  Chaque Link permet d'accéder à une page spécifique */}
        {/* "to" = chemin de la route */}

        <Link to="/dashboard" className="navbar-link">
          Dashboard
        </Link>

        <Link to="/analyze" className="navbar-link">
          Analyze
        </Link>

        <Link to="/history" className="navbar-link">
          History
        </Link>

        <Link to="/profile" className="navbar-link">
          Profile
        </Link>

      </div>

      {/*  Bouton de déconnexion (pour l’instant sans logique backend) */}
      <button className="navbar-button">
        Logout
      </button>

    </nav>
  )
}

//  Export du composant pour pouvoir l'utiliser dans Layout ou d'autres pages
export default Navbar

{/*Link → navigation entre pages
 className → relie JSX avec CSS
 Navbar.css → contient le design
 Navbar → sera affichée via Layout*/}