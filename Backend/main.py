from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import os, shutil
from ai_agent import run_ai_agent

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

latest_file = None

@app.post("/upload/")
async def upload_excel(file: UploadFile = File(...)):
    global latest_file

    if not file.filename.endswith(".xlsx"):
        return {"error": "Only Excel files allowed"}

    path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    latest_file = path
    return {"message": "Excel uploaded successfully"}

@app.post("/query/")
async def query_ai(query: str):
    if not latest_file:
        return {"error": "Upload Excel first"}

    answer = run_ai_agent(latest_file, query)
    return {"answer": answer}
