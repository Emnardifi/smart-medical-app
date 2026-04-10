from sqlalchemy.orm import Session
from app.models.report import Report

#ajoute un rapport PDF
def create_report(db: Session,analysis_id: int,file_path: str,status: str = "generated"):
    new_report = Report(
        analysis_id=analysis_id,
        file_path=file_path,
        status=status
    )
    db.add(new_report)
    db.commit()
    db.refresh(new_report)
    return new_report

#récupérer un rapport précis(id)
def get_report_by_id(db: Session, report_id: int):
    return db.query(Report).filter(Report.id == report_id).first()

#récupérer le rapport d’une analyse
def get_report_by_analysis_id(db: Session, analysis_id: int):
    return db.query(Report).filter(Report.analysis_id == analysis_id).first()

#supprime le rapport de la BD
def delete_report(db: Session, report: Report):
    db.delete(report)
    db.commit()

#modifier état
def update_report_status(db: Session, report: Report, status: str):
    report.status = status
    db.commit()
    db.refresh(report)
    return report