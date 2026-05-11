function StatCard({title, value, description}){ //Ce sont des props, Ça permet d’utiliser le même composant plusieurs fois avec des données différentes.
    return(

     <div>
      {/* titre de la statistique */}
      <h4>{title}</h4>

      {/* valeur principale */}
      <h2>{value}</h2>

      {/* petite description */}
      <p>{description}</p>
    </div>
  )
}

export default StatCard
//on va applere ce composant 4 fois dans Dashboard pour analyses totales, resultas normaux, pneumonia detectee, derniere analyse, et les props ykhalouna nbadlou les valeurs mn khilelhom