from fastapi import APIRouter
from models.schemas import TextInput

router = APIRouter()

@router.post("/create")
def create_catalog(input: TextInput):
    return {
        "product_name": "onion",
        "category": "vegetable",
        "description": "Onion is a daily use vegetable in cooking. It adds taste and nutrition to food.",
        "price": "₹50 per kg",
        "unit": "kg",
        "tags": ["onion", "kitchen", "vegetable", "flavor", "cooking"],
        "usage_notes": "Used in curry, chutneys, and as salad.",
        "images_available": {
            "status": True,
            "note": "Image generated for onion.",
            "image_url": "https://cdn.pixabay.com/onion.jpg"
        },
        "recommendations": ["potato", "tomato", "garlic"]
    }

@router.post("/enrich")
def enrich_catalog(input: TextInput):
    return {
        "original_text": input.input_text,
        "translated_text": "10 kilograms of onions at ₹50 per kg",
        "extracted": {
            "product_name": "onion",
            "unit": "kg",
            "quantity": 10,
            "price": 50,
            "currency": "INR"
        },
        "ai_summary": "Listing 10 kg of onions for ₹50/kg. Commonly used in cooking and sold in most markets.",
        "seo_tags": ["onion", "fresh produce", "bulk vegetable", "buy onions"],
        "market_match": {
            "category": "Vegetables",
            "match_score": 0.92
        }
    }

@router.get("/example-template")
def catalog_template():
    return {
        "example_input": "5 litre mustard oil at ₹150 per litre",
        "example_output": {
            "product_name": "Mustard Oil",
            "category": "Edible Oils",
            "description": "Mustard oil is used for cooking. It adds flavor and is considered healthy.",
            "price": "₹150 per litre",
            "unit": "litre",
            "tags": ["mustard oil", "cooking oil", "healthy oil"],
            "usage_notes": "Used in Indian cooking, especially in frying and pickles.",
            "images_available": {
                "status": False,
                "note": "No image provided yet."
            }
        }
    }

@router.post("/validate")
def validate_listing(input: TextInput):
    return {
        "is_valid": True,
        "missing_fields": [],
        "suggestions": [
            "Consider adding an image of the product.",
            "You can also mention packaging type (e.g., loose, bottled)."
        ]
    }

@router.get("/categories")
def get_categories():
    return {
        "available_categories": [
            "Vegetables",
            "Fruits",
            "Grains",
            "Spices",
            "Edible Oils",
            "Dairy",
            "Snacks"
        ]
    }
