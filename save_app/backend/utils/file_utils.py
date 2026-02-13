import os
import tarfile
import platform
import zipfile
from datetime import datetime
from pathlib import Path

def create_backup(source, destination):
    # Normalisation des chemins pour tous les OS
    source = str(Path(source).expanduser().resolve())
    destination = str(Path(destination).expanduser().resolve())
    
    # Vérification de la source
    if not os.path.exists(source):
        return False, f"Dossier source inexistant: {source}"
    
    # Création de la destination si nécessaire
    os.makedirs(destination, exist_ok=True)
    
    # Récupérer le nom du dossier source
    source_name = os.path.basename(source)  # Ex: "mon_projet"
    
    # Génération du timestamp
    timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    
    # Adaptation selon le système d'exploitation
    system = platform.system()
    
    try:
        if system == 'Windows':
            # Pour Windows: nom = "nomdossier_2026-02-13_14-22-30.zip"
            filename = f"{source_name}_{timestamp}.zip"
            filepath = os.path.join(destination, filename)
            
            with zipfile.ZipFile(filepath, 'w', zipfile.ZIP_DEFLATED) as zipf:
                for root, dirs, files in os.walk(source):
                    for file in files:
                        file_path = os.path.join(root, file)
                        # Chemin relatif dans l'archive
                        arcname = os.path.relpath(file_path, os.path.dirname(source))
                        zipf.write(file_path, arcname)
            
            return True, filename
            
        else:
            # Pour Linux et macOS: nom = "nomdossier_2026-02-13_14-22-30.tar.gz"
            filename = f"{source_name}_{timestamp}.tar.gz"
            filepath = os.path.join(destination, filename)
            
            with tarfile.open(filepath, "w:gz") as tar:
                tar.add(source, arcname=source_name)  # Garde le nom du dossier dans l'archive
            
            return True, filename
            
    except PermissionError:
        return False, "Erreur de permission: impossible d'écrire dans la destination"
    except Exception as e:
        return False, f"Erreur lors de la sauvegarde: {str(e)}"