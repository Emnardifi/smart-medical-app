from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from app.core.database import Base

class User(Base):
    __tablename__ = "users"
    #identifiant unique 
    id = Column(Integer,primary_key=True,index=True)
    #nom complet de user 
    full_name =Column(String(100),nullable=False)
    #email user
    email = Column(String(120), unique=True, index=True, nullable=False)
    #mot de passe chiffré
    hashed_password = Column(String(255), nullable=False)
    #role user 
    role = Column(String(20), default="user", nullable=False)
    # indique si le compte est actif
    is_active = Column(Boolean, default=True, nullable=False)
    # date de création du compte
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    # date de dernière modification
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())