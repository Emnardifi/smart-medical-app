from fastapi import FastAPI
from app.core.database import engine, Base
from app.models.user import User
from app.models.image import Image
from app.models.analysis import Analysis
from app.models.report import Report

app = FastAPI()

# créer les tables dans PostgreSQL
print("Creating tables...")
Base.metadata.create_all(bind=engine)
print("Tables creation done.")

@app.get("/")
def root():
    return {"message" : "backend working"}

@app.get("/test-bd")
def test_bd():
    try:
        connection = engine.connect()
        connection.close()
        return {"message": "DB connected successfully"}
    except Exception as e:
        return {"message": f"DB connection failed: {str(e)}"}