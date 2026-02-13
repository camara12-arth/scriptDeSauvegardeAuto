from flask import Flask, jsonify
from flask_cors import CORS
from routes.backup_routes import backup_bp
from routes.history_routes import history_bp
from apscheduler.schedulers.background import BackgroundScheduler
from services.backup_service import handle_backup
from services.history_service import get_history
import datetime

app = Flask(__name__)
CORS(app, origins=['http://localhost:5173'])

app.register_blueprint(backup_bp)
app.register_blueprint(history_bp)

@app.route("/api/test", methods=["GET"])
def test():
    return jsonify({
        "success": True,
        "message": "Backend fonctionne correctement "
    })

# ============================
# SCHEDULER POUR BACKUPS AUTO
# ============================

scheduler = BackgroundScheduler()
scheduler.start()

def run_scheduled_backups():
    """
    Vérifie l'historique et exécute les backups planifiés selon la fréquence
    """
    history = get_history()
    now = datetime.datetime.now()
    
    for entry in history:
        source = entry.get("source")
        destination = entry.get("destination")
        frequency = entry.get("frequency")
        last_backup_time_str = entry.get("last_backup", None)

        # Convertir la date du dernier backup
        last_backup_time = None
        if last_backup_time_str:
            last_backup_time = datetime.datetime.fromisoformat(last_backup_time_str)

        # Déterminer si c'est le moment de lancer la sauvegarde
        do_backup = False

        if frequency == "Quotidienne":
            if not last_backup_time or (now - last_backup_time).days >= 1:
                do_backup = True
        elif frequency == "Hebdomadaire":
            if not last_backup_time or (now - last_backup_time).days >= 7:
                do_backup = True
        elif frequency == "Mensuelle":
            if not last_backup_time or now.month != last_backup_time.month:
                do_backup = True
        elif frequency == "Année":
            if not last_backup_time or now.year != last_backup_time.year:
                do_backup = True

        # Lancer le backup si nécessaire
        if do_backup:
            success, filename = handle_backup({
                "source": source,
                "destination": destination,
                "frequency": frequency
            })
            if success:
                # Mettre à jour la date du dernier backup
                entry["last_backup"] = now.isoformat()
                print(f"Sauvegarde auto réussie : {filename}")
            else:
                print(f"Échec de la sauvegarde auto : {filename}")

# Lancer la fonction toutes les 24h
scheduler.add_job(run_scheduled_backups, 'interval', hours=24)

# ============================
# LANCEMENT DU SERVEUR
# ============================
if __name__ == "__main__":
    app.run(debug=True)
