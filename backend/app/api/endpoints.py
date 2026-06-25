from fastapi import APIRouter
from app.schemas.models import Candidate

# APIRouter helps us organize our endpoints into different files
router = APIRouter()

@router.get("/health")
def health_check():
    """
    A simple health check endpoint to see if the API is alive.
    """
    return {"status": "ok", "service": "HireMind AI"}

@router.post("/candidates/")
def create_candidate(candidate: Candidate):
    """
    An example endpoint to receive candidate data.
    """
    # In a real application, you would save the candidate to a database here
    return {
        "message": f"Candidate {candidate.name} added successfully!",
        "data": candidate
    }
