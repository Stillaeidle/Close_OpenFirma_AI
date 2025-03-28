from flask import Blueprint, request, jsonify
from db import db
from models import GreenhouseHeader, GreenhouseDetails
import random
from datetime import datetime, timedelta
import psycopg2



greenhouse_bp = Blueprint('greenhouse', __name__)

def get_db_connection():
    conn = psycopg2.connect(
        host="localhost",
        database="Firma-Fertigation",
        user="postgres",
        password="2381"
    )
    return conn

# Définir les plages de valeurs pour chaque saison
saisons = {
    'Printemps': {'temp_min': 10, 'temp_max': 20, 'humid_min': 50, 'humid_max': 70},
    'Été': {'temp_min': 20, 'temp_max': 35, 'humid_min': 40, 'humid_max': 60},
    'Automne': {'temp_min': 10, 'temp_max': 20, 'humid_min': 50, 'humid_max': 70},
    'Hiver': {'temp_min': 0, 'temp_max': 10, 'humid_min': 30, 'humid_max': 50}
}

# Prévisions météorologiques possibles
previsions_meteorologiques = ['ensoleillé', 'nuageux', 'pluvieux']

def generate_daily_data():
    print("generate_daily_data called")  # Ajoutez cette ligne pour déboguer

    # Récupérer toutes les serres
    greenhouses = GreenhouseHeader.query.all()
    
    # Déterminer la date actuelle et la saison
    date_actuelle = datetime.now().date()
    mois = date_actuelle.month
    if 3 <= mois <= 5:
        saison = 'Printemps'
    elif 6 <= mois <= 8:
        saison = 'Été'
    elif 9 <= mois <= 11:
        saison = 'Automne'
    else:
        saison = 'Hiver'
    
    for greenhouse in greenhouses:
        # Déterminer le stage de croissance basé sur la dernière entrée
        dernier_detail = GreenhouseDetails.query.filter_by(id_greenhouse=greenhouse.id).order_by(GreenhouseDetails.date.desc()).first()
        if dernier_detail:
            stage_de_croissance = dernier_detail.stage_de_croissance
        else:
            stage_de_croissance = 'germination'  # ou une autre valeur par défaut

        # Générer les valeurs aléatoires pour les paramètres
        temperature_de_l_air = round(random.uniform(saisons[saison]['temp_min'], saisons[saison]['temp_max']), 2)
        humidite_relative = round(random.uniform(saisons[saison]['humid_min'], saisons[saison]['humid_max']), 2)
        radiation_solaire = round(random.uniform(100, 1000), 2)
        co2_atmospherique = round(random.uniform(350, 450), 2)
        temperature_du_sol = round(random.uniform(temperature_de_l_air - 5, temperature_de_l_air), 2)
        humidite_du_sol = round(random.uniform(humidite_relative - 10, humidite_relative), 2)
        conductivite_electrique = round(random.uniform(0.5, 2.5), 2)
        ph_du_sol = round(random.uniform(5.5, 7.5), 2)
        concentration_en_n = round(random.uniform(10, 40), 2)
        concentration_en_p = round(random.uniform(10, 40), 2)
        concentration_en_k = round(random.uniform(10, 40), 2)
        previsions_meteo = random.choice(previsions_meteorologiques)

        # Créer une nouvelle entrée de GreenhouseDetails
        new_detail = GreenhouseDetails(
            id_greenhouse=greenhouse.id,
            date=date_actuelle,
            saison=saison,
            stage_de_croissance=stage_de_croissance,
            type_de_variete=greenhouse.systeme_d_irrigation,  # Exemple: utilisez le type de variété de la serre
            previsions_meteorologiques=previsions_meteo,
            temperature_de_l_air=temperature_de_l_air,
            humidite_relative=humidite_relative,
            radiation_solaire=radiation_solaire,
            co2_atmospherique=co2_atmospherique,
            temperature_du_sol=temperature_du_sol,
            humidite_du_sol=humidite_du_sol,
            conductivite_electrique=conductivite_electrique,
            ph_du_sol=ph_du_sol,
            concentration_en_n=concentration_en_n,
            concentration_en_p=concentration_en_p,
            concentration_en_k=concentration_en_k,
            quantite_d_eau=None,
            nutriment_n=None,
            nutriment_p=None,
            nutriment_k=None
        )

        # Ajouter la nouvelle entrée à la session
        db.session.add(new_detail)

    # Commiter la transaction
    db.session.commit()
    print("Data generation complete")  


@greenhouse_bp.route('/api/generate', methods=['POST'])
def generate():
    generate_daily_data()
    return jsonify({'message': 'Data generated successfully'}), 200



@greenhouse_bp.route('/api/greenhouse_headers', methods=['GET'])
def get_greenhouse_headers():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM greenhouse_header")
    rows = cursor.fetchall()
    column_names = [desc[0] for desc in cursor.description]
    cursor.close()
    conn.close()

    greenhouse_header = [dict(zip(column_names, row)) for row in rows]
    return jsonify(greenhouse_header)

