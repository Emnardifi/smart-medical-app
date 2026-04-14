from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np

def preprocess_image(image):
    img = load_img(image, target_size=(224, 224),color_mode="rgb")
    img = img_to_array(img)
    img = img /255.0
    img = np.expand_dims(img,axis=0)
    return img 