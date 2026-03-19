from sqlalchemy.orm import Session
from app.models.department import Department

class DepartmentRepository:
    db: Session

    def __init__(self, db:Session) -> None:
        self.db = db

    def create(self, department: Department):
        self.db.add(department)
        self.db.commit()
        self.db.refresh(department)
        return department
    
    def get_all(self):
        return self.db.query(Department).all()
    
    def get_by_name(self, name: str):
        return self.db.query(Department).filter(Department.name == name).first()
    
    def get_by_id(self, id: int):
        return self.db.query(Department).filter(Department.id == id).first()
    