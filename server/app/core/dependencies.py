from fastapi import Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.repositories.employee_repository import EmployeeRepository
from app.repositories.department_repository import DepartmentRepository
from app.repositories.attendance_repository import AttendanceRepository
from app.services.employee_service import EmployeeService
from app.services.department_service import DepartmentService
from app.services.attendance_service import AttendanceService

def get_employee_service(db: Session = Depends(get_db)):
    repo = EmployeeRepository(db)
    return EmployeeService(repo)

def get_department_service(db: Session = Depends(get_db)):
    repo = DepartmentRepository(db)
    return DepartmentService(repo)

def get_attendance_service(db: Session = Depends(get_db)):
    repo = AttendanceRepository(db)
    return AttendanceService(repo)