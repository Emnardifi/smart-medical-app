// Import des hooks React pour gérer l'état (state)
import { useState } from "react"

// Import pour la navigation entre les pages + lien vers register
import { useNavigate, Link } from "react-router-dom"

// Import de la fonction login depuis le service (API)
import { loginUser } from "../services/authService"

function Login() {

  // State pour stocker l'email saisi par l'utilisateur
  const [email, setEmail] = useState("")

  // State pour stocker le mot de passe 
  const [password, setPassword] = useState("")

  // State pour afficher les messages d'erreur
  const [error, setError] = useState("")

  // State pour gérer le loading (bouton "Connexion...")
  const [loading, setLoading] = useState(false)

  // Hook pour rediriger vers une autre page
  const navigate = useNavigate()

  // Fonction exécutée quand on soumet le formulaire
  const handleSubmit = async (e) => {

    // Empêche le rechargement de la page
    e.preventDefault()

    // Réinitialise les erreurs
    setError("")

    // Vérifie si les champs sont vides
    if (!email || !password) {
      setError("Veuillez remplir tous les champs")
      return
    }

    try {
      // Active le loading (désactive le bouton)
      setLoading(true)

      // Appel au backend via authService
      const res = await loginUser(email, password)

      // Stockage du token dans localStorage (authentification)
      localStorage.setItem("token", res.data.access_token)

      // Redirection vers le dashboard après login réussi
      navigate("/dashboard")

    } catch (err) {
      // Si erreur (email ou mot de passe incorrect)
      setError("Email ou mot de passe incorrect")

    } finally {
      // Désactive le loading dans tous les cas
      setLoading(false)
    }
  }

  return (
    // Container principal centré verticalement et horizontalement
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      {/* Carte contenant le formulaire */}
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-10">

        {/* Titre */}
        <h1 className="text-4xl font-bold text-center text-slate-900">
          Connexion
        </h1>

        {/* Sous-titre */}
        <p className="text-center text-slate-600 mt-4 text-lg">
          Accédez à votre compte Smart Medical
        </p>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="mt-10 space-y-6">

          {/* Champ Email */}
          <div>
            <label className="block text-slate-800 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="votre.email@exemple.com"
              value={email} // lié au state
              onChange={(e) => setEmail(e.target.value)} // mise à jour du state
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Champ Mot de passe */}
          <div>
            <label className="block text-slate-800 font-medium mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Affichage erreur si موجودة */}
          {error && (
            <p className="text-red-600 text-sm text-center">
              {error}
            </p>
          )}

          {/* Bouton login */}
          <button
            type="submit"
            disabled={loading} // désactivé pendant loading
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60"
          >
            {/* Texte dynamique */}
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        {/* Séparateur visuel */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-slate-300"></div>
          <span className="text-slate-500">Ou</span>
          <div className="flex-1 h-px bg-slate-300"></div>
        </div>

        {/* Lien vers Register */}
        <p className="text-center text-slate-700 text-lg">
          Vous n'avez pas de compte ?{" "}
          <Link 
            to="/register" 
            className="text-blue-600 font-medium hover:underline"
          >
            Créer un compte
          </Link>
        </p>

      </div>
    </div>
  )
}

// Export du composant
export default Login