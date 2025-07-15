from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import requests
import json

router = APIRouter()

# Relevance AI Config
RELEVANCE_API_KEY = "f7750841-ca18-4c52-92e7-14d683e77694:sk-MTU2NGJkYTgtMGU0Ny00MzY2LThhODItM2NlZjliYjk3NTI5"
RELEVANCE_AGENT_ID = "814a7e83-63de-42c6-9c7c-cfa0e64f381f"
RELEVANCE_API_URL = "https://api-f1db6c.stack.tryrelevance.com/latest/agents/trigger"

# --- Input Model ---
class VoiceInput(BaseModel):
    message: str

# --- Endpoint ---
@router.post("/catalog")
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

        response = requests.post(RELEVANCE_API_URL, headers=headers, data=json.dumps(payload))

        if response.status_code == 200:
            result = response.json()

            # Extract the assistant response
            if "message" in result and "content" in result["message"]:
                try:
                    content = json.loads(result["message"]["content"])
                    return content
                except json.JSONDecodeError:
                    raise HTTPException(status_code=500, detail="Agent response not in JSON format")
            else:
                raise HTTPException(status_code=500, detail="Unexpected agent response format")
        else:
            raise HTTPException(status_code=response.status_code, detail="Agent call failed")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
