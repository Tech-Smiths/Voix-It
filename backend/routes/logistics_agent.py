from fastapi import APIRouter
from models.schemas import DeliveryRequest

router = APIRouter()

@router.post("/book")
def book_delivery(req: DeliveryRequest):
    return {
        "status": "booked",
        "tracking_id": "TRK123456",
        "eta": "2-3 days",
        "message": f"Pickup from {req.pickup} to {req.drop} for {req.product} scheduled."
    }
