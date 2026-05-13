import { useState } from "react"
import ImageUploader from "../components/analysis/ImageUploader"
import AnalysisResult from "../components/analysis/AnalysisResult"
import RecentAnalysis from "../components/analysis/RecentAnalysis"
import { useAnalyses } from "../hooks/useAnalyses"
import {
  getOriginalImageBlob,
  getHeatmapBlob,
} from "../services/analysisService"

const Analyze = () => {
  const {
    analyses,
    loading,
    error,
    uploadAndPredict,
    removeAnalysis,
  } = useAnalyses()

  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [localError, setLocalError] = useState("")

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setImage(file)
    setPreview(URL.createObjectURL(file))
    setResult(null)
    setLocalError("")
  }

  const removeImage = () => {
    setImage(null)
    setPreview(null)
    setResult(null)
    setLocalError("")
  }

  const handleAnalyze = async () => {
    if (!image) {
      setLocalError("Veuillez choisir une image")
      return
    }

    try {
      setLocalError("")
      const data = await uploadAndPredict(image)
      setResult(data)
    } catch (err) {
      setLocalError(
        err.response?.data?.detail ||
          "Erreur lors de l’analyse de l’image"
      )
    }
  }

  const handleShowImage = async (id) => {
    const url = await getOriginalImageBlob(id)
    window.open(url, "_blank")
  }

  const handleShowHeatmap = async (id) => {
    const url = await getHeatmapBlob(id)
    window.open(url, "_blank")
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Nouvelle analyse
        </h1>

        <p className="mt-2 text-slate-500">
          Importez une radiographie thoracique pour lancer l’analyse IA
        </p>
      </div>

      <ImageUploader
        preview={preview}
        error={localError}
        loading={loading}
        onImageChange={handleImageChange}
        onRemoveImage={removeImage}
        onAnalyze={handleAnalyze}
      />

      <AnalysisResult result={result} />

      {error && (
        <p className="text-red-600 font-medium">
          Erreur lors du chargement des analyses.
        </p>
      )}

      <RecentAnalysis
        analyses={analyses}
        onDelete={removeAnalysis}
        onShowImage={handleShowImage}
        onShowHeatmap={handleShowHeatmap}
      />
    </div>
  )
}

export default Analyze