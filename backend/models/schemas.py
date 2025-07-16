from pydantic import BaseModel
from typing import Optional

class TextInput(BaseModel):
    input_text: str
    language: str = "en"

class VoiceInput(BaseModel):
    audio_base64: str  # Simulated audio input

class InventoryUpdate(BaseModel):
    product_id: str
    new_stock: int

class WhatsAppQuery(BaseModel):
    user_query: str

class DeliveryRequest(BaseModel):
    pickup: str
    drop: str
    product: str
    weight: Optional[str] = None
    delivery_mode: Optional[str] = "Standard"