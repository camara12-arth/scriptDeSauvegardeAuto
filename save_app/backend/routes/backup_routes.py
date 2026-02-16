from flask import Blueprint, request, jsonify
from services.backup_service import handle_backup

backup_bp = Blueprint("backup", __name__)
#definition de la route backup
@backup_bp.route("/api/backup", methods=["POST"])
def backup():
    data = request.get_json()
    
    success, result = handle_backup(data)

    if success:
        return jsonify({
            "success": True,
            "message": "Sauvegarde reussie",
            "file": result
        }), 200
    else:
        return jsonify({
            "success": False,
            "error": result
        }), 400
