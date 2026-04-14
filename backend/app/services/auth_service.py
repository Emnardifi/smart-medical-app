from app.models.user import User
from app.schemas.user import UserCreate, UserResponse,UserUpdate,ChangePassword
from app.schemas.auth import ResetPasswordRequest,ForgotPasswordRequest
from app.repository.user_repository import get_all_users,delete_user,update_user_password,update_user,create_user,get_user_by_id,get_user_by_email
from app.core.security import hash_password,verify_password,create_access_token
from sqlalchemy.orm import Session
from fastapi import HTTPException
#helpres
def _email_used(db:Session,email:str,user_id:int|None):
    existing_user=get_user_by_email(db,email)#user or none
    if existing_user and existing_user.id!=user_id :
        raise  HTTPException(
            status_code=401,
            detail="Email existe deja !"
        )
        
        
#verifier si user actif => compte actif 
def _user_is_active(user:User):
    if not user.is_active:
        raise  HTTPException(
            status_code=401,
            detail="inactive account"
        )


#fonctions principales 

#fonct inscription d'un user 
def register_user(db:Session,user_data:UserCreate)->User:
    _email_used(db,user_data.email)
    hashed_pw = hash_password(user_data.password)
    new_user=create_user(
        db=db,
        full_name=user_data.full_name,
        email=user_data.email,
        hashed_password=hashed_pw,
    )
    return new_user

#fonct login 
def login_user(db: Session, email: str, password: str) -> dict: #return : un fichier json: jwt
    user=get_user_by_email(db,email)
    check_pw=verify_password(password, user.hashed_password)
    if not user or not check_pw :
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )
    _user_is_active(user)
    access_token=create_access_token({"sub": user.email})
    return {
        "access_token":access_token,
        "token_type": "bearer"
    }
    
#fonct update profile
def update_profile(db:Session,user:User,user_data:UserUpdate) ->User:
    if user_data.email is not None :
        _email_used(db,user.email,user_data.id)
    updated_user = update_user(
        db,
        user,
        user_data.full_name,
        user_data.email
    )
    return updated_user

#modification de password 
def update_password(db:Session,user:User,password_data:ChangePassword):
    check_pw=verify_password(password_data.old_password,user.hashed_password)
    if not check_pw :
        raise HTTPException(
            status_code=401,
            detail="old password is incorrect!"
        )
    new_hashed_password=hash_password(password_data.new_password)
    update_user_password(db,user,new_hashed_password)
    return {"message":"password updated successfully"}

#fonct forget pw or reset pw 