from app.models.user import User
from app.models.analysis import Analysis
#from app.schemas.auth import ResetPasswordRequest,ForgotPasswordRequest
from app.repository.analysis_repository import create_analysis,get_analysis_by_id,get_analyses_by_user_id,get_analyses_by_image_id
from app.repository.image_repository import create_image,get_image_by_id,get_images_by_user_id
from app.core.security import hash_password,verify_password,create_access_token
from sqlalchemy.orm import Session
from fastapi import HTTPException, UploadFile, File #un objet temporaire pour recevoir le fichier envoyé par le client
import os
import uuid
from app.ai.preprocess import preprocess_image
from app.ai.predict import predict_image
from app.ai.gradcam import generate_gradcam


#helpers 
def _extract_extension(filename:str):
    if "." not in filename:
        raise HTTPException(
            status_code=401,
            detail="Invalid file name"
        )
    return filename.rsplit(".",1)[1].lower()

def _validate_image_extension(extension:str):
    extension_list={"jpg","jpeg","png"}
    if extension not in extension_list:
        raise HTTPException(
            status_code=401,
            detail="only jpg, jpeg and png files are uploaded"
        )

def _generate_filename(extension:str):
    return f"analysis_{uuid.uuid4().hex}.{extension}"

def _save_upload_file(upload_file, file_path: str):
    try:
        with open(file_path, "wb") as f:
            content = upload_file.file.read()
            f.write(content)
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Erreur lors de la sauvegarde du fichier"
        )

def _run_ai(image_path:str)-> tuple[str,float,str]:
    try:
        preprossed_image=preprocess_image(image_path)
        prediction,probability=predict_image(preprossed_image)
        heatmap_path=generate_gradcam(image_path,heatmap_save_dir="backend/heatmaps")
        return prediction,probability,heatmap_path
    except Exception:
        raise HTTPException(
            status_code=500,
            detail="ai prediction failed!"
        )
        
#fonction principales 
def create_analysis(db:Session,current_user:User,upload_file: UploadFile ,uploaded_dir:str="backend/uploads"):
    file_extension =_extract_extension(upload_file.filename)
    _validate_image_extension(file_extension)
    os.makedirs(uploaded_dir, exist_ok=True)
    sorted_filename=_generate_filename(file_extension)
    sorted_path=os.path.join(uploaded_dir, sorted_filename)
    _save_upload_file(upload_file, sorted_path)
    image=create_image(
        db,
        current_user.id,
        upload_file.filename,
        sorted_path,
        file_extension
    )
    prediction, probability,heatmap_path=_run_ai(image.stored_path)
    analysis=create_analysis(
        db,
        current_user.id,
        image.id,
        prediction,
        probability,
        heatmap_path,
        status="done"
    )
    return {
        "message":"analysis completed successfully",
        "analysis_id": analysis.id,
        "prediction" : analysis.prediction,
        "probability" : analysis.probability,
        "heatmap_path" : analysis.heatmap_path,
        "status" : analysis.status
    }
    
def get_analysis_details(db:Session,analysis_id: int):
    analysis=get_analysis_by_id(db,analysis_id)
    if not analysis:
         raise HTTPException(
            status_code=500,
            detail="analysis not found!"
        )
    return analysis

def get_user_analyses(db:Session,current_user:User):
    return get_analyses_by_user_id(db,current_user.id)

def get_image_details(db:Session,image_id:int):
    image=get_analyses_by_image_id(db,image_id)
    if not image:
        raise HTTPException(
            status_code=500,
            detail="image not found!"
        )
    return image