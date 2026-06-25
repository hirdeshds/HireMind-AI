from pydantic import BaseModel
from typing import List

# Pydantic models help us define the shape and type of data we expect
class Candidate(BaseModel):
    name: str
    email: str
    skills: List[str] = []
    experience_years: int = 0
