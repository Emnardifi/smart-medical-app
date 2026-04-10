from sqlalchemy.orm import Session
from app.models.user import User

#cherche un utilisateur par son id
def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

#cherche un utilisateur par son email
def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

#cherche all users
def get_all_users(db: Session):
    return db.query(User).all()

#cree user 
def create_user(db: Session, full_name: str, email: str, hashed_password: str, role: str = "user"):
    new_user = User(
        full_name=full_name,
        email=email,
        hashed_password=hashed_password,
        role=role
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

#modifier user inf 
def update_user(db: Session, user: User, full_name: str = None, email: str = None, role: str = None):
    if full_name is not None:
        user.full_name = full_name
    if email is not None:
        user.email = email
    if role is not None:
        user.role = role

    db.commit()
    db.refresh(user)
    return user

#modifier user password
def update_user_password(db: Session, user: User, hashed_password: str):
    user.hashed_password = hashed_password

    db.commit()
    db.refresh(user)

    return user

#supprimer user 
def delete_user(db: Session, user: User):
    db.delete(user)
    db.commit()

