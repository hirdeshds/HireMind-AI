from sqlalchemy.orm import Session
from app.db.models import CandidateDB
from app.schemas.models import CandidateCreate

class CandidateRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, candidate_id: int):
        return self.db.query(CandidateDB).filter(CandidateDB.id == candidate_id).first()

    def get_all(self, skip: int = 0, limit: int = 100):
        return self.db.query(CandidateDB).offset(skip).limit(limit).all()

    def create(self, candidate: CandidateCreate):
        skills_str = ",".join(candidate.skills)
        db_candidate = CandidateDB(
            name=candidate.name,
            email=candidate.email,
            skills=skills_str,
            experience_years=candidate.experience_years
        )
        self.db.add(db_candidate)
        self.db.commit()
        self.db.refresh(db_candidate)
        return db_candidate
