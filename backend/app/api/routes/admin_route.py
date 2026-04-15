from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.core.database import get_bd
from app.api.deps import get_current_admin
from app.models.user import User
from app.models.analysis import Analysis
from app.models.report import Report
from app.repository.user_repository import get_user_by_id, update_user, delete_user
from app.schemas.user import UserResponse, UserUpdate, ChangePassword
from app.repository.analysis_repository import get_analysis_by_id, delete_analysis
from app.repository.user_repository import get_user_by_id, get_all_users, update_user, delete_user

router = APIRouter(prefix="/admin", tags=["Admin"])

#route lister tous les users 
@router.get(
    "/users",
    response_model=list[UserResponse],
    summary="Lister tous les utilisateurs!"
)
def admin_list_users(
    db: Session = Depends(get_bd),
    admin_user: User = Depends(get_current_admin)
):
    return get_all_users(db)


#afficher user par id 
@router.get(
    "/users/{user_id}",
    response_model=UserResponse,
    summary="Afficher un utilisateur par id (admin)"
)
def  admin_get_user(
    user_id: int,
    db: Session = Depends(get_bd),
    admin_user: User = Depends(get_current_admin)
):
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur introuvable.")
    return user


#mofiier user par id 
@router.put(
    "/users/{user_id}",
    response_model=UserResponse,
    summary="Modifier un utilisateur par id"
)
def admin_update_user(
    user_id: int,
    user_data: UserUpdate,
    db: Session = Depends(get_bd),
    admin_user: User = Depends(get_current_admin)
):
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur introuvable.")

    return update_user(
        db=db,
        user=user,
        full_name=user_data.full_name,
        email=user_data.email
    )

#route supp user par id 
@router.delete(
    "/users/{user_id}",
    summary="Supprimer un utilisateur par id"
)
def admin_delete_user(
    user_id: int,
    db: Session = Depends(get_bd),
    admin_user: User = Depends(get_current_admin)
):
    user = get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur introuvable.")

    delete_user(db, user)
    return {"message": "Utilisateur supprimé avec succès."}

#route pour analyse
@router.get("/analyses", summary="Lister les analyses")
def admin_list_analyses(
    db: Session = Depends(get_bd),
    admin_user: User = Depends(get_current_admin)
):
    return db.query(Analysis).all()


@router.delete("/analyses/{analysis_id}", summary="Supprimer une analyse")
def admin_delete_analysis(
    analysis_id: int,
    db: Session = Depends(get_bd),
    admin_user: User = Depends(get_current_admin)
):
    analysis = get_analysis_by_id(db, analysis_id)
    if not analysis:
        raise HTTPException(status_code=404, detail="Analyse introuvable.")

    delete_analysis(db, analysis)
    return {"message": "Analyse supprimée."}

#route pour rapport 
@router.get("/reports", summary="Lister les rapports")
def admin_list_reports(
    db: Session = Depends(get_bd),
    admin_user: User = Depends(get_current_admin)
):
    return db.query(Report).all()


@router.delete("/reports/{report_id}", summary="Supprimer un rapport")
def admin_delete_report(
    report_id: int,
    db: Session = Depends(get_bd),
    admin_user: User = Depends(get_current_admin)
):
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Rapport introuvable.")

    db.delete(report)
    db.commit()
    return {"message": "Rapport supprimé."} 

#route pour statistiques globales 
@router.get("/stats", summary="Statistiques globales")
def admin_stats(
    db: Session = Depends(get_bd),
    admin_user: User = Depends(get_current_admin)
):
    users_count = db.query(func.count(User.id)).scalar()
    analyses_count = db.query(func.count(Analysis.id)).scalar()
    reports_count = db.query(func.count(Report.id)).scalar()

    return {
        "users_count": users_count,
        "analyses_count": analyses_count,
        "reports_count": reports_count
    }

#route pour dashboard
@router.get("/dashboard", summary="Résumé admin")
def admin_dashboard(
    db: Session = Depends(get_bd),
    admin_user: User = Depends(get_current_admin)
):
    return {
        "message": "Admin dashboard ready",
        "stats": {
            "users": db.query(func.count(User.id)).scalar(),
            "analyses": db.query(func.count(Analysis.id)).scalar(),
            "reports": db.query(func.count(Report.id)).scalar(),
        }
    }