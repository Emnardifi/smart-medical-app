from app.models.user import User
from app.models.analysis import Analysis
#from app.schemas.auth import ResetPasswordRequest,ForgotPasswordRequest
from app.repository.analysis_repository import create_analysis,get_analysis_by_id,get_analyses_by_user_id,get_analyses_by_image_id
from app.repository.report_repository import create_report,get_report_by_id,get_report_by_analysis_id
from app.core.security import hash_password,verify_password,create_access_token
from sqlalchemy.orm import Session
from fastapi import HTTPException, UploadFile, File #un objet temporaire pour recevoir le fichier envoyé par le client
import os
from fpdf import FPDF

#helpers
def _analysis_exists(analysis):
    if not analysis:
        raise  HTTPException(
            status_code=401,
            detail="analysis not found!"
        )
        
def _analysis_belongs_to_user(analysis,current_user:User):
    if current_user.id!=analysis.user_id and current_user.role != "admin":
        raise  HTTPException(
            status_code=401,
            detail=" this analysis don't belongs to this user!"
        )
        
        
def _generate_pdf_path(analysis_id:int,report_dir:str="backend/reports"):
    os.makedirs(report_dir,exist_ok=True)
    return os.path.join(report_dir, f"report_analysis_{analysis_id}.pdf")

#rq verifier struct de rapport
def _create_pdf(file_path: str, prediction: str, probability: float) -> str:
    try:
        pdf = FPDF()
        pdf.add_page()
        pdf.set_auto_page_break(auto=True, margin=15)
        pdf.set_font("Arial", size=12)

        pdf.cell(0, 10, "Rapport d'analyse", ln=True, align="C")
        pdf.ln(10)

        pdf.cell(0, 10, f"Prediction : {prediction}", ln=True)
        pdf.cell(0, 10, f"Probability : {probability:.4f}", ln=True)

        pdf.output(file_path)
        return file_path

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erreur lors de la génération du PDF : {str(e)}"
        )

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
    _create_pdf(pdf_path)
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
    if not analysis:
         raise HTTPException(
            status_code=500,
            detail="report not found!"
        )
    return report

    