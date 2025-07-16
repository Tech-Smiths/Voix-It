# -------------------------- main.py --------------------------
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# ---------------------------------------------
# 🧠 Catalog Agent Endpoint Mocks
# ---------------------------------------------

class VoiceInput(BaseModel):
    message: str

class ProductEntry(BaseModel):
    name: str
    description: str
    price: float
    quantity: int

@app.post("/catalog/voice-input")
def process_voice(input: VoiceInput):
    return {
        "product_name": "Aam (Mango)",
        "description": "Fresh local mangoes, sweet and juicy.",
        "price": 60,
        "quantity": 1,
        "status": "Mock: Product extracted and saved."
    }

@app.post("/catalog/add-manual")
def add_product_manual(product: ProductEntry):
    return {
        "status": "Product added",
        "product": product,
        "note": "(Mock) Manually entered product saved to database."
    }

@app.get("/catalog/my-products/{seller_id}")
def list_products(seller_id: str):
    return {
        "seller_id": seller_id,
        "products": [
            {"name": "Turmeric Powder", "price": 80, "quantity": 10},
            {"name": "Amla Juice", "price": 150, "quantity": 5}
        ]
    }

# --------------------------------------------
# 🛠️ Maintenance Agent Endpoint Mocks
# ---------------------------------------------

@app.get("/maintenance/sync-marketplaces")
def sync_marketplaces():
    return {
        "status": "success",
        "message": "(Mock) Catalog synced to ONDC, WhatsApp, and Flipkart."
    }

@app.get("/maintenance/analytics/{seller_id}")
def show_analytics(seller_id: str):
    return {
        "seller_id": seller_id,
        "analytics": {
            "top_selling": "Turmeric Powder",
            "total_orders": 17,
            "revenue": 3120,
            "last_7_days_growth": "+12%"
        }
    }

@app.get("/maintenance/feedback-summary/{seller_id}")
def feedback_summary(seller_id: str):
    return {
        "seller_id": seller_id,
        "feedback": [
            {"rating": 5, "comment": "Very fresh and clean packaging."},
            {"rating": 4, "comment": "Delivery was fast. Quality good."}
        ]
    }

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

# ---------------------------------------------
# 🚚 Logistics/Transport Agent Mocks
# ---------------------------------------------

class TransportRequest(BaseModel):
    pickup_location: str
    drop_location: str
    package_weight: float

@app.post("/logistics/book")
def book_transport(req: TransportRequest):
    return {
        "status": "booked",
        "tracking_id": "MOCK-LOGI-98765",
        "eta": "2025-07-18",
        "details": {
            "pickup": req.pickup_location,
            "drop": req.drop_location,
            "weight": req.package_weight
        }
    }

@app.get("/logistics/track/{tracking_id}")
def track_package(tracking_id: str):
    return {
        "tracking_id": tracking_id,
        "status": "In Transit",
        "last_location": "Hubli",
        "expected_delivery": "2025-07-18"
    }

# ---------------------------------------------
# 🛍️ Marketplace Publishing Agent Mocks
# ---------------------------------------------

@app.get("/marketplace/publish/{platform}")
def publish_catalog(platform: str):
    return {
        "platform": platform,
        "status": "published",
        "message": f"(Mock) Catalog pushed to {platform.capitalize()} successfully."
    }

@app.get("/marketplace/status")
def get_publish_status():
    return {
        "status": "ok",
        "platforms": {
            "ONDC": "published",
            "Flipkart": "pending",
            "WhatsApp": "published"
        }
    }

@app.get("/")
def root():
    return {"message": "Mock backend running with Catalog, Maintenance, WhatsApp, Logistics, and Marketplace agent endpoints in that order."}

# Run using:
# uvicorn main:app --reload
