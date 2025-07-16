from fastapi import APIRouter
from models.schemas import WhatsAppQuery

router = APIRouter()

@router.post("/reply")
def handle_whatsapp_query(data: WhatsAppQuery):
    return {
        "reply": "Hello! Onion is available at ₹50/kg. Would you like to place an order?"
    }