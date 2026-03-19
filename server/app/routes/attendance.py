from fastapi import APIRouter, Depends
from app.schemas.attendance import AttendanceCreate, AttendanceResponse
from app.services.attendance_service import AttendanceService
from app.core.dependencies import get_attendance_service
from app.core.response import ApiResponse

router = APIRouter(prefix="/attendance", tags=["Attendance"])

@router.post("/", response_model=ApiResponse, status_code=201)
def mark_attendance(payload: AttendanceCreate, service: AttendanceService = Depends(get_attendance_service)):
    attendance = service.mark_attendance(payload)
    return ApiResponse(message="Attendance marked", data=AttendanceResponse.model_validate(attendance))


@router.get("/employee/{employee_id}", response_model=ApiResponse)
def mark_attendance(employee_id: int, service: AttendanceService = Depends(get_attendance_service)):
    history = service.get_employee_attendance(employee_id)
    attendance_list = [AttendanceResponse.model_validate(u) for u in history]

    return ApiResponse(message="Employee attendance", data=attendance_list)
