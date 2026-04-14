from tensorflow.keras.models import load_model

#chemin du model
path_model="app/ai/model/best_final_densenet.keras"

# variable globale pour stocker le modèle
loaded_model=None

def get_model():
    #garantir n est pas une copie du model(original model)
    global loaded_model
    
    #verifier nestt pas chargé
    if loaded_model is None:
        loaded_model=load_model(path_model)
    return loaded_model
    