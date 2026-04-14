import tensorflow as tf
from pathlib import Path
#chemin du model
BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "model" / "best_final_densenet.keras"
# variable globale pour stocker le modèle
loaded_model=None

def get_model():
    #garantir n est pas une copie du model(original model)
    global loaded_model
    
    #verifier nestt pas chargé
    if loaded_model is None:
        loaded_model=tf.keras.models.load_model(MODEL_PATH)
    return loaded_model
    