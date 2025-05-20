from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import joblib

# Load the model and scaler
rf = joblib.load('Detector.pkl')
scaler = joblib.load('scaler.pkl')


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], #in real production we need to change it 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Features(BaseModel):
    features: list[float]

@app.post("/predict")
def predict_class(data: Features):
    input_features = data.features

    if len(input_features) != 30:
        raise HTTPException(status_code=400, detail="Expected 30 features (excluding ID and Class).")

    input_array = np.array(input_features).reshape(1, -1)
    scaled_input = scaler.transform(input_array)
    prediction = rf.predict(scaled_input)

    return {"predicted_class": int(prediction[0])}
