from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_bd
from app.api.deps import get_current_user, get_current_admin
from app.models.user import User
from app.schemas.user import UserResponse, UserUpdate, ChangePassword
from app.services.auth_service import update_profile, update_password
from app.repository.user_repository import get_user_by_id, get_all_users, update_user, delete_user

router = APIRouter(prefix="/users", tags=["Users"])

#route pour afficher un  profile 
@router.get(
    "/me",
    response_model=UserResponse,
    summary="Afficher mon profil"
)
def get_my_profile(current_user: User = Depends(get_current_user)):
    return current_user

#route update profil
@router.put(
    "/me",
    response_model=UserResponse,
    summary="Modifier entièrement mon profil"
)
def put_my_profile(
    user_data: UserUpdate,
    db: Session = Depends(get_bd),
    current_user: User = Depends(get_current_user)
):
    return update_profile(db, current_user, user_data)

#route changer password 

@router.put(
    "/me/password",
    summary="Changer mon mot de passe"
)
def change_my_password(
    password_data: ChangePassword,
    db: Session = Depends(get_bd),
    current_user: User = Depends(get_current_user)
):
    return update_password(db, current_user, password_data)

#modifier photo de profil 
@router.put(
    "/me/avatar",
    summary="Mettre à jour mon avatar"
)
def update_my_avatar():
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Upload avatar non encore implémenté."
    )
    
#route supp compte 
@router.delete(
    "/me",
    summary="Supprimer mon compte"
)
def delete_my_account(
    db: Session = Depends(get_bd),
    current_user: User = Depends(get_current_user)
):
    delete_user(db, current_user)
    return {"message": "Compte supprimé avec succès."}

