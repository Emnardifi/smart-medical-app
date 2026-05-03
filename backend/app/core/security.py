#set a gerer le temps : date actuelle , add du temps , utc(pour securite)
from datetime import datetime, timedelta, timezone 
#sert a hasher les password
from passlib.context import CryptContext
#sert a creer les tokens jwt
from jose import jwt,JWTError, ExpiredSignatureError
from app.core.config import settings

#definir comment securiser les passwords 
pwd_context = CryptContext(
    schemes=["bcrypt"], #bcrypt algo securise use salt(val random dans hash)
    deprecated="auto"
) 

#hasher  un password --> register 
def hash_password(password: str) -> str:
    return pwd_context.hash(password[:72])

#verification du password  --> use dans login 
def verify_password(plain_password : str,hashed_password : str) -> bool:
    return pwd_context.verify(plain_password[:72],hashed_password)

#creation de token(user) apres login :preuve que user est connecté
def create_access_token(data: dict) -> str:
    #on prend infos user :
    to_encode = data.copy()
    
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

def create_reset_token(data: dict, expires_minutes: int = 30) -> str:
    """
    Créer un token spécial pour reset password.
    On ajoute un type='reset' pour distinguer ce token d'un access token normal.
    """
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=expires_minutes)

    to_encode.update({
        "exp": expire,
        "type": "reset"
    })

    encoded_jwt = jwt.encode(
        to_encode,
        settings.SECRET_KEY,
        algorithm=settings.ALGORITHM
    )
    return encoded_jwt
#decoder et verifier un token JWT
def decode_token(token: str) -> dict:
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            algorithms=[settings.ALGORITHM]
        )
        return payload

    except ExpiredSignatureError:
        # token expiré
        return None

    except JWTError:
        # token invalide
        return None
    

#remaq:éventuellement création/vérification d’un reset token