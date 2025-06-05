# Biblio Nova - Backend

## Description

Backend de l'application Biblio Nova, une plateforme de gestion de bibliothèque développée avec Node.js, Express et TypeScript.

## Technologies Utilisées

- Node.js
- Express.js
- TypeScript
- MongoDB avec Mongoose
- JWT pour l'authentification
- Nodemailer pour les emails
- Jest pour les tests

## Fonctionnalités Principales

### 1. Authentification et Sécurité

- Système d'authentification JWT
- Hachage des mots de passe avec bcryptjs
- Middleware de protection des routes
- Gestion des sessions utilisateurs

### 2. API RESTful

- Architecture REST
- Routes modulaires
- Contrôleurs séparés
- Validation des données

### 3. Base de Données

- MongoDB comme base de données
- Mongoose pour la modélisation des données
- Schémas et modèles TypeScript
- Relations entre les collections

### 4. Fonctionnalités Avancées

- Envoi d'emails avec Nodemailer
- Gestion des fichiers
- Système de notifications
- Logging et monitoring

## Structure du Projet

```
backend/
├── src/
│   ├── config/         # Configuration de l'application
│   ├── controllers/    # Logique métier
│   ├── middleware/     # Middlewares Express
│   ├── models/         # Modèles Mongoose
│   ├── routes/         # Définition des routes
│   ├── utils/          # Utilitaires et helpers
│   └── server.ts       # Point d'entrée de l'application
├── package.json
└── tsconfig.json
```

## Installation

```bash
# Installation des dépendances
npm install

# Démarrage en mode développement
npm run dev

# Build pour la production
npm run build

# Démarrage en production
npm start
```

## Variables d'Environnement

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```env
PORT=5000
MONGODB_URI=votre_uri_mongodb
JWT_SECRET=votre_secret_jwt
EMAIL_USER=votre_email
EMAIL_PASS=votre_mot_de_passe_email
```

## API Endpoints

### Authentification

- POST /api/auth/register - Inscription
- POST /api/auth/login - Connexion
- GET /api/auth/profile - Profil utilisateur

### Livres

- GET /api/books - Liste des livres
- POST /api/books - Création d'un livre
- GET /api/books/:id - Détails d'un livre
- PUT /api/books/:id - Mise à jour d'un livre
- DELETE /api/books/:id - Suppression d'un livre

## Tests

```bash
# Exécution des tests
npm test
```

## Déploiement

1. Build du projet : `npm run build`
2. Démarrage en production : `npm start`

## Sécurité

- Validation des entrées
- Protection contre les injections
- Gestion des CORS
- Rate limiting
- Sanitization des données

## Contribution

1. Fork le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request
