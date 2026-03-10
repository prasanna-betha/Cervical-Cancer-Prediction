import os
import io
import json
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.applications.densenet import preprocess_input
from PIL import Image
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize Groq client
groq_api_key = os.getenv("GROQ_API_KEY")
groq_client = Groq(api_key=groq_api_key) if groq_api_key else None


@app.route('/')
def index():
    return """
    <h1>CerviScan AI Backend</h1>
    <p>The server is running. Use the frontend to interact with the model.</p>
    <ul>
        <li><a href="/health">Health Check</a></li>
    </ul>
    """


# Model path
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model', 'best_resnet_model.h5')

# Class labels
CLASS_LABELS = [
    "im_Dyskeratotic",
    "im_Koilocytotic",
    "im_Metaplastic",
    "im_Parabasal",
    "im_Superficial-Intermediate"
]

# Only this is normal
NORMAL_CLASS = "Superficial–Intermediate"

# Remaining four are stages
ABNORMAL_CLASSES = {
    "Parabasal": "Stage 1",
    "Metaplastic": "Stage 2",
    "Koilocytotic": "Stage 3",
    "Dyskeratotic": "Stage 4"
}

# Load model
try:
    model = tf.keras.models.load_model(MODEL_PATH, compile=False)
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None


def preprocess_image(image, target_size=(224, 224)):
    """Preprocess image the same way as training."""
    if image.mode != "RGB":
        image = image.convert("RGB")
    image = image.resize(target_size)
    image = np.array(image)
    image = np.expand_dims(image, axis=0)
    image = preprocess_input(image)
    return image


def get_condition_type(classification):
    return "normal" if classification == NORMAL_CLASS else "abnormal"


def get_stage_description(classification):
    if classification == NORMAL_CLASS:
        return "Normal Cell"
    return ABNORMAL_CLASSES.get(classification, "Abnormal Stage")


def format_suggestions(diet_chart, video_topics, disclaimer):
    """
    Return both new and backward-compatible keys
    so old frontend does not crash.
    """
    return {
        "diet_chart": diet_chart,
        "video_topics": video_topics,
        "disclaimer": disclaimer,

        # Backward compatibility for old frontend
        "diet": diet_chart,
        "exercise": [],
        "videos": video_topics
    }


def get_health_suggestions(classification, confidence):
    """Generate diet chart + exercise/wellness YouTube topics."""
    condition_type = get_condition_type(classification)
    stage_description = get_stage_description(classification)

    # For normal class: no diet chart and no videos
    if condition_type == "normal":
        return format_suggestions(
            diet_chart=[],
            video_topics=[],
            disclaimer="Normal cervical cells detected. Maintain a healthy lifestyle and continue regular health checkups."
        )

    # Fallback if no API key
    if not groq_client:
        return format_suggestions(
            diet_chart=[
                "Breakfast: Oats, sprouts, and citrus fruits",
                "Lunch: Brown rice or chapati with dal, spinach, and vegetables",
                "Evening: Pomegranate juice or fruit salad with nuts",
                "Dinner: Light meal with soup, chapati, and steamed vegetables"
            ],
            video_topics=[
                "Yoga for cervical health",
                "Pelvic floor exercises for women",
                "Light exercise for women wellness"
            ],
            disclaimer="This information is for educational and wellness support only. It does not replace consultation, diagnosis, or treatment from a qualified medical professional."
        )

    try:
        prompt = f"""
You are an AI wellness assistant for a cervical cell analysis system.

Prediction details:
- Classification: {classification}
- Category: {condition_type}
- Stage Description: {stage_description}
- Confidence Score: {confidence:.2f}

Instructions:
- Treat only "{NORMAL_CLASS}" as the normal cervical cell class.
- Treat "Dyskeratotic", "Koilocytotic", "Metaplastic", and "Parabasal" as abnormal cervical cell stages.
- Do NOT say the patient has cancer.
- Do NOT use frightening or alarming language.
- Keep the response simple, practical, short, and patient-friendly.
- For abnormal stages, focus on supportive nutrition and simple wellness exercises.
- Mention that the user should consult a gynecologist or doctor.
- Give only:
  1. Diet chart
  2. YouTube topics related to exercise, yoga, pelvic wellness, stretching, and women's health support
  3. Disclaimer

Return valid JSON only in this exact format:
{{
  "diet_chart": [
    "Breakfast: ...",
    "Lunch: ...",
    "Evening: ...",
    "Dinner: ..."
  ],
  "video_topics": [
    "...",
    "...",
    "..."
  ],
  "disclaimer": "..."
}}
"""

        completion = groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"}
        )

        content = json.loads(completion.choices[0].message.content)

        diet_chart = content.get("diet_chart", [
            "Breakfast: Healthy fruits and whole grains",
            "Lunch: Rice or chapati with vegetables and dal",
            "Evening: Light snacks with fruits or nuts",
            "Dinner: Light meal with vegetables and protein"
        ])

        video_topics = content.get("video_topics", [
            "Yoga for cervical health",
            "Pelvic floor exercises for women",
            "Light exercise for women wellness"
        ])

        disclaimer = content.get(
            "disclaimer",
            "This information is for educational and wellness support only and does not replace professional medical advice."
        )

        return format_suggestions(
            diet_chart=diet_chart,
            video_topics=video_topics,
            disclaimer=disclaimer
        )

    except Exception as e:
        print(f"Groq API error: {e}")

        return format_suggestions(
            diet_chart=[
                "Breakfast: Fruits, oats, and protein-rich food",
                "Lunch: Chapati or brown rice with dal and spinach",
                "Evening: Pomegranate, nuts, or soup",
                "Dinner: Light meal with vegetables and chapati"
            ],
            video_topics=[
                "Yoga for cervical health",
                "Pelvic floor exercises for women",
                "Light exercise for women wellness"
            ],
            disclaimer="This information is for educational support only and is not a substitute for professional medical consultation."
        )


@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded"}), 500

    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400

    file = request.files['image']

    try:
        img_bytes = file.read()
        image = Image.open(io.BytesIO(img_bytes))

        processed_image = preprocess_image(image)

        predictions = model.predict(processed_image)
        predicted_class_idx = int(np.argmax(predictions[0]))
        confidence = float(predictions[0][predicted_class_idx])

        raw_label = CLASS_LABELS[predicted_class_idx]
        display_label = raw_label.replace("im_", "").replace("-", "–")

        condition_type = get_condition_type(display_label)
        stage_description = get_stage_description(display_label)

        suggestions = get_health_suggestions(display_label, confidence)

        result = {
            "class": display_label,
            "raw_class": raw_label,
            "confidence": confidence,
            "condition_type": condition_type,
            "stage_description": stage_description,
            "all_predictions": {
                label.replace("im_", "").replace("-", "–"): float(score)
                for label, score in zip(CLASS_LABELS, predictions[0])
            },
            "suggestions": suggestions
        }

        return jsonify(result)

    except Exception as e:
        return jsonify({"error": f"Prediction failed: {str(e)}"}), 500


@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        "status": "ok",
        "model_loaded": model is not None
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)