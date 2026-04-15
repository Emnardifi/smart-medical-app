from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.database import get_bd
from app.api.deps import get_current_user
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse
from app.schemas.token import Token
from app.schemas.auth import ForgotPasswordRequest, ResetPasswordRequest
from app.services.auth_service import register_user, login_user,forgot_password_service,reset_password_service
from app.core.security import create_access_token

router = APIRouter(prefix="/auth", tags=["Authentification"])

#route register
@router.post(
    "/register",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Créer un nouveau compte utilisateur"
)
def register(user_data:UserCreate,db:Session=Depends(get_bd)):
    return register_user(db,user_data)

#route login 
@router.post(
    "/login",
    response_model=Token,
    summary="Connexion utilisateur et génération JWT"
)
#OAuth2PasswordRequestForm: recuperation de(objet fastapi contient ) username(email) et pw  
def login(form_data:OAuth2PasswordRequestForm=Depends(),db:Session=Depends(get_bd)):
    return login_user(db,email=form_data.username,password=form_data.password)

#route logout
@router.post(
    "/logout",
    summary="Déconnexion utilisateur"
)
def logout():
    return {"message": "Déconnexion réussie. Supprimez le token côté frontend."}

#route refresh
@router.post(
    "/refresh",
    response_model=Token,
    summary="Régénérer un token d'accès"
)
def refresh_token(current_user: User = Depends(get_current_user)):

    new_token = create_access_token({"sub": current_user.email})
    return {
        "access_token": new_token,
        "token_type": "bearer"
    }
    
#route  me retourne les info d un user authentifié 
@router.get(
    "/me",
    response_model=UserResponse,
    summary="Récupérer l'utilisateur connecté"
)
def read_me(current_user:User= Depends(get_current_user)):
    return current_user

#router forget password
@router.post("/forgot-password")
def forgot_password(
    payload: ForgotPasswordRequest,
    db: Session = Depends(get_bd)
):
    """
    Reçoit un email et génère un token de réinitialisation.
    """
    return forgot_password_service(db, payload.email)

#route reset-password
@router.post("/reset-password")
def reset_password(
    payload: ResetPasswordRequest,
    db: Session = Depends(get_bd)
):
    """
    Reçoit:
    - token
    - nouveau mot de passe
    Puis met à jour le mot de passe.
    """
    return reset_password_service(
        db,
        token=payload.token,
        new_password=payload.new_password
    )

#route verification email 
@router.post("/verify-email")
def verify_email():
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Vérification email non encore implémentée."
    )

#route  resend verification
@router.post("/resend-verification")
def resend_verification():
    raise HTTPException(
        status_code=status.HTTP_501_NOT_IMPLEMENTED,
        detail="Renvoi de vérification email non encore implémenté."
    )