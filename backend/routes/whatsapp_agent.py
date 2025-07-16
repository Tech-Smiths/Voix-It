# -------------------------- routes/whatsapp_agent.py --------------------------
from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

# 🧾 Message Schemas
class WhatsAppMessage(BaseModel):
    sender_id: str
    user_query: str

class OrderConfirmation(BaseModel):
    buyer_id: str
    product_id: str
    quantity: int

class BroadcastMessage(BaseModel):
    message: str

# 🧠 WhatsApp Agent Endpoints
@router.post("/message")
def respond_to_query(msg: WhatsAppMessage):
    return {
        "reply": f"Hello! Regarding your query '{msg.user_query}', the product is available. Please confirm order."
    }

@router.post("/confirm-order")
def confirm_order(data: OrderConfirmation):
    return {
        "status": "confirmed",
        "message": f"Order confirmed for {data.quantity} units of {data.product_id} by buyer {data.buyer_id}.",
        "tracking_id": "ORD20250716001"
    }

@router.get("/order-status/{buyer_id}")
def order_status(buyer_id: str):
    return {
        "buyer_id": buyer_id,
        "last_order": {
            "product": "Wheat",
            "quantity": 10,
            "status": "Out for Delivery",
            "ETA": "2 days"
        }
    }

@router.post("/broadcast")
def send_broadcast(msg: BroadcastMessage):
    return {
        "status": "sent",
        "message": f"Broadcast message delivered to all subscribers.",
        "content": msg.message
    }

@router.get("/chat-history/{user_id}")
def get_chat_history(user_id: str):
    return {
        "user_id": user_id,
        "history": [
            {"from": "user", "text": "Do you have rice?"},
            {"from": "bot", "text": "Yes, rice is available for ₹45/kg."},
            {"from": "user", "text": "I want 5kg"},
            {"from": "bot", "text": "Order confirmed for 5kg rice."}
        ]
    }