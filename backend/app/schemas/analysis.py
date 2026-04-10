from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional


# schéma principal représentant une analyse enregistrée
#use dans réponse après analyse ,liste historique et détail analyse
class AnalysisResponse(BaseModel):
    id: int
    user_id: int
    image_id: int
    prediction: str
    probability: float
    heatmap_path: Optional[str] = None
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# réponse simplifiée après exécution d'une nouvelle analyse : Après une analyse, le frontend a souvent besoin d’une réponse plus simple 
class AnalysisResultResponse(BaseModel):
    message: str
    analysis_id: int
    prediction: str
    probability: float
    heatmap_path: Optional[str] = None
    status: str


# élément simple pour afficher une ligne dans l'historique
class AnalysisHistoryItem(BaseModel):
    id: int
    prediction: str
    probability: float
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


# réponse détaillée pour consulter une analyse précise
class AnalysisDetailResponse(BaseModel):
    id: int
    user_id: int
    image_id: int
    prediction: str
    probability: float
    heatmap_path: Optional[str] = None
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)