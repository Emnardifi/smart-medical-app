const RecentAnalysis = ({ analyses, onDelete, onShowImage, onShowHeatmap }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        Mes analyses récentes
      </h2>

      {analyses.length === 0 ? (
        <p className="text-slate-500">Aucune analyse récente.</p>
      ) : (
        <div className="space-y-6">
          {analyses.map((analysis) => {
            const isNormal = analysis.prediction === "NORMAL"
            const probability = analysis.probability || 0
            const confidence = Math.round(probability * 100)
            const risk = isNormal ? 100 - confidence : confidence

            return (
              <div
                key={analysis.id}
                className="flex items-center justify-between rounded-2xl border border-slate-400 p-6"
              >
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Analyse #{analysis.id}
                  </h3>

                  <p className="text-slate-600">
                    Prédiction :{" "}
                    <span
                      className={`font-bold ${
                        isNormal ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {analysis.prediction}
                    </span>
                  </p>

                  <p className="text-slate-500">
                    Risque de pneumonie : {risk}%
                  </p>

                  {isNormal && (
                    <p className="text-slate-500">
                      Confiance NORMAL : {confidence}%
                    </p>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => onShowImage(analysis.id)}
                    className="rounded-xl bg-slate-600 px-5 py-3 font-semibold text-white hover:bg-slate-700"
                  >
                    Image originale
                  </button>

                  {!isNormal && (
                    <button
                      onClick={() => onShowHeatmap(analysis.id)}
                      className="rounded-xl bg-purple-600 px-5 py-3 font-semibold text-white hover:bg-purple-700"
                    >
                      Heatmap
                    </button>
                  )}

                  <button
                    onClick={() => onDelete(analysis.id)}
                    className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default RecentAnalysis