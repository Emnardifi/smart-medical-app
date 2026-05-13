import { useEffect, useState } from "react"
import api from "../services/api"

function Profile() {

  //  State pour stocker les infos utilisateur récupérées du backend
  const [user, setUser] = useState(null)
  //  States pour modification profil
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  //  States pour mode édition
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  //  States pour mot de passe
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  //  States UI
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  //  Charger le profil au montage du composant
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // appel backend GET /users/me (recupere token+trouve user dans db)
        const res = await api.get("/users/me")

        // reponse stocker dans res, data contient les info
        setUser(res.data)

        // remplir les champs
        setFullName(res.data.full_name || "") //"" si n'existe pas
        setEmail(res.data.email || "")

      } catch (err) {
        setError("Erreur lors du chargement du profil")
      } finally {
        setLoading(false) //apres recuperation de user loading terminer (chargement terminé)
      }
    }

    fetchProfile()
  }, [])

  //  Modifier profil (nom + email)
  const handleUpdateProfile = async () => {
    try {
      //vide les anciens msg d'erreurs et succes
      setError("")
      setSuccess("")

      const res = await api.put("/users/me", {
        //les donnees envoyer au backend
        full_name: fullName,
        email: email,
      })

      setUser(res.data)
      setIsEditingProfile(false)
      setSuccess("Profil modifié avec succès")

    } catch (err) {
      setError(err.response?.data?.detail || "Erreur modification profil") // si aucun type d'err back declencher et il ya erreur front affiche la phrase
    }
  }

  //  Modifier mot de passe
  const handleUpdatePassword = async () => {
    try {
      setError("")
      setSuccess("")
      // vérifier confirmation coté front
      if (newPassword !== confirmPassword) {
        setError("Les mots de passe ne correspondent pas")
        return
      }
      await api.put("/users/me/password", {
        //les donnees envoyer au backend
        current_password: currentPassword,
        new_password: newPassword, //modifier dans back et enreg le nouveau mdp
      })
      // reset champs
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")

      setIsEditingPassword(false)
      setSuccess("Mot de passe modifié")

    } catch (err) {
      setError(err.response?.data?.detail || "Erreur mot de passe")
    }
  }

  //  loading
  if (loading) {
    return <p className="text-center mt-10">Chargement...</p>
  }

  return (
    <div className="flex justify-center mt-10">

      {/* Card principale */}
      <div className="bg-white w-full max-w-2xl p-8 rounded-2xl shadow">

        <h2 className="text-2xl font-bold mb-6">
          Informations personnelles
        </h2>

        {/*  Message erreur */}
        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </p>
        )}

        {/*  Message succès */}
        {success && (
          <p className="bg-green-100 text-green-700 p-3 rounded mb-4">
            {success}
          </p>
        )}

        {/* ========================= */}
        {/* MODE AFFICHAGE */}
        {/* ========================= */}
        {!isEditingProfile && !isEditingPassword && (
          <>
            <div className="space-y-4 mb-6">

              <p><strong>Nom :</strong> {user?.full_name}</p>
              <p><strong>Email :</strong> {user?.email}</p>
              <p><strong>Rôle :</strong> {user?.role || "Utilisateur"}</p> {/*par defaut user*/}

            </div>

            <button
              onClick={() => setIsEditingProfile(true)}
              className="w-full bg-blue-600 text-white py-2 rounded mb-3"
            >
              Modifier le profil
            </button>

            <button
              onClick={() => setIsEditingPassword(true)}
              className="w-full bg-gray-700 text-white py-2 rounded"
            >
              Modifier le mot de passe
            </button>
          </>
        )}

        {/* ========================= */}
        {/* MODE EDIT PROFIL */}
        {/* ========================= */}
        {isEditingProfile && (
          <>
            <div className="space-y-4 mb-6">

              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Nom"
                className="w-full border p-3 rounded"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full border p-3 rounded"
              />
            </div>

            <button
              onClick={handleUpdateProfile}
              className="w-full bg-green-600 text-white py-2 rounded mb-3"
            >
              Enregistrer
            </button>

            <button
              onClick={() => setIsEditingProfile(false)}
              className="w-full bg-gray-700 text-white py-2 rounded"
            >
              Annuler
            </button>
          </>
        )}

        {/* ========================= */}
        {/* MODE EDIT PASSWORD */}
        {/* ========================= */}
        {isEditingPassword && (
          <>
            <div className="space-y-4 mb-6">

              <input
                type="password"
                placeholder="Mot de passe actuel"
                value={currentPassword} //valeur du backend 
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full border p-3 rounded"
              />

              <input
                type="password"
                placeholder="Nouveau mot de passe"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border p-3 rounded"
              />

              <input
                type="password"
                placeholder="Confirmer mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border p-3 rounded"
              />
            </div>

            <button
              onClick={handleUpdatePassword}
              className="w-full bg-green-600 text-white py-2 rounded mb-3"
            >
              Modifier le mot de passe
            </button>

            <button
              onClick={() => setIsEditingPassword(false)}
              className="w-full bg-gray-700 text-white py-2 rounded"
            >
              Annuler
            </button>
          </>
        )}

      </div>
    </div>
  )
}

export default Profile