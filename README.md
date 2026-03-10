# CerviScan AI: Cervical Cell Classification

CerviScan AI is an advanced medical imaging tool that uses deep learning (DenseNet201) to classify cervical cell images, supporting early cancer detection through automated analysis.

## 🚀 Features

- **AI-Powered Analysis**: High-precision classification using a trained DenseNet201 model.
- **Real-time Results**: Instant feedback with confidence scores and cell type identification.
- **Personalized Guidance**: Clinical insights based on classification results.
- **Responsive Web UI**: Built with modern React and shadcn-ui for a premium experience.

## 🛠️ Technology Stack

### Frontend
- **Framework**: Vite + React + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **UI Components**: shadcn-ui + Radix UI
- **Icons**: Lucide React

### Backend
- **Framework**: Flask (Python 3.12)
- **AI Framework**: TensorFlow 2.20 (Keras 3)
- **Model**: DenseNet201 (H5 format)
- **Processing**: NumPy & Pillow for image preprocessing

## 💻 Getting Started

### Prerequisites
- Node.js & npm (for frontend)
- Python 3.12 (for backend)

### 1. Setup Backend
```sh
cd backend
# Create virtual environment
py -3.12 -m venv venv
# Activate (Windows)
.\venv\Scripts\activate
# Install dependencies
pip install -r requirements.txt
# Run the server
python app.py
```
The backend will run on `http://localhost:5000`.

### 2. Setup Frontend
```sh
# Install dependencies
npm install
# Start dev server
npm run dev
```
The frontend will run on `http://localhost:8080` (or similar).

## 📊 Classification Types

Our system classifies cells into five distinct categories:
- **Dyskeratotic**: Abnormal keratinized cells.
- **Koilocytotic**: HPV-associated abnormalities.
- **Metaplastic**: Transformation zone activity.
- **Parabasal**: Cells from deeper epithelial layers.
- **Superficial–Intermediate**: Normal mature squamous cells.

## 🔐 Security & Privacy
The system analyzes images locally on your server. Images are only used for the duration of the prediction request and are not stored permanently by default.
