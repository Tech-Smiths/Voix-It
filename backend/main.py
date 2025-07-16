from fastapi import FastAPI
from routes import catalog_agent, maintenance_agent, whatsapp_agent, logistics_agent, whisper_transcriber

app = FastAPI(title="Voix’it - Full AI Backend", version="1.0.0")

@app.get("/")
def root():
    return {"message": "Voix’it AI backend is live."}

# Include all routers
app.include_router(catalog_agent.router, prefix="/catalog")
app.include_router(maintenance_agent.router, prefix="/maintenance")
app.include_router(whatsapp_agent.router, prefix="/whatsapp")
app.include_router(logistics_agent.router, prefix="/logistics")
app.include_router(whisper_transcriber.router, prefix="/voice")