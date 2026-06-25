from fastapi import FastAPI
from app.api import endpoints
from app.db.session import engine
from app.db.base import Base
from app.core.config import settings
from app.db import models # Import models to ensure they are registered with Base

# Create database tables
Base.metadata.create_all(bind=engine)

# Create the main FastAPI application instance
app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Complete backend structure for HireMind AI.",
    version=settings.VERSION
)

# Include the API router from our endpoints file
app.include_router(endpoints.router, prefix=settings.API_V1_STR)

@app.get("/")
def read_root():
    """
    Root endpoint to verify that the application is running.
    """
    return {"message": f"Welcome to the {settings.PROJECT_NAME} API!"}
