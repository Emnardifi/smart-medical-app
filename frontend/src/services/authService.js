// Import de l'instance Axios configurée (api.js)
// Elle contient déjà le baseURL + interceptor (token)
import api from "./api"

// Fonction pour connecter un utilisateur
// Elle prend email et password en paramètres
export const loginUser = (email, password) => {

  // Création d’un objet form-data (format requis par FastAPI avec OAuth2PasswordRequestForm)
  const formData = new URLSearchParams()

  // On ajoute l'email dans "username" (car le backend attend username, pas email)
  formData.append("username", email)

  // On ajoute le mot de passe
  formData.append("password", password)

  // Envoi de la requête POST vers /auth/login
  return api.post("/auth/login", formData, {

    // Header obligatoire pour indiquer qu'on envoie du form-data
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
}
// Fonction pour créer un nouvel utilisateur (register)
export const registerUser = (data) => {

  // Envoie une requête POST vers le backend sur /auth/register
  // "data" contient les informations de l'utilisateur :
  // ex: { full_name, email, password }
  return api.post("/auth/register", data)
}