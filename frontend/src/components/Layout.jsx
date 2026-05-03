//  Import du composant Navbar
import Navbar from "./Navbar/Navbar"

function Layout({ children }) {
  return (
    <div>
      {/*  La barre de navigation s'affiche en haut */}
      <Navbar />

      {/*  Zone principale qui affiche le contenu de la page actuelle */}
      {/* children représente la page qu'on veut afficher */}
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

//  Export du composant Layout pour l'utiliser dans le Router
export default Layout