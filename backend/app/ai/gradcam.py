from app.ai.model_loader import get_model
from app.ai.preprocess import preprocess_image

import os
import numpy as np
import tensorflow as tf
import cv2

LAST_CONV_LAYER_NAME = "conv5_block16_concat"


def generate_gradcam(image_path: str, save_dir: str) -> str:
    model = get_model()
    preprocessed_image = preprocess_image(image_path)

    original_image = cv2.imread(image_path)
    if original_image is None:
        raise ValueError(f"Impossible de lire l'image: {image_path}")

    original_image = cv2.cvtColor(original_image, cv2.COLOR_BGR2RGB)

    # recuperation de densenet121 
    base_model = model.get_layer("densenet121")
    last_conv_layer = base_model.get_layer(LAST_CONV_LAYER_NAME)

    #creation d un modele intermediaire : même entrée mais sortie conv + sortie DenseNet
    feature_model = tf.keras.models.Model(
        inputs=base_model.input,
        outputs=[last_conv_layer.output, base_model.output]
    )

    # Récupérer les couches de tête du modèle final
    gap_layer = None
    dropout_layer = None
    dense_layer = None

    for layer in model.layers:
        if isinstance(layer, tf.keras.layers.GlobalAveragePooling2D):
            gap_layer = layer
        elif isinstance(layer, tf.keras.layers.Dropout):
            dropout_layer = layer
        elif isinstance(layer, tf.keras.layers.Dense):
            dense_layer = layer

    if gap_layer is None or dense_layer is None:
        raise ValueError("Impossible de retrouver les couches de classification du modèle.")
    
    #conversion de l image en float32: pour calcul des gradient plus facilement 
    inputs = tf.cast(preprocessed_image, tf.float32)

    with tf.GradientTape() as tape:
        #passage de limage dans le modele 
        conv_outputs, base_outputs = feature_model(inputs, training=False)
        tape.watch(conv_outputs)

        x = gap_layer(base_outputs)

        if dropout_layer is not None:
            x = dropout_layer(x, training=False)

        predictions = dense_layer(x)
        class_score = predictions[:, 0]
        
    #clacul de gradients : influence de chq carte de caracte sur score
    grads = tape.gradient(class_score, conv_outputs)

    if grads is None:
        raise ValueError("GradCAM gradients are None.")
    
    #calcul moyenne des gradients ppour l importance global 
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))

    conv_outputs = conv_outputs[0]
    
    #construction de heatmap 
    heatmap = tf.reduce_sum(conv_outputs * pooled_grads, axis=-1)
    #application de relu : val positif pour les zones 
    heatmap = tf.maximum(heatmap, 0)
    #normalisation : recuperation de maxx 
    max_val = tf.reduce_max(heatmap)
    #applicat de normali entre 0 et 1 pour la convertir en img couleur 
    if float(max_val) == 0.0:
        heatmap = np.zeros_like(heatmap.numpy())
    else:
        heatmap = (heatmap / max_val).numpy()

    # améliorer le focus de la heatmap
    heatmap = np.power(heatmap, 2)
    
    #redimensionnemt a la taille de limage originale
    heatmap = cv2.resize(
        heatmap,
        (original_image.shape[1], original_image.shape[0])
    )

    # Convertir en image couleur
    heatmap_uint8 = np.uint8(255 * heatmap)
    heatmap_color = cv2.applyColorMap(heatmap_uint8, cv2.COLORMAP_JET)

    #  conversion vers bgr 
    original_bgr = cv2.cvtColor(original_image, cv2.COLOR_RGB2BGR)
    
    #superposition avec l'image originale
    superimposed_img = cv2.addWeighted(
        original_bgr,
        0.65,
        heatmap_color,
        0.35,
        0
    )
    os.makedirs(save_dir, exist_ok=True)

    file_name = os.path.basename(image_path)
    save_path = os.path.join(save_dir, f"heatmap_{file_name}")

    cv2.imwrite(save_path, superimposed_img)

    return save_path