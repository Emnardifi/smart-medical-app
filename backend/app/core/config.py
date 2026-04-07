from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # URL de connexion vers PostgreSQL
    DATABASE_URL: str

    # clé secrète use pour signer les tokens JWT
    SECRET_KEY: str

    # durée de validité du token en minutes
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    # algorithme use pour JWT
    ALGORITHM: str

    # indique a Pydantic de lire les variables depuis  .env
    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore"
    )


# instance globale use dans toute l'application
settings = Settings()