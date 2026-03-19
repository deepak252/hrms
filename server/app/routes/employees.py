from fastapi import APIRouter, Depends
from app.schemas.employee import EmployeeCreate, EmployeeResponse
from app.services.employee_service import EmployeeService
from app.core.dependencies import get_employee_service
from app.core.response import ApiResponse

router = APIRouter(prefix="/employee", tags=["Employee"])

@router.post("/", response_model=ApiResponse, status_code=201)
def create_employee(payload: EmployeeCreate, service: EmployeeService = Depends(get_employee_service)):
    employee = service.create_employee(payload)
    return ApiResponse(message="Employee created", data=EmployeeResponse.model_validate(employee))

@router.get("/", response_model=ApiResponse)
def list_employees(service: EmployeeService = Depends(get_employee_service)):
    employees = service.get_all_employees()
    employee_list = [EmployeeResponse.model_validate(u) for u in employees]
    return ApiResponse(message="Employees list", data=employee_list)

@router.get("/{employee_id}", response_model=ApiResponse)
def get_employee_by_id(employee_id: int, service: EmployeeService = Depends(get_employee_service)):
    employee = service.get_employee_by_id(employee_id)
    return ApiResponse(message="Employee details", data=EmployeeResponse.model_validate(employee))

@router.delete("/{employee_id}", response_model=ApiResponse)
def delete_employee(employee_id: int, service: EmployeeService = Depends(get_employee_service)):
    deleted = service.delete_employee(employee_id)
    return ApiResponse(message="Delete employee", data={"deleted": deleted})
