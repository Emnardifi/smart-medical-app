import { useEffect, useState } from "react"
import ReportCard from "../components/reports/ReportCard"
import {
  getMyReports,
  viewReport,
  downloadReport,
  deleteReport,
} from "../services/reportService"

const Report = () => {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchReports = async () => {
    try {
      setLoading(true)
      setError("")

      const data = await getMyReports()
      setReports(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Erreur lors du chargement des rapports"
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReports()
  }, [])

  const handleView = async (id) => {
    await viewReport(id)
  }

  const handleDownload = async (id) => {
    await downloadReport(id)
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Voulez-vous vraiment supprimer ce rapport ?"
    )

    if (!confirmDelete) return

    await deleteReport(id)
    setReports((prev) => prev.filter((r) => r.id !== id))
  }

  const totalReports = reports.length
  const generatedReports = reports.filter(
    (r) => r.status === "generated" || r.status === "Généré" || !r.status
  ).length
  const failedReports = reports.filter(
    (r) => r.status === "failed" || r.status === "Échoué"
  ).length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Rapports
        </h1>

        <p className="mt-2 text-slate-500">
          Gérez, consultez et téléchargez vos rapports PDF.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
          <p className="text-slate-500">Total rapports</p>
          <h2 className="text-3xl font-bold text-slate-900">
            {totalReports}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
          <p className="text-slate-500">Rapports générés</p>
          <h2 className="text-3xl font-bold text-green-600">
            {generatedReports}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
          <p className="text-slate-500">Rapports échoués</p>
          <h2 className="text-3xl font-bold text-red-600">
            {failedReports}
          </h2>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-6">
          Liste des rapports
        </h2>

        {loading && (
          <p className="text-slate-500">Chargement des rapports...</p>
        )}

        {error && (
          <p className="text-red-600 font-medium">{error}</p>
        )}

        {!loading && reports.length === 0 && !error && (
          <p className="text-center text-slate-500">
            Aucun rapport trouvé.
          </p>
        )}

        <div className="space-y-5">
          {reports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              onView={handleView}
              onDownload={handleDownload}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Report