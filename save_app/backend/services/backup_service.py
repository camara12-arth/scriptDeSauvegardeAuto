from utils.file_utils import create_backup
import json
import os
from datetime import datetime

HISTORY_FILE = "history.json"

def save_history(entry):
    """Sauvegarde ou met à jour l'historique dans history.json"""
    if not os.path.exists(HISTORY_FILE):
        with open(HISTORY_FILE, "w") as f:
            json.dump([], f, indent=4)

    with open(HISTORY_FILE, "r") as f:
        history = json.load(f)

    # Cherche si ce backup existe déjà pour mettre à jour last_backup
    updated = False
    for h in history:
        if h.get("source") == entry.get("source") and h.get("destination") == entry.get("destination") and h.get("frequency") == entry.get("frequency"):
            # Met à jour le fichier et last_backup
            h["filename"] = entry.get("filename")
            h["status"] = entry.get("status")
            h["last_backup"] = entry.get("last_backup")
            updated = True
            break

    if not updated:
        # Si nouveau backup, ajoute last_backup
        history.append(entry)

    with open(HISTORY_FILE, "w") as f:
        json.dump(history, f, indent=4)

def handle_backup(data):
    source = data.get("source")
    destination = data.get("destination")
    frequency = data.get("frequency")

    if not source or not destination or not frequency:
        return False, "Champs manquants"

    success, result = create_backup(source, destination)

    # Ajoute la date du backup
    last_backup_time = datetime.now().isoformat() if success else None

    entry = {
        "filename": result if success else None,
        "source": source,
        "destination": destination,
        "frequency": frequency,
        "status": "Succès" if success else "Échec",
        "last_backup": last_backup_time
    }

    save_history(entry)
    return success, result
