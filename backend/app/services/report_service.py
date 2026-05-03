from app.models.user import User
from app.models.analysis import Analysis
#from app.schemas.auth import ResetPasswordRequest,ForgotPasswordRequest
from app.repository.analysis_repository import create_analysis,get_analysis_by_id,get_analyses_by_user_id,get_analyses_by_image_id
from app.repository.report_repository import create_report,get_report_by_id,get_report_by_analysis_id
from app.repository.image_repository import get_image_by_id
from app.core.security import hash_password,verify_password,create_access_token
from sqlalchemy.orm import Session
from fastapi import HTTPException, UploadFile, File,status #un objet temporaire pour recevoir le fichier envoyé par le client
import os
from fpdf import FPDF
from datetime import datetime
#helpers
def _analysis_exists(analysis):
    if not analysis:
        raise  HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="analysis not found!"
        )
        
def _analysis_belongs_to_user(analysis,current_user:User):
    if current_user.id!=analysis.user_id and current_user.role != "admin":
        raise  HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=" this analysis don't belongs to this user!"
        )
        
        
def _generate_pdf_path(analysis_id:int,report_dir:str="reports"):
    os.makedirs(report_dir,exist_ok=True)
    return os.path.join(report_dir, f"report_analysis_{analysis_id}.pdf")


def _create_pdf(
    file_path: str,
    prediction: str,
    probability: float,
    original_image_path: str,
    heatmap_path: str,
    created_at: datetime,
    user
):
    pdf = FPDF()
    pdf.add_page()

    # ===== HEADER =====
    pdf.set_fill_color(30, 144, 255)
    pdf.set_text_color(255, 255, 255)
    pdf.set_font("Arial", "B", 16)
    pdf.cell(0, 12, "Smart Medical Analysis Report", 0, 1, "C", True)

    pdf.ln(5)

    # reset color
    pdf.set_text_color(0, 0, 0)

    # ===== USER + DATE =====
    pdf.set_font("Arial", size=10)

    pdf.cell(0, 6, f"Patient: {user.full_name}", ln=True)
    pdf.cell(0, 6, f"Email: {user.email}", ln=True)
    pdf.cell(0, 6, f"Created at: {created_at.strftime('%Y-%m-%d %H:%M')}", ln=True)

    pdf.ln(5)

    # ===== RESULT BOX =====
    pdf.set_font("Arial", "B", 12)
    pdf.cell(0, 10, "Results", ln=True)

    pdf.set_font("Arial", size=12)

    # couleur dynamique
    if prediction.lower() == "pneumonia":
        pdf.set_text_color(255, 0, 0)  # rouge
    else:
        pdf.set_text_color(0, 128, 0)  # vert

    pdf.cell(0, 8, f"Prediction: {prediction}", ln=True)

    pdf.set_text_color(0, 0, 0)
    pdf.cell(0, 8, f"Confidence: {probability:.2%}", ln=True)

    pdf.ln(8)

    # ===== IMAGES =====
    pdf.set_font("Arial", "B", 12)
    pdf.cell(0, 10, "Images", ln=True)

    # images côte à côte
    pdf.image(original_image_path, x=10, w=90)
    pdf.image(heatmap_path, x=110, w=90)

    pdf.ln(70)

    # ===== EXPLANATION =====
    pdf.set_font("Arial", size=10)
    pdf.multi_cell(
        0,
        8,
        "Interpretation:\n"
        "- Red zones indicate potential pneumonia regions\n"
        "- Blue zones indicate normal areas\n"
        "- Heatmap explains AI decision"
    )

    pdf.ln(10)

    # ===== FOOTER =====
    pdf.set_font("Arial", "I", 8)
    pdf.cell(0, 10, "Smart Medical App - AI Powered Diagnosis", 0, 0, "C")

    pdf.output(file_path)
#fonct principales 
def generate_report_for_analysis(db:Session,current_user:User,analysis_id:int):
    analysis=get_analysis_by_id(db,analysis_id)
    _analysis_exists(analysis)
    _analysis_belongs_to_user(analysis,current_user)
    existing_report =get_report_by_analysis_id(db,analysis_id)
    if existing_report:
        return{
            "message":"report already exists!",
            "report":existing_report
        }
    pdf_path=_generate_pdf_path(analysis_id)
    
    image = get_image_by_id(db, analysis.image_id)

    _create_pdf(
        file_path=pdf_path,
        prediction=analysis.prediction,
        probability=analysis.probability,
        original_image_path=image.stored_path if image else None,
        heatmap_path=analysis.heatmap_path,
        created_at=analysis.created_at,
        user=current_user
    )
    report=create_report(
        db,
        analysis_id,
        pdf_path,
        status="generated"
    )
    return {
        "message":"report generated successfully!",
        "report":report   
    }
    
def get_report_details(db:Session,analysis_id: int,current_user:User):
    analysis=get_analysis_by_id(db,analysis_id)
    _analysis_exists(analysis)
    _analysis_belongs_to_user(analysis,current_user)
    report=get_report_by_analysis_id(db,analysis_id)
    if not report:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="report not found!"
        )
    return report


"""404 NOT FOUND : analyse ou rapport introuvable.
403 FORBIDDEN : l’analyse existe mais n’appartient pas à l’utilisateur.
500 INTERNAL SERVER ERROR : erreur pendant la génération du PDF."""





