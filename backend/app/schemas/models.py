from pydantic import BaseModel, EmailStr
from typing import List

class CandidateBase(BaseModel):
    name: str
    email: str # Use standard string to avoid extra dependency (email-validator) for now
    skills: List[str] = []
    experience_years: int = 0

class CandidateCreate(CandidateBase):
    pass

class CandidateResponse(CandidateBase):
    id: int
    
    class Config:
        from_attributes = True
