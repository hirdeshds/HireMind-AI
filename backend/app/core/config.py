from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "HireMind AI"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    
    # Database URL. Defaults to SQLite for easy development.
    DATABASE_URL: str = "sqlite:///./hiremind.db"

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
