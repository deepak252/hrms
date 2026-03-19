from app.repositories.attendance_repository import AttendanceRepository
from app.schemas.attendance import AttendanceCreate
from app.models.attendance import Attendance

class AttendanceService:
    repo: AttendanceRepository

    def __init__(self, repository: AttendanceRepository):
        self.repo = repository
    
    def mark_attendance(self, payload: AttendanceCreate):
        attendance = self.repo.get_employee_attendance_on_date(employee_id=payload.employee_id, date=payload.date)

        if attendance:
            attendance = self.repo.update(attendance, payload.status)
        else:
            attendance = self.repo.create(
                attendance=Attendance(
                    employee_id=payload.employee_id,
                    date=payload.date,
                    status=payload.status
                )
            )
        return attendance
    
    def get_employee_attendance(self, employee_id: int):
        return self.repo.get_employee_attendance(employee_id)
    