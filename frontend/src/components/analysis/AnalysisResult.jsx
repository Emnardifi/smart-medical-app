const AnalysisResult = ({ result }) => {
  if (!result) return null

  const prediction = result.prediction
  const probability = result.probability || 0

  const risk = Math.round(result.probability * 100)
  const confidence = Math.round((1 - result.probability) * 100)

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-8">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Résultat
      </h2>

      <p className="text-xl font-bold mb-4">
        Prédiction :{" "}
        <span className={isNormal ? "text-green-600" : "text-red-600"}>
          {prediction}
        </span>
      </p>

      <p className="text-xl font-bold mb-4">
        Risque de pneumonie : {risk}%
      </p>

      <p className="text-xl font-bold">
        Confiance {prediction} : {confidence}%
      </p>
    </div>
  )
}

export default AnalysisResult