# save_app — Sauvegardes automatiques (full-stack)

Description
- Application pour créer des sauvegardes d'un dossier source vers une destination, enregistrer l'historique et exécuter des sauvegardes planifiées.
- Frontend : React + TypeScript + Vite (UI).  
- Backend : Flask (API) + APScheduler (scheduler) + utils pour créer des archives (.zip sur Windows, .tar.gz sur Linux/macOS).

Prérequis
- Windows (instructions ci‑dessous) ou Linux/macOS
- Python 3.8+
- pip
- Node.js 16+ et npm ou pnpm

Arborescence principale (extrait)
- backend/
  - app.py — point d'entrée Flask, enregistre les blueprints et le scheduler
  - routes/ — routes API (backup, history)
  - services/ — logique métier (création d'archive, historique)
  - utils/file_utils.py — création d'archives
  - requirements.txt — dépendances Python
  - history.json — fichier local généré pour l'historique
- front-end/
  - src/ — code React, composants et hooks
  - vite.config.ts, package.json — config dev/build

Installation (Windows — bash)
- Backend
  ```bash
  cd c:\Users\hamid\Desktop\app-sav-auto\scriptDeSauvegardeAuto\save_app\backend
  python -m pip install -r requirements.txt
  ```
- Frontend
  ```bash
  cd c:\Users\hamid\Desktop\app-sav-auto\scriptDeSauvegardeAuto\save_app\front-end
  npm install
  ```

Lancer en développement
- Démarrer le backend
  ```bash
  cd ...\save_app\backend
  python app.py
  # http://127.0.0.1:5000
  ```
- Démarrer le frontend
  ```bash
  cd ...\save_app\front-end
  npm run dev
  # http://localhost:5173
  ```

Endpoints principaux (backend)
- GET /api/test — test de fonctionnement
- POST /api/backup — créer une sauvegarde  
  Body JSON: { "source": "...", "destination": "...", "frequency": "daily|weekly|monthly|yearly" }
- GET /api/history — récupérer l'historique des sauvegardes (fichier history.json)

Comportement important
- Les chemins sont normalisés (Path.expanduser()); "~" peut être utilisé pour le home sur les systèmes Unix/Windows où pris en charge.
- Sous Windows : archives en .zip ; sous Linux/macOS : .tar.gz.
- APScheduler exécute run_scheduled_backups toutes les 24h (configurable dans app.py).
- history.json stocke les entrées { filename, source, destination, frequency, status, last_backup }.

Conseils d'utilisation et dépannage
- Vérifier les permissions de lecture sur la source et d'écriture sur la destination.
- Si erreur d'écriture : vérifier anti-virus/contrôle d'accès et chemins absolus.
- Pour développer, ouvrir le frontend et le backend en parallèle; le frontend utilise http://127.0.0.1:5000 par défaut pour l'API (CORS autorisé pour http://localhost:5173).

Contribuer / amélioration possible
- Validation et normalisation avancée des chemins côté backend.
- Tests unitaires pour services et utils.
- Interface pour gérer/supprimer les entrées history.json et éditer la planification.