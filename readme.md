# 🔍 Fraud Detection Prediction App

This is a full-stack machine learning web application where users can input **30 numerical features** and get a classification prediction (`fraud` or `not fraud`).

- 🧠 **Backend**: FastAPI with a trained Random Forest model  
- 💻 **Frontend**: React-based user interface  
Website is Live at https://product-club-secy-task.vercel.app/
---

## 🚀 Features

- Predict fraud from 30 numerical inputs
- Clean, responsive UI built with React
- Fast and lightweight API using FastAPI
- ML model integrated using `joblib`

---

## 🧰 Tech Stack

| Layer     | Technology         |
|-----------|--------------------|
| Frontend  | React              |
| Backend   | FastAPI            |
| ML Model  | RandomForestClassifier (scikit-learn) |
| Hosting   | Render and Versel |

---

## ⚙️ Setup Instructions

### 1️⃣ Backend (FastAPI)

#### 📁 Directory: `root/`  
Ensure you have your `main.py`, `random_forest_model.pkl`, and `minmax_scaler.pkl` in the same directory.

#### 🔧 Install dependencies

```bash
pip install fastapi uvicorn scikit-learn numpy joblib

 Setup Instructions
 pip install fastapi uvicorn scikit-learn numpy joblib
pip install fastapi[all]
uvicorn main:app --reload
cd frontend
npm install
npm start
