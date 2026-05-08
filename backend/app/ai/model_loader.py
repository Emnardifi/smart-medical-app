import tensorflow as tf
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = BASE_DIR / "model" / "best_final_densenet_fixed.h5"

loaded_model = None

class CompatDense(tf.keras.layers.Dense):
    def __init__(self, *args, quantization_config=None, **kwargs):
        super().__init__(*args, **kwargs)

def get_model():
    global loaded_model

    if loaded_model is None:
        print("Loading model from:", MODEL_PATH)

        if not MODEL_PATH.exists():
            raise FileNotFoundError(f"Model file not found: {MODEL_PATH}")

        loaded_model = tf.keras.models.load_model(
            MODEL_PATH,
            compile=False,
            custom_objects={"Dense": CompatDense}
        )
        print("Model loaded successfully")

    return loaded_model