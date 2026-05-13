import api from "./api"

// Générer un rapport depuis une analyse
export const generateReport = async (analysisId) => {
  const response = await api.post(`/reports/${analysisId}`)
  return response.data
}

// Générer seulement si le rapport n'existe pas
export const generateReportIfMissing = async (analysisId) => {
  const response = await api.post(
    `/reports/analysis/${analysisId}/generate-if-missing`
  )
  return response.data
}

// Lister mes rapports
export const getMyReports = async () => {
  const response = await api.get("/reports/history-report")
  return response.data
}

// Récupérer un rapport par ID
export const getReportById = async (reportId) => {
  const response = await api.get(`/reports/${reportId}`)
  return response.data
}

// Récupérer le rapport lié à une analyse
export const getReportByAnalysis = async (analysisId) => {
  const response = await api.get(`/reports/analysis/${analysisId}`)
  return response.data
}

// Voir PDF
export const viewReport = async (reportId) => {
  const response = await api.get(`/reports/${reportId}/view`, {
    responseType: "blob",
  })

  const fileURL = URL.createObjectURL(
    new Blob([response.data], { type: "application/pdf" })
  )

  window.open(fileURL, "_blank")
}

// Télécharger PDF
export const downloadReport = async (reportId) => {
  const response = await api.get(`/reports/${reportId}/download`, {
    responseType: "blob",
  })

  const fileURL = URL.createObjectURL(
    new Blob([response.data], { type: "application/pdf" })
  )

  const link = document.createElement("a")
  link.href = fileURL
  link.download = `rapport_${reportId}.pdf`
  link.click()

  URL.revokeObjectURL(fileURL)
}

// Supprimer rapport
export const deleteReport = async (reportId) => {
  const response = await api.delete(`/reports/${reportId}`)
  return response.data
}