import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    # LLM
    OPENAI_API_KEY: str
    MODEL_NAME: str = "gpt-4o"

    # Vector DB
    QDRANT_URL: str = "http://localhost:6333"
    QDRANT_API_KEY: str | None = None
    COLLECTION_NAME: str = "genai_docs"

    # Database
    DATABASE_URL: str = "postgresql://user:password@localhost:5432/genai_db"

    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"

    # API
    API_DEBUG: bool = True

settings = Settings()
