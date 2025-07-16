from fastapi import APIRouter
from models.schemas import InventoryUpdate

router = APIRouter()

@router.post("/update-inventory")
def update_inventory(data: InventoryUpdate):
    return {
        "status": "success",
        "message": f"Inventory updated: {data.product_id} now has {data.new_stock} units."
    }