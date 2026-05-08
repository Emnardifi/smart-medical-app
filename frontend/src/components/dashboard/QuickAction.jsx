import { useNavigate } from "react-router-dom"

// Composant bouton pour navigation rapide
// title = texte affiché
// path = page de destination
function QuickAction({ title, path }) {
  const navigate = useNavigate() // permet de changer de page

  return (
    <button onClick={() => navigate(path)}>
      {title}
    </button>
  )
}

export default QuickAction