# -------------------------- routes/maintanance_agent.py --------------------------
from fastapi import APIRouter
from models.schemas import InventoryUpdate, ProductInfo

router = APIRouter()

# 📦 Dummy database
mock_inventory_db = {
    "P123": {"name": "Tomato", "stock": 50, "price": 30},
    "P124": {"name": "Potato", "stock": 70, "price": 25},
    "P125": {"name": "Rice", "stock": 100, "price": 60}
}

@router.post("/update-stock")
def update_stock(input: InventoryUpdate):
    if input.product_id in mock_inventory_db:
        mock_inventory_db[input.product_id]["stock"] = input.new_stock
        return {
            "status": "success",
            "message": f"Stock updated for {input.product_id} to {input.new_stock} units."
        }
    return {"status": "error", "message": "Product not found in inventory."}

@router.get("/inventory/{product_id}")
def get_product_details(product_id: str):
    if product_id in mock_inventory_db:
        return mock_inventory_db[product_id]
    return {"error": "Product not found"}

@router.get("/inventory/all")
def get_all_inventory():
    return mock_inventory_db

@router.post("/add-product")
def add_product(product: ProductInfo):
    if product.product_id in mock_inventory_db:
        return {"status": "error", "message": "Product already exists."}
    mock_inventory_db[product.product_id] = {
        "name": product.name,
        "stock": product.stock,
        "price": product.price
    }
    return {"status": "success", "message": f"Product {product.name} added to inventory."}

@router.post("/delete-product")
def delete_product(product_id: str):
    if product_id in mock_inventory_db:
        deleted = mock_inventory_db.pop(product_id)
        return {"status": "success", "message": f"{deleted['name']} removed from inventory."}
    return {"status": "error", "message": "Product ID not found."}