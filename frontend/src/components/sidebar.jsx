import { useNavigate } from "react-router-dom"

function Sidebar() {

  //  Hook pour naviguer entre les pages
  const navigate = useNavigate()

  //  Fonction logout
  const handleLogout = () => {
    // supprimer le token (déconnexion)
    localStorage.removeItem("token")

    // redirection vers login
    navigate("/login")
  }

  return (

    //  Container principal du sidebar
    <aside className="w-72 bg-blue-700 text-white min-h-screen flex flex-col">

      {/*  Header du sidebar (logo + titre) */}
      <div className="p-6 border-b border-blue-500">
        <h1 className="text-3xl font-bold">Smart Medical</h1>
        <p>Détection de pneumonie</p>
      </div>

      {/*  Menu de navigation */}
      <nav className="flex-1 p-4 space-y-4">

        {/* bouton dashboard */}
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full text-left px-4 py-2 rounded hover:bg-white hover:text-blue-700"
        >
          📊 Tableau de bord
        </button>

        {/* bouton analyse */}
        <button
          onClick={() => navigate("/analyze")}
          className="w-full text-left px-4 py-2 rounded hover:bg-white hover:text-blue-700"
        >
          🔬 Analyser
        </button>

        {/* bouton historique */}
        <button
          onClick={() => navigate("/history")}
          className="w-full text-left px-4 py-2 rounded hover:bg-white hover:text-blue-700"
        >
          📜 Historique
        </button>

        {/* bouton profil */}
        <button
          onClick={() => navigate("/profile")}
          className="w-full text-left px-4 py-2 rounded hover:bg-white hover:text-blue-700"
        >
          👤 Profil
        </button>

      </nav>

      {/*  Footer du sidebar (logout) */}
      <div className="p-4">

        <button
          onClick={handleLogout} // appel fonction logout
          className="w-full bg-red-600 hover:bg-red-700 py-2 rounded font-bold"
        >
          Se déconnecter
        </button>

      </div>

    </aside>
  )
}

export default Sidebar