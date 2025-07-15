from fastapi import FastAPI

app = FastAPI(title="Voix’it - AI Selling Assistant", version="1.0.0")

# --- Root Endpoint ---
@app.get("/")
async def root():
    return {"message": "Voix’it API is live!"}

# --- 1. Voice Catalog Agent ---
@app.post("/voice/create")
async def create_catalog():
    return {"agent": "Voice Catalog Agent", "status": "Catalog entry created"}

# --- 2. Product Management Agent ---
@app.post("/product/add")
async def add_product():
    return {"agent": "Product Management Agent", "status": "Product added"}

@app.get("/product/list")
async def list_products():
    return {"agent": "Product Management Agent", "products": ["Product A", "Product B"]}

# --- 3. Marketplace Publishing Agent ---
@app.post("/marketplace/publish")
async def publish_marketplace():
    return {"agent": "Marketplace Publishing Agent", "status": "Published to platform"}

# --- 4. Customer Handling Agent ---
@app.post("/customer/query")
async def customer_query():
    return {"agent": "Customer Handling Agent", "reply": "Response sent to buyer"}

@app.post("/customer/order")
async def confirm_order():
    return {"agent": "Customer Handling Agent", "order_status": "Order confirmed"}

# --- 5. Transport Booking Agent ---
@app.post("/transport/book")
async def book_transport():
    return {"agent": "Transport Booking Agent", "status": "Transport arranged"}

@app.get("/transport/status")
async def transport_status():
    return {"agent": "Transport Booking Agent", "status": "Delivery in progress"}
