from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional


# schéma principal représentant un rapport enregistré
class ReportResponse(BaseModel):
    id: int
    analysis_id: int
    file_path: str
    status: str
    generated_at: datetime

    model_config = ConfigDict(from_attributes=True)


# réponse après génération du rapport PDF
class ReportGenerateResponse(BaseModel):
    message: str
    report_id: int
    analysis_id: int
    file_path: str
    status: str


# réponse simple pour fournir le lien ou chemin de téléchargement
class ReportDownloadResponse(BaseModel):
    message: str
    download_url: str


# schéma utile si la génération échoue ou si le rapport n'existe pas
class ReportStatusResponse(BaseModel):
    analysis_id: int
    status: str
    detail: Optional[str] = None