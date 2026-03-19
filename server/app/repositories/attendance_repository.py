from sqlalchemy.orm import Session
from sqlalchemy import desc
from datetime import date
from typing import Optional, List
from app.models.attendance import Attendance
from app.enums.attendance_status import AttendanceStatus

class AttendanceRepository:
    db: Session

    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, attendance_id: int) -> Optional[Attendance]:
        return self.db.query(Attendance).filter(Attendance.id == attendance_id).first()
    
    def create(self, attendance: Attendance):
        self.db.add(attendance)
        self.db.commit()
        self.db.refresh(attendance)
        return attendance
    
    def update(self, attendance_id: int, new_status: AttendanceStatus) -> Optional[Attendance]:
        db_attendance = self.get_by_id(attendance_id)
        if db_attendance:
            db_attendance.status = new_status
            self.db.commit()
            self.db.refresh(db_attendance)
        return db_attendance

    def get_employee_attendance(self, employee_id: int) -> List[Attendance]:
        return self.db.query(Attendance).filter(
            Attendance.employee_id == employee_id
        ).order_by(desc(Attendance.date)).all()
    
    def get_employee_attendance_on_date(self, employee_id: int, date: date) -> Optional[Attendance]:
        return (
            self.db.query(Attendance)
            .filter(
                Attendance.employee_id == employee_id,
                Attendance.date == date
            )
            .first()
        )

    
    
    

