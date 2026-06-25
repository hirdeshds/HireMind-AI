from fastapi import FastAPI
from app.api import endpoints

# Create the main FastAPI application instance
app = FastAPI(
    title="HireMind AI Backend",
    description="An easy-to-remember FastAPI backend structure.",
    version="1.0.0"
)

# Include the API router from our endpoints file
app.include_router(endpoints.router, prefix="/api")

@app.get("/")
def read_root():
    """
    Root endpoint to verify that the application is running.
    """
    return {"message": "Welcome to the HireMind AI API!"}
