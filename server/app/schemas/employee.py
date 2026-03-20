from pydantic import BaseModel
from datetime import datetime

class EmployeeBase(BaseModel):
    full_name: str
    email: str
    department_id: int

class EmployeeCreate(EmployeeBase):
    pass

class EmployeeResponse(EmployeeBase):
    id: int
    department: str
    created_at: datetime

    class Config:
        from_attributes = True