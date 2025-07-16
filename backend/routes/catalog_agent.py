from fastapi import APIRouter
from models.schemas import TextInput

router = APIRouter()

@router.post("/create")
def create_catalog(input: TextInput):
    return {
        "product_name": "onion",
        "category": "vegetable",
        "description": "Onion is used in cooking. Adds taste to food.",
        "price": "₹50 per kg",
        "unit": "kg",
        "tags": ["onion", "kitchen", "vegetable"],
        "images_available": {
            "status": True,
            "note": "Image generated for onion."
        }
    }
