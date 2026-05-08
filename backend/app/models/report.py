from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func
from app.core.database import Base


class Report(Base):
    __tablename__ = "reports"

    # identifiant unique du rapport
    id = Column(Integer, primary_key=True, index=True)

    # analyse liée à ce rapport
    analysis_id = Column(Integer, ForeignKey("analyses.id", ondelete="CASCADE"), nullable=False)

    # chemin du fichier PDF
    file_path = Column(String(500), nullable=False)

    # état du rapport : generated, failed
    status = Column(String(20), default="generated", nullable=False)

    # date de génération du rapport
    generated_at = Column(DateTime(timezone=True), server_default=func.now())