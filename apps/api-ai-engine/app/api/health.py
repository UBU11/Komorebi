from fastapi import APIRouter

from app.core.config import settings

router = APIRouter()


@router.get("/healthz")
async def healthz() -> dict[str, object]:
    return {"status": "ok", "service": "api-ai-engine", "port": settings.port}
