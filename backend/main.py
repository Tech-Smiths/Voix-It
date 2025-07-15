from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
import json

app = FastAPI(title="Voix’it - AI Selling Assistant", version="1.0.0")

@app.get("/")
def root():
    return {"message": "Voix’it backend is live!"}

# -------- Schemas --------

class VoiceInput(BaseModel):
    message: str

class CustomerMessage(BaseModel):
    user_query: str

class InventoryUpdate(BaseModel):
    product_id: str
    new_stock: int

class MarketplaceInput(BaseModel):
    product_name: str
    price: float
    description: str

class LogisticsRequest(BaseModel):
    pickup_pincode: str
    delivery_pincode: str
    weight: str

# -------- Real Relevance Agent Endpoint --------

RELEVANCE_WEBHOOK_URL = "https://api-f1db6c.stack.tryrelevance.com/latest/agents/hooks/custom-trigger/88309aa7-86f5-4bf4-b6c6-c16f805106ef/74b23827-91f9-4d51-ad74-42ee5df44525"

@app.post("/voice/catalog")
def trigger_agent(input_data: VoiceInput):
    payload = {
        "inputs": {
            "message": {
                "role": "user",
                "content": input_data.message
            }
        }
    }

    headers = {
        "Content-Type": "application/json"
    }

    print("\n📡 Sending request to Relevance Agent Hook...")
    print("Webhook URL:", RELEVANCE_WEBHOOK_URL)
    print("Payload:", json.dumps(payload, indent=2))

    try:
        response = requests.post(RELEVANCE_WEBHOOK_URL, headers=headers, data=json.dumps(payload))
        print("Status Code:", response.status_code)

        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail="Failed to trigger agent webhook")

        agent_output = response.json()
        print("✅ Agent output received.")
        return agent_output

    except Exception as e:
        print("❌ Error:", str(e))
        raise HTTPException(status_code=500, detail=str(e))

# -------- Mocked Agent Endpoints --------

@app.post("/customer/query")
def mock_customer_response(input: CustomerMessage):
    return {
        "reply": "Namaste! Aam ₹60/kg mein uplabdh hai. Aap kitna chahenge?"
    }

@app.post("/inventory/update")
def mock_inventory_update(input: InventoryUpdate):
    return {
        "status": "success",
        "message": f"Stock for product {input.product_id} updated to {input.new_stock} units."
    }

@app.post("/marketplace/publish")
def mock_marketplace_publish(input: MarketplaceInput):
    return {
        "status": "published",
        "platforms": ["WhatsApp", "ONDC"],
        "listing_id": "WX123456",
        "message": "Product listed successfully on selected marketplaces."
    }

@app.post("/logistics/book")
def mock_logistics_booking(input: LogisticsRequest):
    return {
        "status": "booked",
        "tracking_id": "TRK102030",
        "vendor": "Local Transport Partner",
        "estimated_delivery": "2-3 days",
        "message": "Pickup scheduled and tracking ID generated."
    }

# 🧹 Delete a product from catalog
@app.delete("/catalog/delete")
def mock_delete_catalog(product_name: str):
    return {
        "status": "deleted",
        "product": product_name,
        "message": f"Product '{product_name}' has been removed from your catalog."
    }

# 📊 Get catalog/product listing status
@app.get("/catalog/status")
def mock_catalog_status(product_name: str):
    return {
        "product": product_name,
        "status": "active",
        "platforms": ["WhatsApp", "ONDC"],
        "views": 42,
        "orders": 5
    }

# 📈 Analytics for seller
@app.get("/analytics/summary")
def mock_analytics_summary():
    return {
        "top_products": [
            {"name": "Aam", "orders": 12, "revenue": 720},
            {"name": "Nimbu", "orders": 7, "revenue": 210}
        ],
        "total_revenue": 930,
        "repeat_customers": 3,
        "most_active_day": "Saturday"
    }

# 💰 Finance assistant: check loan eligibility
@app.post("/finance/loan-eligibility")
def mock_loan_check(aadhar: str, monthly_sales: float):
    eligible = monthly_sales > 5000
    return {
        "aadhar": aadhar,
        "eligible": eligible,
        "message": "You are eligible for a microloan of ₹10,000." if eligible else "Not eligible yet. Increase sales activity."
    }

# 🗣️ Feedback endpoint
class FeedbackInput(BaseModel):
    user_id: str
    feedback: str

@app.post("/user/feedback")
def mock_feedback(input: FeedbackInput):
    return {
        "status": "received",
        "user_id": input.user_id,
        "thank_you": "Thank you for your feedback!"
    }

# 🔔 Notification Agent (Mock)
@app.post("/notifications/send")
def mock_send_notification(user_id: str, message: str):
    return {
        "status": "sent",
        "user": user_id,
        "message": message,
        "note": "This is a mock notification only."
    }