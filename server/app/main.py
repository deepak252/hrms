from fastapi import FastAPI
from app.core.database import Base, engine
from app.routes import users
from app.core.exceptions import (
    AppException, 
    app_exception_handler, 
    sqlalchemy_exception_handler, 
    unhandled_exception_handler
)
from sqlalchemy.exc import SQLAlchemyError

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Production fastapi project")

@app.get('/')
def home():
    return {
        "status": "ok",
        "message": "fastapi application"
    }

app.include_router(users.router, prefix="")

app.add_exception_handler(AppException, app_exception_handler)
app.add_exception_handler(SQLAlchemyError, sqlalchemy_exception_handler)
app.add_exception_handler(Exception, unhandled_exception_handler)
