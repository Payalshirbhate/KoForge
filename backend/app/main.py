from fastapi import FastAPI
from app.routers import contact,consultation
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="KoForge API",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

app.include_router(contact.router)
app.include_router(consultation.router)

@app.get("/")
def root():
    return {"message": "KoForge Backend is running"}

@app.get("/api/health")
def health_check():
    return {"status": "healthy"}

