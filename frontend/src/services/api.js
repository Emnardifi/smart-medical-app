// Import de la bibliothèque Axios pour envoyer des requêtes HTTP vers le backend
import axios from "axios"

// Création d'une instance personnalisée d'Axios
// baseURL = adresse de ton backend FastAPI
// Cela évite de répéter l'URL complète dans chaque requête
const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
})

// Interceptor : fonction qui s'exécute avant chaque requête HTTP
// Elle permet de modifier automatiquement la requête avant envoi
api.interceptors.request.use((config) => {

  // Récupération du token JWT stocké dans le navigateur (localStorage)
  const token = localStorage.getItem("token")

  // Si un token existe (utilisateur connecté)
  if (token) {
    // Ajout du token dans les headers de la requête
    // Format standard : Authorization: Bearer <token>
    config.headers.Authorization = `Bearer ${token}`
  }

  // Retour de la configuration modifiée pour que la requête soit envoyée
  return config
})

// Export de l'instance api pour pouvoir l'utiliser dans tout le projet
export default api