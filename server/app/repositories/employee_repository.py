from sqlalchemy.orm import Session
from app.models.employee import Employee
from app.models.department import Department

class EmployeeRepository:
    db: Session

    def __init__(self, db: Session):
        self.db = db

    def create(self, employee: Employee):
        self.db.add(employee)
        self.db.commit()
        self.db.refresh(employee)
        return employee
    
    def get_all(self):
        # return self.db.query(Employee).all()
        return (
            self.db.query(Employee)
            .join(Employee.department)
            .all()
        )
    
    def get_by_email(self, email: str):
        return self.db.query(Employee).filter(Employee.email == email).first()
    
    def get_by_id(self, id: int):
        return self.db.query(Employee).filter(Employee.id == id).first()
    
    def delete(self, employee_id: int) -> bool:
        db_employee = self.db.query(Employee).filter(Employee.id == employee_id).first()
        if not db_employee:
            return False

        self.db.delete(db_employee)
        self.db.commit()
        return True
    