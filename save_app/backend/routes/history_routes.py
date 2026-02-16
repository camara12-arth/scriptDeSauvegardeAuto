from flask import Blueprint, jsonify
from services.history_service import get_history, get_stats

history_bp = Blueprint("history", __name__)
#definition de la route history
@history_bp.route("/api/history", methods=["GET"])
def history():
    """Retourne l'historique complet au frontend"""
    data = get_history()
    return jsonify(data), 200

@history_bp.route("/api/stats", methods=["GET"])
def stats():
    """Retourne les stats pour les graphiques"""
    data = get_stats()
    return jsonify(data), 200
