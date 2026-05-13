// Import de l'instance Axios configurée (api.js)
// Elle contient déjà le baseURL + interceptor (token)
import api from "./api"

// Fonction pour connecter un utilisateur
// Elle prend email et password en paramètres
export const loginUser =async (email, password) => {

  // Création d’un objet form-data (format requis par FastAPI avec OAuth2PasswordRequestForm)
  const formData = new URLSearchParams()

  // On ajoute l'email dans "username" (car le backend attend username, pas email)
  formData.append("username", email)

  // On ajoute le mot de passe
  formData.append("password", password)

  // Envoi de la requête POST vers /auth/login
  const response = await api.post("/auth/login", formData, {

    // Header obligatoire pour indiquer qu'on envoie du form-data
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
  return  response.data
}
// Fonction pour créer un nouvel utilisateur (register)
export const registerUser = async(data) => {

  // Envoie une requête POST vers le backend sur /auth/register
  // "data" contient les informations de l'utilisateur :
  // ex: { full_name, email, password }
  const respponse = await api.post("/auth/register", data)
  return respponse.data
}


export const getCurrentUser = async () => {
  const response = await api.get("/auth/me")
  return response.data
}
export const logoutUser = async () => {
  await api.post("/auth/logout")
  localStorage.removeItem("token")
}

export const forgotPassword = async (email) => {
  const response = await api.post("/auth/forgot-password", { email })
  return response.data
}

export const resetPassword = async (token, new_password) => {
  const response = await api.post("/auth/reset-password", {
    token,
    new_password,
  })

  return response.data
}
