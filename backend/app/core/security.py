#set a gerer le temps : date actuelle , add du temps , utc(pour securite)
from datetime import datetime, timedelta, timezone 
#sert a hasher les password
from passlib.context import CryptContext
#sert a creer les tokens jwt
from jose import jwt
from app.core.config import settings

#definir comment securiser les passwords 
pwd_context = CryptContext(
    schemes=["bcrypt"], #bcrypt algo securise use salt(val random dans hash)
    deprecated="auto"
) 

#hasher  un password --> register 
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

#verification du password  --> use dans login 
def verify_password(plain_password : str,hashed_password : str) -> bool:
    return pwd_context.veridy(plain_password,hashed_password)

#creation de token(user) apres login :preuve que user est connecté
def create_access_token(data: dict) -> str:
    #on prend infos user :
    to_encode = data.copy
    
    #calculer date d expiration 
    expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    #ajouter expiration dans token 
    to_encode.update({"exp":expire})
    
    #génération du token signé
    encoded_jwt = jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )
    return encoded_jwt


#remaq:éventuellement création/vérification d’un reset token