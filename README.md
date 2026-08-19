# SmartTask DevOps

Projet d'examen Microservices/Docker/Jenkins — Master 1 ISI.

## Architecture
- **frontend** : Nginx servant une page statique, consomme l'API backend
- **backend** : API REST Node.js/Express, connectée à PostgreSQL
- **database** : PostgreSQL 16

## Lancement local
```bash
docker compose up -d --build
```
- Frontend : http://localhost:8081
- Backend : http://localhost:3000/api/health

## Branches
- `Dev` : développement
- `Prod` : production

## CI/CD
Pipeline Jenkins multibranch : build, tag, push des images vers Docker Hub (voir Jenkinsfile).
# smarttask-devops
