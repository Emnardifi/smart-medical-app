from app.ai.model_loader import get_model
from app.ai.preprocess import preprocess_image


#les classes 
CLASS = ["NORMAL","PNEUMONIA"]

#seuil
threshold = 0.6


#fonction de prediction 
def predict_image(image) ->dict: 
    model = get_model()
    predict = model.predict(image, verbose=0)[0][0]
    if predict > threshold :
        label= CLASS[1] 
    else:
        label= CLASS[0]
    return {
        "prediction": label,
        "probability": float(predict)
    }