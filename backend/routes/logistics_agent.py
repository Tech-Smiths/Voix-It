from fastapi import APIRouter
from models.schemas import LogisticsRequest

router = APIRouter()

@router.post("/book")
def book_transport(input: LogisticsRequest):
    return {
        "status": "booked",
        "tracking_id": "TRK102030",
        "pickup_pincode": input.pickup_pincode,
        "delivery_pincode": input.delivery_pincode,
        "weight": input.weight,
        "vendor": "Local Transport Partner",
        "vehicle_type": "Mini Truck",
        "estimated_pickup_time": "2025-07-16 09:30 AM",
        "estimated_delivery": "2-3 days",
        "message": "Pickup scheduled and tracking ID generated."
    }

@router.get("/vendors")
def get_transport_vendors():
    return {
        "available_vendors": [
            {
                "name": "Local Transport Partner",
                "vehicle": "Mini Truck",
                "price_per_km": "₹10",
                "max_weight": "100kg"
            },
            {
                "name": "GramExpress",
                "vehicle": "Two-Wheeler",
                "price_per_km": "₹5",
                "max_weight": "20kg"
            },
            {
                "name": "ONDC Logistics",
                "vehicle": "Van",
                "price_per_km": "₹12",
                "max_weight": "200kg"
            }
        ]
    }

@router.get("/track/{tracking_id}")
def track_order(tracking_id: str):
    return {
        "tracking_id": tracking_id,
        "status": "In Transit",
        "last_update": "2025-07-16 03:15 PM",
        "current_location": "Chengalpattu",
        "estimated_arrival": "2025-07-18",
        "next_step": "Out for delivery tomorrow"
    }

@router.post("/cancel")
def cancel_booking(tracking_id: str):
    return {
        "tracking_id": tracking_id,
        "status": "cancelled",
        "message": "Booking has been cancelled successfully."
    }
