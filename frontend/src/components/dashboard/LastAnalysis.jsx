// Composant pour afficher la dernière analyse
// Les props seront remplacées plus tard par des données venant du backend

function LastAnalysis({ image, result, date, probability }) {
  return (
    <div>

      <h4>Dernière analyse</h4>

      {/* image → viendra du backend (chemin de l’image uploadée) */}
      <img src={image} alt="radiographie" width="200" />

      {/* result → viendra du modèle IA (NORMAL / PNEUMONIA) */}
      <p>Résultat : {result}</p>

      {/* probability → confiance du modèle IA */}
      <p>Confiance : {probability}</p>

      {/* date → date réelle de l’analyse */}
      <p>Date : {date}</p>

    </div>
  )
}

export default LastAnalysis