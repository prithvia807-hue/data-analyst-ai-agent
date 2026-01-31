import os
from fastapi import FastAPI
import google.generativeai as genai

app = FastAPI()

# Load Gemini API Key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

# Configure Gemini
genai.configure(api_key=GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-pro")


@app.get("/")
def home():
    return {"message": "Backend is running successfully!"}


@app.post("/chat")
async def chat(prompt: str):
    response = model.generate_content(prompt)
    return {"reply": response.text}

