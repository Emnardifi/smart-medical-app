from sqlalchemy.orm import Session
from app.models.analysis import Analysis

#ajoute une nouvelle analyse dans la BD
def create_analysis(
    db: Session,
    user_id: int,
    image_id: int,
    prediction: str,
    probability: float,
    heatmap_path: str = None,
    status: str = "done"
):
    new_analysis = Analysis(
        user_id=user_id,
        image_id=image_id,
        prediction=prediction,
        probability=probability,
        heatmap_path=heatmap_path,
        status=status
    )
    db.add(new_analysis)
    db.commit()
    db.refresh(new_analysis)
    return new_analysis

#récupère une analyse précise par son id
def get_analysis_by_id(db: Session, analysis_id: int):
    return db.query(Analysis).filter(Analysis.id == analysis_id).first()

#récupère toutes les analyses d’un utilisateur
def get_analyses_by_user_id(db: Session, user_id: int):
    return db.query(Analysis).filter(Analysis.user_id == user_id).all()

#récupère les analyses liées à une image
def get_analyses_by_image_id(db: Session, image_id: int):
    return db.query(Analysis).filter(Analysis.image_id == image_id).all()

#supprime une analyse de la BD
def delete_analysis(db: Session, analysis: Analysis):
    db.delete(analysis)
    db.commit()