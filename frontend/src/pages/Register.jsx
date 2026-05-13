// Import des hooks React pour gérer les états
import { useState } from "react"

// Import pour navigation + lien vers login
import { useNavigate, Link } from "react-router-dom"

// Import de la fonction register qui appelle le backend
import { registerUser } from "../services/authService"

// Import des composants réutilisables
import Input from "../components/common/Input"
import Button from "../components/common/Button"
import Card from "../components/common/Card"
import Loading from "../components/common/Loading"

function Register() {

  // Hook pour redirection entre pages
  const navigate = useNavigate()

  // States pour stocker les données du formulaire
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [adminCode, setAdminCode] = useState("")

  // State pour afficher les erreurs
  const [error, setError] = useState("")

  // State pour message de succès
  const [success, setSuccess] = useState("")

  // State pour gérer le loading
  const [loading, setLoading] = useState(false)

  // Fonction appelée lors du submit du formulaire
  const handleSubmit = async (e) => {

    // Empêche le rechargement de la page
    e.preventDefault()

    // Reset messages
    setError("")
    setSuccess("")

    // Vérification champs vides
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
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
      setLoading(true)

      // Appel backend pour créer utilisateur
      await registerUser({
        full_name: name,
        email: email,
        password: password,
        admin_code: adminCode,
      })

      // Message succès
      setSuccess("Compte créé avec succès. Redirection vers login...")

      // Redirection après 1.2 secondes
      setTimeout(() => {
        navigate("/login")
      }, 1200)

    } catch (err) {

      // Si backend retourne une erreur
      setError(
        err.response?.data?.detail ||
        "Erreur lors de la création du compte"
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
      <Card className="w-full max-w-xl rounded-2xl shadow-xl p-10">

        {/* Titre */}
        <h1 className="text-4xl font-bold text-center text-slate-900">
          Créer un compte
        </h1>

        {/* Sous-titre */}
        <p className="text-center text-slate-600 mt-4 text-lg">
          Rejoignez Smart Medical aujourd'hui
        </p>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="mt-10">

          {/* Champ nom */}
          <Input
            label="Nom"
            name="name"
            type="text"
            placeholder="Votre nom complet"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Champ email */}
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="votre.email@exemple.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Champ mot de passe */}
          <Input
            label="Mot de passe"
            name="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Champ confirmation mot de passe */}
          <Input
            label="Confirmer mot de passe"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {/* Champ code admin optionnel */}
         <Input
           label="Code admin optionnel"
           name="adminCode"
           type="text"
           placeholder="Laissez vide si vous êtes utilisateur"
           value={adminCode}
           onChange={(e) => setAdminCode(e.target.value)}
          />

          {/* Texte explicatif */}
          <p className="text-slate-500 text-sm mb-4">
            Laissez vide pour créer un compte utilisateur normal.
          </p>

          {/* Message erreur */}
          {error && (
            <p className="text-red-600 text-sm text-center mb-4">
              {error}
            </p>
          )}

          {/* Message succès */}
          {success && (
            <p className="text-green-600 text-sm text-center mb-4">
              {success}
            </p>
          )}

          {/* Animation loading */}
          {loading && <Loading />}

          {/* Bouton inscription */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold"
          >
            {loading ? "Inscription..." : "S'inscrire"}
          </Button>

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
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Se connecter
          </Link>
        </p>

      </Card>
    </div>
  )
}

export default Register