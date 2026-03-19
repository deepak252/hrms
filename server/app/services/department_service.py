from app.repositories.department_repository import DepartmentRepository
from app.schemas.department import DepartmentCreate
from app.models.department import Department
from app.core.exceptions import AppException

class DepartmentService:
    repo: DepartmentRepository

    def __init__(self, repository: DepartmentRepository):
        self.repo = repository
    
    def create_department(self, payload: DepartmentCreate):
        existing = self.repo.get_by_name(payload.name)

        if existing:
            raise AppException("Department already exists", 409)
        
        department = Department(name = payload.name)
        return self.repo.create(department)
    
    def get_all_departments(self):
        return self.repo.get_all()
    
    def get_department_by_id(self, id: int):
        department = self.repo.get_by_id(id)
        if not department:
            raise AppException("Department not found", 404)
        return department