from sqlalchemy.orm import Session
from app.models.image import Image

#creer image
def create_image(bd:Session,user_id: int,original_filename: str,stored_path: str, file_format: str):
    new_image=Image(
        user_id=user_id,
        original_filename=original_filename,
        stored_path=stored_path,
        file_format=file_format
    )
    bd.add(new_image)
    bd.commit()
    bd.refresh(new_image)
    return new_image

#cherche une image par son id 
def get_image_by_id(bd:Session,image_id: int):
    return bd.query(Image).filter(Image.id==image_id).first()

#cherche les image par son id user
def get_images_by_user_id(bd:Session,user_id: int):
    return bd.query(Image).filter(Image.user_idid==user_id).all()

def delete_image(db: Session, image: Image):
    db.delete(image)
    db.commit()
