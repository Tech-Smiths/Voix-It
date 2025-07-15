from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import requests
import json

router = APIRouter()

# ✅ Correct Relevance AI config
RELEVANCE_API_KEY = "sk-MTNlMWQ0NjAtZjIzYS00ZjdlLTgwMzUtOWU0NDQwMTBhYjEw"
RELEVANCE_AGENT_ID = "814a7e83-63de-42c6-9c7c-cfa0e64f381f"
RELEVANCE_API_URL = "https://api-f1db6c.stack.tryrelevance.com/latest/agents/trigger"

# 📥 Request body schema
class VoiceInput(BaseModel):
    message: str

# 📤 POST /voice/catalog@router.post("/catalog")
async def get_catalog_data(input_data: VoiceInput):
    try:
        payload = {
            "message": {
                "role": "user",
                "content": input_data.message
            },
            "agent_id": RELEVANCE_AGENT_ID
        }

        headers = {
            "Content-Type": "application/json",
            "Authorization": RELEVANCE_API_KEY
        }

        # 🚨 Print everything you're sending
        print("\n--- Sending Request to Relevance ---")
        print("Payload:", json.dumps(payload, indent=2))
        print("Headers:", headers)

        response = requests.post(RELEVANCE_API_URL, headers=headers, data=json.dumps(payload))

        print("Status Code:", response.status_code)
        print("Response Text:", response.text)

        if response.status_code == 200:
            content = json.loads(response.json()["message"]["content"])
            return content
        else:
            raise HTTPException(status_code=response.status_code, detail=f"{response.status_code}: Agent call failed")

    except Exception as e:
        print("Exception occurred:", str(e))
        raise HTTPException(status_code=500, detail=str(e))