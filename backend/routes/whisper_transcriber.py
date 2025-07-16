from fastapi import APIRouter
from models.schemas import VoiceInput

router = APIRouter()

@router.post("/transcribe")
def transcribe_audio(data: VoiceInput):
    return {
        "transcription": "10 kg onion for 50 rupees per kg"
    }
