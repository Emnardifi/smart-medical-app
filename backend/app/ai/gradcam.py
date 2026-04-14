from app.ai.model_loader import get_model
from app.ai.preprocess import preprocess_image

import os
import numpy as np
import tensorflow as tf
import cv2

#derniere couche conv de densenet121
LAST_CONV_LAYER_NAME = "conv5_block16_concat"

def generate_gradcam(image_path:str,save_dir:str)->str :
    #charger model 
    model=get_model()
    
    #preprocessing pou l image : aide dans le calcul de la prediction et des gradients
    preprocessed_image=preprocess_image(image_path)
    
    #lire l image originale avec opencv pour la visualisation 
    original_image = cv2.imread(image_path)
    
    #verification si l image ete lue 
    if original_image is None:
        raise ValueError(f"Impossible de lire l image:{image_path}")
    
    #convertir bgr -> rgb pour affichage correct
    original_image=cv2.cvtColor(original_image,cv2.COLOR_BGR2RGB)
    
    #recuperer la derniere couche conv 
    base_model = model.get_layer("densenet121")
    last_conv_layer=base_model.get_layer(LAST_CONV_LAYER_NAME)
    
    #creer un model intemediaire qui retourne: sortie de la derniere couche conv + prediction finale 
    grad_model = tf.keras.models.Model(
        inputs=model.input,
        outputs=[last_conv_layer.output, model.output]
    )
    
    #enregistrer auto lees operation pour calculer les gradients 
    with tf.GradientTape() as tape:
        #passer l image pretraitee dans le modele intermediaire
        conv_outputs, predictions=grad_model(preprocessed_image)
        #on prend le score de sortie 
        class_score = predictions[:,0]
    #calculer les gradient du score par rapport aux feature maps 
    grads=tape.gradient(class_score,conv_outputs)#forme  (1, 7, 7, 1024) 
    
    #faire la moyenne des gradients sur la dimensions spatiales ==> pour obtenie un poids par feature maps
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
    #retirer la dimension batch des feature maps (car deja  batch contient 1 image donc inutile )
    conv_outputs = conv_outputs[0]
    # construire la carte brute en pondérant chaque feature map
    heatmap = conv_outputs @ pooled_grads[..., tf.newaxis]
    heatmap = tf.squeeze(heatmap)
    #gaarder unq les val positives
    heatmap=tf.maximum(heatmap,0)
      # normaliser entre 0 et 1
    max_val = tf.reduce_max(heatmap)
    if max_val == 0:
        heatmap = np.zeros_like(heatmap)
    else:
        heatmap = heatmap / max_val
        
    # convertir en numpy array
    heatmap = heatmap.numpy()
    
    # redimensionner la heatmap à la taille de l'image originale
    heatmap = cv2.resize(
        heatmap,
        (original_image.shape[1], original_image.shape[0])
    )
    
    # convertir la heatmap en valeurs 0-255
    heatmap_uint8 = np.uint8(255 * heatmap)
    
    # appliquer une palette de couleurs pour mieux visualiser
    heatmap_color = cv2.applyColorMap(heatmap_uint8, cv2.COLORMAP_JET)
    
    # OpenCV travaille en BGR ici
    # original_image est actuellement en RGB, donc on la reconvertit en BGR
    original_bgr = cv2.cvtColor(original_image, cv2.COLOR_RGB2BGR)
    
    # superposer la heatmap colorée sur l'image originale
    superimposed_img = cv2.addWeighted(original_bgr, 0.6, heatmap_color, 0.4, 0)
    
    # créer le dossier de sauvegarde s'il n'existe pas
    os.makedirs(save_dir, exist_ok=True)
    
    # construire le nom du fichier final
    file_name = os.path.basename(image_path)
    save_path = os.path.join(save_dir, f"heatmap_{file_name}")
    
    # sauvegarder l'image finale
    cv2.imwrite(save_path, superimposed_img)
    
    return save_path
    
    