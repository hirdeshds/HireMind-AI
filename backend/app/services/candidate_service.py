from sqlalchemy.orm import Session
from app.repositories.candidate_repository import CandidateRepository
from app.schemas.models import CandidateCreate, CandidateResponse
from app.ml.parser import mock_parse_resume

class CandidateService:
    def __init__(self, db: Session):
        self.repo = CandidateRepository(db)

    def get_candidate(self, candidate_id: int):
        db_obj = self.repo.get_by_id(candidate_id)
        if not db_obj:
            return None
        return self._to_schema(db_obj)

    def get_all_candidates(self, skip: int = 0, limit: int = 100):
        db_objs = self.repo.get_all(skip, limit)
        return [self._to_schema(obj) for obj in db_objs]

    def create_candidate(self, candidate_in: CandidateCreate):
        db_obj = self.repo.create(candidate_in)
        return self._to_schema(db_obj)

    def analyze_resume_text(self, text: str):
        """Simulates analyzing a resume using our ML pipeline."""
        return mock_parse_resume(text)

    def _to_schema(self, db_obj):
        skills_list = db_obj.skills.split(",") if db_obj.skills else []
        return CandidateResponse(
            id=db_obj.id,
            name=db_obj.name,
            email=db_obj.email,
            skills=skills_list,
            experience_years=db_obj.experience_years
        )
