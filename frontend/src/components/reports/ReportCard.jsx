const ReportCard = ({
  report,
  onView,
  onDownload,
  onDelete,
}) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-300 bg-white p-5 md:flex-row md:items-center md:justify-between">
      <div>
        <h3 className="text-lg font-bold text-slate-900">
          Rapport #{report.id}
        </h3>

        <p className="text-slate-500">
          Analyse #{report.analysis_id}
        </p>

        <p className="text-slate-500">
          Statut :{" "}
          <span className="font-semibold text-green-600">
            {report.status || "Généré"}
          </span>
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onView(report.id)}
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Voir PDF
        </button>

        <button
          onClick={() => onDownload(report.id)}
          className="rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
        >
          Télécharger
        </button>

        <button
          onClick={() => onDelete(report.id)}
          className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
        >
          Supprimer
        </button>
      </div>
    </div>
  )
}

export default ReportCard