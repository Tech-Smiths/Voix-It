import requests
import json
import time

# --- CONFIG ---
TRIGGER_URL = "https://api-d7b62b.stack.tryrelevance.com/latest/agents/trigger"
JOB_STATUS_URL = "https://api-d7b62b.stack.tryrelevance.com/latest/jobs"

API_KEY = "60e95ba1-c4fe-4fd4-bcd2-58e80255a800:sk-ZjE3ZDc1MDUtZTA5Ny00OTEwLWI1YzItZDFjY2MxNTM1Mjk2"
AGENT_ID = "1eb15459-5026-4bf2-89c0-10eb845b96e9"

HEADERS = {
    "Content-Type": "application/json",
    "Authorization": API_KEY
}

# --- INPUT ---
user_input = "10kg onion for 50 rupees per kg"
payload = {
    "message": {
        "role": "user",
        "content": user_input
    },
    "agent_id": AGENT_ID
}

# --- STEP 1: Trigger Agent ---
print("🚀 Sending request to Relevance Agent...")
response = requests.post(TRIGGER_URL, headers=HEADERS, data=json.dumps(payload))
print("🔁 Status Code:", response.status_code)

res_json = response.json()

# --- STEP 2: Extract job_id ---
job_id = res_json.get("job_info", {}).get("job_id")
if not job_id:
    print("❌ No job ID found. Cannot proceed.")
    print("Response:", res_json)
    exit()

print(f"⏳ Job queued. Job ID: {job_id}")

# --- STEP 3: Poll for Result ---
MAX_WAIT = 100  # seconds
POLL_INTERVAL = 10  # seconds
elapsed = 0

while elapsed < MAX_WAIT:
    print(f"🔎 Checking job status... ({elapsed}s)")
    job_response = requests.get(f"{JOB_STATUS_URL}/{job_id}", headers=HEADERS)

    if job_response.status_code == 200:
        job_data = job_response.json()
        state = job_data.get("state")

        if state == "completed":
            try:
                content = json.loads(job_data["outputs"]["message"]["content"])
                print("\n✅ Final Agent Output:")
                print(json.dumps(content, indent=2))
                break
            except Exception as e:
                print("⚠️ Agent completed but output parsing failed:", str(e))
                print("Raw:", job_data)
                break

        elif state in ["failed", "errored"]:
            print(f"❌ Job failed with state: {state}")
            break

        else:
            print(f"🟡 Job still running... (state: {state})")
    else:
        print("❌ Failed to fetch job status:", job_response.text)

    time.sleep(POLL_INTERVAL)
    elapsed += POLL_INTERVAL

else:
    print("❌ Timed out waiting for agent output after 100 seconds.")
