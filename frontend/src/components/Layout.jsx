import Sidebar from "./sidebar" // importer le composant Sidebar

function Layout({ children }) {
  // children représente le contenu de la page (Profile, Dashboard, etc.)

  return (
    // container principal (sidebar + contenu)
    <div className="flex min-h-screen">

      {/* sidebar à gauche */}
      <Sidebar />

      {/* contenu principal à droite */}
      <main className="flex-1 bg-gray-100 p-6">
        {children} {/* affichage de la page */}
      </main>

    </div>
  )
}

export default Layout