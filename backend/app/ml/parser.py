def mock_parse_resume(text: str) -> dict:
    """
    Mock ML function to parse a resume text and extract skills.
    In a real app, this would use an LLM like OpenAI or an NLP model.
    """
    return {
        "extracted_skills": ["Python", "FastAPI", "Machine Learning"],
        "confidence_score": 0.92
    }
