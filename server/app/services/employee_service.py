from app.repositories.employee_repository import EmployeeRepository
from app.schemas.employee import EmployeeCreate
from app.models.employee import Employee
from app.core.exceptions import AppException

class EmployeeService:
    repo: EmployeeRepository

    def __init__(self, repo: EmployeeRepository):
        self.repo = repo

    def create_employee(self, payload: EmployeeCreate):
        existing = self.repo.get_by_email(payload.email)

        if existing:
            raise AppException("Email already exists", 409)
        
        employee = Employee(
            full_name = payload.full_name, 
            email = payload.email,
            department_id = payload.department_id
        )
        return self.repo.create(employee)
    
    def get_all_employees(self):
        return self.repo.get_all()
    
    def get_employee_by_id(self, id: int):
        employee = self.repo.get_by_id(id)
        if not employee:
            raise AppException("Employee not found", 404)
        return employee
        
    def delete_employee(self, employee_id: int):
        return self.repo.delete(employee_id)
