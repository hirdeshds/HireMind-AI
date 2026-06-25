from sqlalchemy import Column, Integer, String
from app.db.base import Base

class CandidateDB(Base):
    __tablename__ = "candidates"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    skills = Column(String)  # Storing as comma separated string for simplicity
    experience_years = Column(Integer, default=0)
