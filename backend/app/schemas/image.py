from pydantic import BaseModel, ConfigDict
from datetime import datetime


# réponse standard pour une image enregistrée
class ImageResponse(BaseModel):
    id: int
    user_id: int
    original_filename: str
    stored_path: str
    file_format: str
    uploaded_at: datetime

    model_config = ConfigDict(from_attributes=True)


# réponse plus simple après upload réussi
class ImageUploadResponse(BaseModel):
    message: str
    image_id: int
    original_filename: str
    stored_path: str
    file_format: str