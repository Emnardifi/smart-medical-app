// Import de la bibliothèque axios
import axios from "axios";

// Création d'une instance Axios personnalisée
// On crée "api" pour éviter de répéter la même configuration partout
const api = axios.create({
  
  // baseURL = l'URL de base de ton backend
  // Toutes les requêtes utiliseront automatiquement cette adresse
  // Exemple : api.get("/auth/login") → http://127.0.0.1:8000/auth/login
  baseURL: "http://127.0.0.1:8000",
});

// Export de cette instance
// Cela permet de l'utiliser dans n'importe quel fichier du projet
// Exemple : import api from "../services/api";
export default api;


//configuration globale :api.js = point central pour communiquer avec ton backend