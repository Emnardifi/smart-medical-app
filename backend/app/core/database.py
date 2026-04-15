from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

#creation de moteur de connexion a postgresql 
engine = create_engine(settings.DATABASE_URL)

#creation de sessions sqlalchemy 
SessionLocal = sessionmaker(
    autoflush=False,   #pas d envoie autq des changemt a la bd 
    autocommit = False,  #pas de sauvegarde automatique
    bind = engine #lie la session au moteur 
)

#classe de base  pour tous les modeles sqlalchemy
Base = declarative_base()

#fonction pour gestion propre de sessions 
# ouvrir → utiliser → fermer (automatique)
#On ferme la session DB pour libérer les ressources après chaque requête
def get_bd():
    #ouvre la session bd 
    bd = SessionLocal()
    try:
        yield bd #retourn ela session temporairement 
    finally:
        bd.close()  #fermer la connexion