@greenhouse_bp.route('/api/greenhouse_header/<int:greenhouse_id>', methods=['GET'])
def get_greenhouse_headerById(greenhouse_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM greenhouse_header WHERE id = %s ", (greenhouse_id,))
    rows = cursor.fetchall()
    column_names = [desc[0] for desc in cursor.description]
    cursor.close()
    conn.close()

    greenhouse_header = [dict(zip(column_names, row)) for row in rows]
    return jsonify(greenhouse_header)



@greenhouse_bp.route('/api/greenhouse_headers', methods=['POST'])
def add_greenhouse_header():
    new_header = request.json
    header = GreenhouseHeader(
        name=new_header['name'],
        length=new_header['length'],
        width=new_header['width'],
        height=new_header['height'],
        systeme_d_irrigation=new_header['systeme_d_irrigation']
    )
    db.session.add(header)
    db.session.commit()
    return jsonify({'message': 'New greenhouse header added successfully!'}), 201

@greenhouse_bp.route('/api/greenhouse_details/<int:greenhouse_id>', methods=['GET'])
def get_greenhouse_details(greenhouse_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM greenhouse_details WHERE id_greenhouse = %s ORDER BY date DESC", (greenhouse_id,))
    rows = cursor.fetchall()
    column_names = [desc[0] for desc in cursor.description]
    cursor.close()
    conn.close()

    greenhouse_details = [dict(zip(column_names, row)) for row in rows]
    return jsonify(greenhouse_details)

@greenhouse_bp.route('/api/add_greenhouse', methods=['POST'])
def add_greenhouse():
    data = request.json
    name = data['name']
    length = data['length']
    width = data['width']
    height = data['height']

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO greenhouse_header (name, length, width, height)
        VALUES (%s, %s, %s, %s)
    """, (name, length, width, height))
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({'status': 'success'})

@greenhouse_bp.route('/api/save_irrigation_settings', methods=['PUT'])
def save_irrigation_settings():
    data = request.json
    greenhouse_id = data['greenhouseId']
    irrigation_process = data['irrigationProcess']
    manual_irrigation_switch = data['manualIrrigationSwitch']

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE greenhouse_header
        SET type_d_irrigation = %s
        WHERE id = %s
    """, (irrigation_process, greenhouse_id))
    conn.commit()

    cursor.execute("""
        UPDATE greenhouse_details
        SET on_pump = %s
        WHERE id_greenhouse = %s
    """, (manual_irrigation_switch, greenhouse_id))
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({'status': 'success'})

@greenhouse_bp.route('/api/update_irrigation_process', methods=['PUT'])
def update_irrigation_process():
    data = request.json
    greenhouse_id = data['greenhouse_id']
    irrigation_process = data['irrigation_process']
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE greenhouse_header SET type_d_irrigation = %s , on_pump = False WHERE id = %s", (irrigation_process, greenhouse_id))
    conn.commit()
    cursor.close()
    conn.close()
    
    return jsonify({"message": "Irrigation process updated successfully"}), 200

@greenhouse_bp.route('/api/update_irrigation_switch', methods=['PUT'])
def update_irrigation_switch():
    data = request.json
    greenhouse_id = data['greenhouse_id']
    switch_state = data['switch_state']

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE greenhouse_header 
        SET on_pump = %s 
        WHERE id = %s
    """, (switch_state, greenhouse_id))
    conn.commit()
    cursor.close()
    conn.close()
    
    return jsonify({"message": "Irrigation switch state updated successfully"}), 200




@greenhouse_bp.route('/api/greenhouse_details', methods=['POST'])
def add_greenhouse_detail():
    new_detail = request.json
    detail = GreenhouseDetails(
        id_greenhouse=new_detail['id_greenhouse'],
        date=new_detail['date'],
        saison=new_detail['saison'],
        stage_de_croissance=new_detail['stage_de_croissance'],
        type_de_variete=new_detail['type_de_variete'],
        previsions_meteorologiques=new_detail['previsions_meteorologiques'],
        temperature_de_l_air=new_detail['temperature_de_l_air'],
        humidite_relative=new_detail['humidite_relative'],
        radiation_solaire=new_detail['radiation_solaire'],
        co2_atmospherique=new_detail['co2_atmospherique'],
        temperature_du_sol=new_detail['temperature_du_sol'],
        humidite_du_sol=new_detail['humidite_du_sol'],
        conductivite_electrique=new_detail['conductivite_electrique'],
        ph_du_sol=new_detail['ph_du_sol'],
        concentration_en_n=new_detail['concentration_en_n'],
        concentration_en_p=new_detail['concentration_en_p'],
        concentration_en_k=new_detail['concentration_en_k'],
        quantite_d_eau=new_detail['quantite_d_eau'],
        nutriment_n=new_detail['nutriment_n'],
        nutriment_p=new_detail['nutriment_p'],
        nutriment_k=new_detail['nutriment_k']
    )
    db.session.add(detail)
    db.session.commit()
    return jsonify({'message': 'New greenhouse detail added successfully!'}), 201


@greenhouse_bp.route('/api/greenhouse_details', methods=['PUT'])
def update_greenhouse_details():
    data = request.json
    greenhouse_id = data['id']
    type_de_variete = data['type_de_variete']
    stage_de_croissance = data['stage_de_croissance']
    systeme_d_irrigation = data['systeme_d_irrigation']


    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE greenhouse_details
        SET type_de_variete = %s, systeme_d_irrigation = %s, stage_de_croissance = %s
        WHERE id_greenhouse = %s
    """, (type_de_variete,systeme_d_irrigation, stage_de_croissance, greenhouse_id))
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({'status': 'success'})




@greenhouse_bp.route('/api/greenhouse_predictions/<int:greenhouse_id>', methods=['GET'])
def get_greenhouse_predictions(greenhouse_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT date, quantite_d_eau, nutriment_n, nutriment_p, nutriment_k
        FROM greenhouse_details
        WHERE id_greenhouse = %s AND date <= NOW()
        ORDER BY date DESC
        LIMIT 15
    """, (greenhouse_id,))
    predictions = cursor.fetchall()
    cursor.close()
    conn.close()
    
    predictions_list = [{
        'date': pred[0].strftime("%d/%m/%Y"),
        'quantite_d_eau': pred[1],
        'nutriment_n': pred[2],
        'nutriment_p': pred[3],
        'nutriment_k': pred[4]
    } for pred in predictions]

    return jsonify(predictions_list)
