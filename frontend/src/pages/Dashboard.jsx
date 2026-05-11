import StatCard from "../components/dashboard/StatCard"
import QuickAction from "../components/dashboard/QuickAction"
import LastAnalysis from "../components/dashboard/LastAnalysis"

function Dashboard() {
  return (
    <div>
      <h2>Smart Medical App</h2>
      <h3>Dashboard</h3>

      <p>Bienvenue sur votre espace médical.</p>

      <hr />

      {/* 
        section permet de regrouper une partie logique de la page
        ici : le résumé rapide du dashboard
      */}
      <section>
        <h4>Résumé rapide</h4>

        {/* 
          Pour le moment, les valeurs sont statiques (simulées).
          Plus tard, lors de l'intégration du backend (FastAPI),
          ces données viendront de la base de données (API).
        */}

        {/* div permet de regrouper toutes les cartes statistiques */}
        <div>
          <StatCard
            title="Analyses totales"
            value="12" // sera remplacé par stats.total depuis backend
            description="Depuis votre inscription"
          />

          <StatCard
            title="Résultats normaux"
            value="8" // sera remplacé par stats.normal
            description="66.7%"
          />

          <StatCard
            title="Pneumonies détectées"
            value="4" // sera remplacé par stats.pneumonia
            description="33.3%"
          />

          <StatCard
            title="Dernière analyse"
            value="12 Mai 2025" // sera remplacé par stats.lastAnalysisDate
            description="il y a 2 jours"
          />
        </div>
      </section>

      <hr />

      {/* Section actions rapides */}
      <section>
        <h4>Actions rapides</h4>

        {/* div permet de regrouper les boutons de navigation rapide */}
        <div>
          <QuickAction title="Nouvelle analyse" path="/analyze" />
          <br />
          <QuickAction title="Voir historique" path="/history" />
          <br />
          <QuickAction title="Mon profil" path="/profile" />
        </div>
      </section>

      <hr />

      {/* 
        section permet de séparer la partie dernière analyse
        du reste du dashboard
      */}
      <section>
        {/* Données simulées pour le moment (seront remplacées par API backend) */}
        <LastAnalysis
          image="https://via.placeholder.com/200" // backend: chemin image
          result="PNEUMONIA" // backend: résultat modèle
          probability="0.87" // backend: score IA
          date="12 Mai 2025" // backend: date réelle
        />
      </section>
    </div>
  )
}

export default Dashboard