from pydantic import BaseModel
from datetime import datetime, date
from app.enums.attendance_status import AttendanceStatus

class AttendanceBase(BaseModel):
    employee_id: int
    date: date
    status: AttendanceStatus

class AttendanceCreate(AttendanceBase):
    pass

class AttendanceResponse(AttendanceBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True