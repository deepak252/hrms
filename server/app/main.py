from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import Base, engine
from app.routes import employees, attendance, departments
from app.core.exceptions import (
    AppException, 
    app_exception_handler, 
    sqlalchemy_exception_handler, 
    unhandled_exception_handler
)
from sqlalchemy.exc import SQLAlchemyError

Base.metadata.create_all(bind=engine)

app = FastAPI(title="HRMS")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def home():
    return {
        "status": "ok",
        "message": "HRMS server"
    }

app.include_router(employees.router, prefix="")
app.include_router(departments.router, prefix="")
app.include_router(attendance.router, prefix="")

app.add_exception_handler(AppException, app_exception_handler)
app.add_exception_handler(SQLAlchemyError, sqlalchemy_exception_handler)
app.add_exception_handler(Exception, unhandled_exception_handler)
