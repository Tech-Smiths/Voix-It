# -------------------------- routes/maintanence_agent.py --------------------------
from fastapi import APIRouter
from models.schemas import InventoryUpdate, ProductInfo

router = APIRouter()

# 📦 Dummy Inventory
mock_inventory_db = {
    "P001": {"name": "Wheat", "stock": 80, "price": 45},
    "P002": {"name": "Sugar", "stock": 120, "price": 38},
    "P003": {"name": "Salt", "stock": 200, "price": 18}
}

@router.post("/update-stock")
def update_stock(input: InventoryUpdate):
    if input.product_id in mock_inventory_db:
        mock_inventory_db[input.product_id]["stock"] = input.new_stock
        return {
            "status": "success",
            "message": f"Stock for product {input.product_id} updated to {input.new_stock} units."
        }
    return {"status": "error", "message": "Product ID not found."}

@router.get("/product/{product_id}")
def get_product(product_id: str):
    if product_id in mock_inventory_db:
        return {
            "product_id": product_id,
            **mock_inventory_db[product_id]
        }
    return {"error": "Product not found"}

@router.get("/inventory")
def get_all_products():
    return {
        "inventory": [
            {"product_id": pid, **details} for pid, details in mock_inventory_db.items()
        ]
    }

@router.post("/add")
def add_product(product: ProductInfo):
    if product.product_id in mock_inventory_db:
        return {"status": "error", "message": "Product ID already exists."}
    mock_inventory_db[product.product_id] = {
        "name": product.name,
        "stock": product.stock,
        "price": product.price
    }
    return {"status": "success", "message": f"Product {product.name} added successfully."}

@router.post("/delete")
def delete_product(product_id: str):
    if product_id in mock_inventory_db:
        deleted = mock_inventory_db.pop(product_id)
        return {
            "status": "success",
            "message": f"Product {deleted['name']} deleted successfully."
        }
    return {"status": "error", "message": "Product ID not found."}

@router.get("/alerts/low-stock")
def get_low_stock_alerts():
    low_stock_items = [
        {"product_id": pid, **info} for pid, info in mock_inventory_db.items() if info["stock"] < 50
    ]
    return {
        "low_stock_products": low_stock_items,
        "message": f"{len(low_stock_items)} products have stock less than 50."
    }

@router.get("/price-suggestions")
def get_price_suggestions():
    return {
        "suggestions": [
            {"product_id": "P001", "current_price": 45, "suggested_price": 48},
            {"product_id": "P002", "current_price": 38, "suggested_price": 40},
            {"product_id": "P003", "current_price": 18, "suggested_price": 20}
        ],
        "message": "Based on seasonal trends, consider updating prices."
    }
