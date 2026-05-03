// Import du hook useEffect depuis React
// useEffect permet d'exécuter du code automatiquement après le rendu du composant
import { useEffect } from "react";

// Import de l'instance Axios que tu as créée (api.js)
// Elle contient déjà l'URL de ton backend
import api from "../services/api";

// Définition du composant Test
function Test() {

  // useEffect s'exécute automatiquement quand le composant est affiché
  useEffect(() => {

    // Envoi d'une requête GET vers ton backend
    // "/test-bd" sera combiné avec baseURL → http://127.0.0.1:8000/test-bd
    api.get("/test-bd")

      // Si la requête réussit (backend répond correctement)
      .then(res => {
        // Affiche la réponse du backend dans la console du navigateur
        console.log(res.data);
      })

      // Si erreur (backend non lancé, CORS, etc.)
      .catch(err => {
        // Affiche l'erreur dans la console
        console.error(err);
      });

  }, []); // [] = exécuter UNE seule fois (au chargement du composant)

  // Ce qui s'affiche à l'écran
  return <h1>Test Backend</h1>;
}

// Export du composant pour pouvoir l'utiliser dans App.jsx
export default Test;