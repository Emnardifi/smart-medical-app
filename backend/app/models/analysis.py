from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.core.database import Base


class Analysis(Base):
    __tablename__ = "analyses"

    # identifiant unique de l'analyse
    id = Column(Integer, primary_key=True, index=True)

    # utilisateur qui a lancé l'analyse
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # image analysée
    image_id = Column(Integer, ForeignKey("images.id"), nullable=False)

    # résultat du modèle : NORMAL ou PNEUMONIA
    prediction = Column(String(50), nullable=False)

    # score de confiance du modèle
    probability = Column(Float, nullable=False)

    # chemin de la heatmap générée
    heatmap_path = Column(String(500), nullable=True)

    # état de l'analyse : pending, done, failed
    status = Column(String(20), default="done", nullable=False)

    # date de création de l'analyse
    created_at = Column(DateTime(timezone=True), server_default=func.now())