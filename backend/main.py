# -------------------------- main.py --------------------------
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# ---------------------------------------------
# 📦 WhatsApp Agent Endpoint Mocks
# ---------------------------------------------

class WhatsAppMessage(BaseModel):
    sender_id: str
    user_query: str

class OrderConfirmation(BaseModel):
    buyer_id: str
    product_id: str
    quantity: int

class BroadcastMessage(BaseModel):
    message: str

@app.post("/whatsapp/message")
def respond_to_query(msg: WhatsAppMessage):
    return {
        "reply": f"(Mock Reply) Product query received: '{msg.user_query}'. Product is available."
    }

@app.post("/whatsapp/confirm-order")
def confirm_order(data: OrderConfirmation):
    return {
        "status": "confirmed",
        "message": f"(Mock) Order placed for {data.quantity} units of {data.product_id} by {data.buyer_id}.",
        "tracking_id": "MOCK-ORDER-12345"
    }

@app.get("/whatsapp/order-status/{buyer_id}")
def order_status(buyer_id: str):
    return {
        "buyer_id": buyer_id,
        "order_status": {
            "product": "Groundnut Oil",
            "quantity": 5,
            "status": "Delivered",
            "delivery_date": "2025-07-14"
        }
    }

@app.post("/whatsapp/broadcast")
def send_broadcast(msg: BroadcastMessage):
    return {
        "status": "sent",
        "content": msg.message,
        "info": "(Mock) Broadcast sent to all sellers."
    }

@app.get("/whatsapp/chat-history/{user_id}")
def get_chat_history(user_id: str):
    return {
        "user_id": user_id,
        "history": [
            {"from": "user", "text": "Can I buy turmeric?"},
            {"from": "bot", "text": "Yes, turmeric is available for ₹80/kg."},
            {"from": "user", "text": "Book 3kg"},
            {"from": "bot", "text": "Order confirmed for 3kg turmeric."}
        ]
    }

@app.get("/")
def root():
    return {"message": "Mock backend is running. All endpoints under /whatsapp/... are available."}

# Run using:
# uvicorn main:app --reload
