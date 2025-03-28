from db import db

class GreenhouseHeader(db.Model):
    __tablename__ = 'greenhouse_header'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    length = db.Column(db.Float, nullable=False)
    width = db.Column(db.Float, nullable=False)
    height = db.Column(db.Float, nullable=False)
    systeme_d_irrigation = db.Column(db.String(255), nullable=False)

class GreenhouseDetails(db.Model):
    __tablename__ = 'greenhouse_details'
    id = db.Column(db.Integer, primary_key=True)
    id_greenhouse = db.Column(db.Integer, db.ForeignKey('greenhouse_header.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    saison = db.Column(db.String(255), nullable=False)
    stage_de_croissance = db.Column(db.String(255), nullable=False)
    type_de_variete = db.Column(db.String(255), nullable=False)
    previsions_meteorologiques = db.Column(db.String(255), nullable=False)
    temperature_de_l_air = db.Column(db.Float, nullable=False)
    humidite_relative = db.Column(db.Float, nullable=False)
    radiation_solaire = db.Column(db.Float, nullable=False)
    co2_atmospherique = db.Column(db.Float, nullable=False)
    temperature_du_sol = db.Column(db.Float, nullable=False)
    humidite_du_sol = db.Column(db.Float, nullable=False)
    conductivite_electrique = db.Column(db.Float, nullable=False)
    ph_du_sol = db.Column(db.Float, nullable=False)
    concentration_en_n = db.Column(db.Float, nullable=False)
    concentration_en_p = db.Column(db.Float, nullable=False)
    concentration_en_k = db.Column(db.Float, nullable=False)
    quantite_d_eau = db.Column(db.Float, nullable=True)
    nutriment_n = db.Column(db.Float, nullable=True)
    nutriment_p = db.Column(db.Float, nullable=True)
    nutriment_k = db.Column(db.Float, nullable=True)
