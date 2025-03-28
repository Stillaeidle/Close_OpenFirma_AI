from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime, timedelta
import numpy as np
from tensorflow.keras.models import load_model
from sklearn.preprocessing import MinMaxScaler
import joblib
import random
import psycopg2
from tensorflow.keras.models import load_model


from db import db
from models import GreenhouseHeader, GreenhouseDetails
from greenhouse import greenhouse_bp, generate_daily_data

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Configuration de la base de données PostgreSQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:2381@localhost:5432/Firma-Fertigation'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

def get_db_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="Firma-Fertigation",
        user="postgres",
        password="2381"
    )
    return conn

db.init_app(app)
migrate = Migrate(app, db)

# Charger le modèle CNN-LSTM
#model = load_model('cnn_lstm_model.h5')
# Charger le modèle mis à jour
model = load_model('PSO_Stacked-LSTM.h5')

# Charger les scalers pour normaliser les données d'entrée et de sortie
scaler_features = joblib.load('scaler_features.pkl')
scaler_targets = MinMaxScaler()

# Charger les paramètres du scaler pour les cibles
min_ = np.load('scaler_targets_min.npy')
scale_ = np.load('scaler_targets.npy')

# Recréer le scaler avec les paramètres chargés pour les cibles
scaler_targets = MinMaxScaler(feature_range=(0, 1))
scaler_targets.min_, scaler_targets.scale_ = min_, scale_

def generate_predictions(input_data):
    input_data = np.array(input_data)
    # Redimensionner les données d'entrée pour qu'elles soient 2D avant la normalisation
    original_shape = input_data.shape
    input_data_reshaped = input_data.reshape(-1, input_data.shape[-1])
    # Normaliser les données d'entrée
    input_data_normalized = scaler_features.transform(input_data_reshaped)
    # Restaurer la forme originale des données normalisées
    input_data_normalized = input_data_normalized.reshape(original_shape)
    predictions = model.predict(input_data_normalized)

    # Assuming the model output shape is (batch_size, 32), reshape it to (batch_size, 8, 4) before inverse transform
    predictions_reshaped = predictions.reshape(predictions.shape[0], 8, -1)

    # Dé-normaliser les données de sortie
    predictions_denormalized = scaler_targets.inverse_transform(predictions_reshaped.reshape(-1, predictions_reshaped.shape[-1]))
    predictions_denormalized = predictions_denormalized.reshape(predictions_reshaped.shape)

    return predictions_denormalized

@app.route('/api/predict', methods=['POST'])
def predict():
    data = request.json
    input_data = data['input_data']
    greenhouse_id = data['greenhouse_id']
    predictions = generate_predictions(input_data)

    start_date = datetime.now().date()  # Use only date part
    dates = [(start_date + timedelta(days=i)).strftime("%d/%m/%Y") for i in range(8)]

    result = {
        'dates': dates,
        'predictions': predictions.tolist()
    }

    quantite_d_eau, nutriment_n, nutriment_p, nutriment_k = predictions[0][0]

    # Convertir les valeurs en types natifs
    quantite_d_eau = float(quantite_d_eau)
    nutriment_n = float(nutriment_n)
    nutriment_p = float(nutriment_p)
    nutriment_k = float(nutriment_k)

    if quantite_d_eau is not None and nutriment_n is not None and nutriment_p is not None and nutriment_k is not None:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT 1 FROM greenhouse_details WHERE id_greenhouse = %s AND date = %s
        """, (greenhouse_id, start_date))

        exists = cursor.fetchone()

        if exists:
            cursor.execute("""
                UPDATE greenhouse_details
                SET quantite_d_eau = %s, nutriment_n = %s, nutriment_p = %s, nutriment_k = %s
                WHERE id_greenhouse = %s AND date = %s
            """, (quantite_d_eau, nutriment_n, nutriment_p, nutriment_k, greenhouse_id, start_date))

        conn.commit()
        cursor.close()
        conn.close()

    return jsonify(result)

@app.route('/api/health', methods=['GET'])
def health_check():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute("SELECT 1") # Simple query to check connection
        db_check_result = cursor.fetchone()
        db_healthy = bool(db_check_result and db_check_result[0] == 1)

        cursor.execute("""
            SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'public'
        """)
        tables_result = cursor.fetchall()
        table_names = [table[0] for table in tables_result]

        db_info = {
            "healthy": db_healthy,
            "tables": table_names
        }

        cursor.close()
        conn.close()

        if db_healthy:
            return jsonify({"status": "OK", "database": db_info}), 200
        else:
            return jsonify({"status": "ERROR", "database": db_info, "message": "Database check query failed"}), 500

    except Exception as e:
        return jsonify({"status": "ERROR", "database": {"healthy": False, "tables": []}, "message": str(e)}), 500


# Enregistrer le blueprint des routes de la serre
app.register_blueprint(greenhouse_bp)

if __name__ == '__main__':
    print(datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    scheduler = BackgroundScheduler()
    scheduler.add_job(func=generate_daily_data, trigger='cron', hour=11, minute=56)
    scheduler.start()

    try:
        app.run(debug=True)
    except (KeyboardInterrupt, SystemExit):
        scheduler.shutdown()