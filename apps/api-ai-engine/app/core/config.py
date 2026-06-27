from pydantic_settings import BaseSettings, SettingsConfigDict


def to_asyncpg_url(url: str) -> str:
    # Neon/connection strings ship as postgresql://; asyncpg needs the +asyncpg driver
    if url.startswith("postgresql://"):
        return url.replace("postgresql://", "postgresql+asyncpg://", 1)
    return url


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str = "postgresql://komorebi:komorebi@localhost:5432/komorebi"
    redis_url: str = "redis://localhost:6379"
    port: int = 8000
    cors_origin: str = "*"

    @property
    def async_database_url(self) -> str:
        return to_asyncpg_url(self.database_url)


settings = Settings()
