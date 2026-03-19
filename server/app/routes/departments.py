from fastapi import APIRouter, Depends
from app.schemas.department import DepartmentCreate, DepartmentResponse
from app.services.department_service import DepartmentService
from app.core.dependencies import get_department_service
from app.core.response import ApiResponse

router = APIRouter(prefix="/department", tags=["Department"])

@router.post("/", response_model=ApiResponse, status_code=201)
def create_department(payload: DepartmentCreate, service: DepartmentService = Depends(get_department_service)):
    department = service.create_department(payload)
    return ApiResponse(message="Department created", data=DepartmentResponse.model_validate(department))

@router.get("/", response_model=ApiResponse)
def list_departments(service: DepartmentService = Depends(get_department_service)):
    departments = service.get_all_departments()
    department_list = [DepartmentResponse.model_validate(u) for u in departments]
    return ApiResponse(message="Departments list", data=department_list)

@router.get("/{department_id}", response_model=ApiResponse)
def get_department_by_id(department_id: int, service: DepartmentService = Depends(get_department_service)):
    department = service.get_department_by_id(department_id)
    return ApiResponse(message="Department details", data=DepartmentResponse.model_validate(department))
