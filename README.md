# 🛡️ CyberShield — Cyberbullying Detection & Comparative ML Analysis

A full-stack web application for detecting cyberbullying using **comparative machine learning analysis**. Train, evaluate, and compare multiple ML pipelines side-by-side, then use the best model for real-time text prediction.

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-ML-F7931E?logo=scikit-learn&logoColor=white)

---

## ✨ Features

| Feature | Description |
|---|---|
| **📊 Dashboard** | Overview of datasets, model statuses, and best-performing model at a glance |
| **🧠 Model Training** | Train individual models or all 6 configurations in one click |
| **📈 Comparison** | Side-by-side metrics comparison with interactive charts (F1, Precision, Accuracy) |
| **🔍 Real-Time Prediction** | Classify custom text as cyberbullying or not using any trained model |

## 🤖 ML Pipeline

The app trains and compares **6 model configurations** across two feature extraction techniques:

| Feature Technique | Naive Bayes | SVM | Logistic Regression |
|---|---|---|---|
| **TF-IDF** (15K features) | MultinomialNB | LinearSVC | LogisticRegression |
| **Word Embeddings** (LSA/SVD, 200-dim) | GaussianNB | LinearSVC | LogisticRegression |

Models are ranked by **F1 Score** and the best-performing model is automatically highlighted.

---

## 📁 Project Structure

```
Project_23_02_2026/
├── backend/
│   ├── main.py              # FastAPI app entry point
│   ├── routes.py            # API endpoints
│   ├── ml_pipeline.py       # ML training, evaluation & prediction
│   ├── data_loader.py       # Dataset loading & preprocessing
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main app with sidebar navigation
│   │   ├── api.js           # API client
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Training.jsx
│   │   │   ├── Comparison.jsx
│   │   │   └── Predict.jsx
│   │   ├── index.css        # Global styles
│   │   └── main.jsx         # React entry point
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Python 3.10+**
- **Node.js 18+** & npm

### 1. Clone the repo

```bash
git clone https://github.com/Mr-deezerknight/project_23_02_2026.git
cd project_23_02_2026
```

### 2. Set up the Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux
pip install -r requirements.txt
```

### 3. Add Datasets

Place your CSV datasets in the project root:

```
Project_23_02_2026/
├── cyberbullying_dataset_1.csv
├── cyberbullying_dataset_2.csv
```

> The datasets should contain text and label columns for cyberbullying classification.

### 4. Run the Backend

```bash
cd backend
python main.py
```

The API will be available at **http://localhost:8000** with interactive docs at **http://localhost:8000/docs**.

### 5. Set up & Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at **http://localhost:5173**.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/datasets` | Get dataset statistics |
| `GET` | `/api/models` | List all model configurations & status |
| `POST` | `/api/train` | Train a single model |
| `POST` | `/api/train-all` | Train all 6 models at once |
| `POST` | `/api/predict` | Predict cyberbullying on input text |
| `GET` | `/api/results` | Get cached comparison results |

---

## 🛠️ Tech Stack

**Backend:**
- [FastAPI](https://fastapi.tiangolo.com/) — High-performance async API framework
- [scikit-learn](https://scikit-learn.org/) — ML models, TF-IDF, TruncatedSVD
- [Pandas](https://pandas.pydata.org/) & [NumPy](https://numpy.org/) — Data processing

**Frontend:**
- [React 19](https://react.dev/) — Component-based UI
- [Vite 6](https://vite.dev/) — Lightning-fast build tool
- [Recharts](https://recharts.org/) — Interactive data visualization

---

## 📄 License

This project is for academic and research purposes.
