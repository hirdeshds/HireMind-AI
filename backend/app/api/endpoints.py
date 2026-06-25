from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.schemas.models import CandidateCreate, CandidateResponse
from app.db.session import get_db
from app.services.candidate_service import CandidateService

router = APIRouter()

@router.get("/health")
def health_check():
    """
    A simple health check endpoint to see if the API is alive.
    """
    return {"status": "ok", "service": "HireMind AI"}

@router.post("/candidates/", response_model=CandidateResponse)
def create_candidate(candidate: CandidateCreate, db: Session = Depends(get_db)):
    """
    Endpoint to receive candidate data and store it in the database.
    """
    service = CandidateService(db)
    return service.create_candidate(candidate)

@router.get("/candidates/", response_model=List[CandidateResponse])
def get_candidates(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retrieve all candidates.
    """
    service = CandidateService(db)
    return service.get_all_candidates(skip=skip, limit=limit)

@router.get("/candidates/{candidate_id}", response_model=CandidateResponse)
def get_candidate(candidate_id: int, db: Session = Depends(get_db)):
    """
    Retrieve a specific candidate by ID.
    """
    service = CandidateService(db)
    candidate = service.get_candidate(candidate_id)
    if candidate is None:
        raise HTTPException(status_code=404, detail="Candidate not found")
    return candidate

@router.post("/analyze-resume/")
def analyze_resume(text: str):
    """
    A mock endpoint that simulates analyzing a resume via ML.
    """
    service = CandidateService(None)  # DB not needed for the mock currently
    return service.analyze_resume_text(text)
