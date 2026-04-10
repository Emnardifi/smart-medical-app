from pydantic import BaseModel
from typing import Optional


# réponse retournée après authentification réussie
class Token(BaseModel):
    access_token: str
    token_type: str


# données extraites du token après décodage
class TokenData(BaseModel):
    email: Optional[str] = None