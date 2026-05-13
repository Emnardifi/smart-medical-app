const ImageUploader = ({
  preview,
  error,
  loading,
  onImageChange,
  onRemoveImage,
  onAnalyze,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <h2 className="text-xl font-bold text-slate-900">
        1. Importer une image
      </h2>

      <div className="mt-6 border-2 border-dashed border-blue-300 rounded-2xl p-6 text-center min-h-[420px] flex items-center justify-center relative overflow-hidden">

        {!preview ? (
          <div>
            <div className="text-5xl mb-4">☁️</div>

            <p className="font-medium text-slate-700">
              Glissez et déposez votre image ici
            </p>

            <p className="text-slate-400 my-3">
              ou
            </p>

            <label className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl cursor-pointer font-semibold">
              Choisir une image

              <input
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className="hidden"
              />
            </label>

            <p className="mt-4 text-sm text-slate-400">
              Formats acceptés : JPG, PNG, JPEG
            </p>
          </div>
        ) : (
          <div className="relative w-full h-full">
            <img
              src={preview}
              alt="Aperçu"
              className="w-full h-[350px] object-contain rounded-2xl bg-black"
            />

            <button
              onClick={onRemoveImage}
              className="absolute top-3 right-3 bg-white text-red-500 rounded-full w-10 h-10 shadow-md font-bold hover:bg-red-50"
            >
              ×
            </button>

            <label className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl cursor-pointer font-semibold shadow">
              Changer image

              <input
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-4 text-center text-red-600 font-medium">
          {error}
        </p>
      )}

      <button
        onClick={onAnalyze}
        disabled={loading}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold disabled:opacity-60"
      >
        {loading
          ? "Analyse en cours..."
          : "Lancer l’analyse"}
      </button>
    </div>
  )
}

export default ImageUploader