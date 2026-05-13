import api from "./api"

// Envoyer une image au backend pour prédiction IA
export const predictImage = async (imageFile) => {
  const formData = new FormData()
  formData.append("file", imageFile)

  const response = await api.post("/analyses/predict", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  return response.data
}

// Récupérer l'historique des analyses
export const getMyAnalyses = async () => {
  const response = await api.get("/analyses/history")
  return response.data
}

// Récupérer une analyse par ID
export const getAnalysisById = async (analysisId) => {
  const response = await api.get(`/analyses/${analysisId}`)
  return response.data
}

// Récupérer le résultat d'une analyse 
export const getAnalysisResult = async (analysisId) => {
  const response = await api.get(`/analyses/${analysisId}/result`)
  return response.data
}

// Supprimer une analyse
export const deleteAnalysis = async (analysisId) => {
  const response = await api.delete(`/analyses/${analysisId}`)
  return response.data
}

// Récupérer la heatmap protégée avec token
export const getHeatmapBlob = async (analysisId) => {
  const response = await api.get(`/analyses/${analysisId}/heatmap`, {
    responseType: "blob",
  })

  return URL.createObjectURL(response.data)
}

// Récupérer l'image originale protégée avec token
export const getOriginalImageBlob = async (analysisId) => {
  const response = await api.get(`/analyses/${analysisId}/image`, {
    responseType: "blob",
  })

  return URL.createObjectURL(response.data)
}