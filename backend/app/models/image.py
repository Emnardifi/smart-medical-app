from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.core.database import Base

class Image(Base):
    __tablename__ = "images"

    # identifiant unique de l'image
    id = Column(Integer, primary_key=True, index=True)

    # utilisateur qui a uploadé l'image
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # nom original du fichier
    original_filename = Column(String(255), nullable=False)

    # chemin réel de stockage sur le serveur
    stored_path = Column(String(500), nullable=False)

    # format du fichier : jpg, png, jpeg...
    file_format = Column(String(20), nullable=False)

    # date d'upload
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
    