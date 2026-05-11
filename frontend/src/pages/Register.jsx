// Import des hooks React pour gérer les états (inputs, loading, erreurs...)
import { useState } from "react"

// Import pour navigation + lien vers login
import { useNavigate, Link } from "react-router-dom"

// Import de la fonction register qui appelle le backend
import { registerUser } from "../services/authService"

function Register() {

  // Hook pour redirection entre pages
  const navigate = useNavigate()

  // States pour stocker les données du formulaire
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("") 

  // State pour afficher les erreurs
  const [error, setError] = useState("")

  // State pour message de succès
  const [success, setSuccess] = useState("")

  // State pour gérer le loading (bouton)
  const [loading, setLoading] = useState(false)

  // Fonction appelée lors du submit du formulaire
  const handleSubmit = async (e) => {

    // Empêche le rechargement de la page
    e.preventDefault()

    // Reset messages
    setError("")
    setSuccess("")

    // Vérification champs vides
    if (!full_name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs")
      return
    }

    // Vérification mot de passe = confirmation
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      return
    }

    try {
      // Active loading
      setLoading(true) //désactiver le bouton s'inscrire et afficher "Inscription..." au lieu de "S'inscrire"

      // Appel backend pour créer utilisateur
      await registerUser({
        full_name: full_name,     
        email: email,
        password: password,
      })

      // Message succès
      setSuccess("Compte créé avec succès. Redirection vers login...")

      // Redirection après 1.2s
      setTimeout(() => {
        navigate("/login")
      }, 1200)

    } catch (err) {
      // si backend retourne email déjà utilisé ou password invalide 
      setError(
        err.response?.data?.detail || "Erreur lors de la création du compte"
      )

    } finally {
      // Désactive loading
      setLoading(false)
    }
  }

  return (

    // Container principal centré
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      {/* Carte du formulaire */}
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-10">

        {/* Titre */}
        <h1 className="text-4xl font-bold text-center text-slate-900">
          Créer un compte
        </h1>

        {/* Sous-titre */}
        <p className="text-center text-slate-600 mt-4 text-lg">
          Rejoignez Smart Medical aujourd'hui
        </p>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="mt-10 space-y-5">

          {/* Champ nom */}
          <div>
            <label className="block text-slate-800 font-medium mb-2">
              Nom
            </label>
            <input
              type="text"
              placeholder="Votre nom complet"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Champ email */}
          <div>
            <label className="block text-slate-800 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="votre.email@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Champ mot de passe */}
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

          {/* Confirmation mot de passe */}
          <div>
            <label className="block text-slate-800 font-medium mb-2">
              Confirmer mot de passe
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Message erreur */}
          {error && (
            <p className="text-red-600 text-sm text-center">
              {error}
            </p>
          )}

          {/* Message succès */}
          {success && (
            <p className="text-green-600 text-sm text-center">
              {success}
            </p>
          )}

          {/* Bouton inscription */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60"
          >
            {loading ? "Inscription..." : "S'inscrire"}
          </button>
        </form>

        {/* Séparateur */}
        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-px bg-slate-300"></div>
          <span className="text-slate-500">Ou</span>
          <div className="flex-1 h-px bg-slate-300"></div>
        </div>

        {/* Lien login */}
        <p className="text-center text-slate-700 text-lg">
          Vous avez déjà un compte ?{" "}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Se connecter
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Register