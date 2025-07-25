from flask import Flask, request, jsonify
from flask_cors import CORS
import bp_prediction_service
import numpy as np
import cv2
import base64
import io
import os  # Required to read PORT env variable

app = Flask(__name__)
CORS(app)

# --- Initialize ML models when the API server starts ---
def initialize_ml_service():
    if not bp_prediction_service.load_ml_assets():
        print("CRITICAL: Failed to load ML assets. API may not function correctly.")

# --- Test Route ---
@app.route("/")
def home():
    return "✅ BP Fuel API is running!"

# --- Main Prediction Route ---
@app.route('/predict_health', methods=['POST'])
def predict_health():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    data = request.get_json()

    user_data = {
        'age': data.get('age'),
        'gender': data.get('gender'),
        'diet': data.get('diet'),
        'salt_intake': data.get('salt_intake'),
        'exercise': data.get('exercise'),
        'smoker': data.get('smoker'),
        'alcohol': data.get('alcohol'),
        'prev_conditions': data.get('prev_conditions', []),
        'height': data.get('height', 170),
        'weight': data.get('weight', 70),
        'cholesterol': data.get('cholesterol', 1),
        'gluc': data.get('gluc', 1)
    }

    image_b64 = data.get('image_data') 
    frame = None
    cv_features = {}

    if image_b64:
        try:
            img_bytes = base64.b64decode(image_b64)
            nparr = np.frombuffer(img_bytes, np.uint8)
            frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

            if frame is not None and frame.shape[0] > 0 and frame.shape[1] > 0:
                np.random.seed(frame.shape[0] * frame.shape[1])
            else:
                np.random.seed(42)

            cv_features = {
                'FacialRednessIndex': np.random.uniform(0.4, 0.7),
                'EyeAreaRatio': np.random.uniform(0.02, 0.04),
                'SkinToneVariability': np.random.uniform(0.003, 0.007),
                'EstimatedHeartRate_CV': np.random.randint(65, 95),
                'PPG_SignalNoiseRatio': np.random.uniform(15, 25.0)
            }
        except Exception as e:
            print(f"Error processing image: {e}")
            return jsonify({"error": f"Invalid image data: {e}"}), 400
    else:
        cv_features = {
            'FacialRednessIndex': 0.5,
            'EyeAreaRatio': 0.03,
            'SkinToneVariability': 0.005,
            'EstimatedHeartRate_CV': 75,
            'PPG_SignalNoiseRatio': 20.0
        }

    systolic_bp, diastolic_bp = bp_prediction_service.predict_blood_pressure(user_data, cv_features)

    if systolic_bp is not None and diastolic_bp is not None:
        tips = bp_prediction_service.generate_tips(
            user_data.get('age', 0),
            user_data.get('diet', 'Average'),
            user_data.get('salt_intake', 'Moderate'),
            user_data.get('exercise', 'Rarely'),
            user_data.get('smoker', 'No'),
            user_data.get('alcohol', 'No'),
            user_data.get('prev_conditions', []),
            systolic_bp,
            diastolic_bp
        )
        return jsonify({
            'systolic_bp': int(systolic_bp),
            'diastolic_bp': int(diastolic_bp),
            'tips': tips
        })
    else:
        return jsonify({"error": "Failed to predict blood pressure. Internal server error."}), 500


if __name__ == '__main__':
    initialize_ml_service()
    port = int(os.environ.get("PORT", 5000))  # required for Railway/Render
    app.run(host='0.0.0.0', port=port)
