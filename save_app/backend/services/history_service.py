import json
import os

HISTORY_FILE = "history.json"

def get_history():
    """Retourne tout l'historique des sauvegardes"""
    if not os.path.exists(HISTORY_FILE):
        with open(HISTORY_FILE, "w") as f:
            json.dump([], f)

    with open(HISTORY_FILE, "r") as f:
        history = json.load(f)
    return history

def get_stats():
    """Retourne un résumé pour les graphiques"""
    history = get_history()
    stats = {
        "Quotidienne": 0,
        "Hebdomadaire": 0,
        "Mensuelle": 0,
        "Année": 0
    }
    for entry in history:
        freq = entry.get("frequency")
        if freq in stats:
            stats[freq] += 1
    return stats
