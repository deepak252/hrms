from sqlalchemy import Column, ForeignKey, Integer, Date, DateTime, Enum, UniqueConstraint, func
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.enums.attendance_status import AttendanceStatus

class Attendance(Base):
    __tablename__ = "attendance"
    __table_args__ = (
        UniqueConstraint("employee_id", "date", name="unique_employee_attendance"),
    )

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id", ondelete="CASCADE"))
    date = Column(Date, nullable=False)
    status = Column(Enum(AttendanceStatus), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    employee = relationship("Employee", back_populates="attendance_records")
