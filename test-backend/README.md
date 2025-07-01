# 🐾 PetKeeper Backend

API GraphQL moderne pour la gestion d'animaux de compagnie, construite avec **NestJS**, **TypeScript** et **Apollo Server**.

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="NestJS Logo" />
</p>

## 🚀 Fonctionnalités

### 🎯 API GraphQL Complète

- **CRUD Animaux** : Gestion complète des profils d'animaux
- **CRUD Propriétaires** : Gestion des informations des propriétaires
- **Relations** : Liaison entre animaux et propriétaires
- **Pagination** : Navigation efficace dans les grandes collections
- **Validation** : Validation robuste des données avec class-validator

### 📊 Analytics & Statistiques

- **Animal le plus âgé** : Recherche dans toute la base de données
- **Espèce la plus commune** : Analyse des distributions d'espèces
- **Propriétaire avec le plus d'animaux** : Statistiques de possession
- **Analytics de poids** : Animal le plus lourd et analyses pondérales
- **Statistiques spécialisées** : Données spécifiques aux chats

### 🔧 Fonctionnalités Techniques

- **Type Safety** : TypeScript strict sur toute l'application
- **Architecture modulaire** : Organisation par domaines métier
- **Gestion d'erreurs** : Système d'exceptions personnalisé
- **Base de données** : MySQL avec TypeORM
- **Documentation** : Schéma GraphQL auto-généré

## 🏗️ Architecture

```
src/
├── modules/                # Modules métier
│   ├── animals/           # Gestion des animaux
│   │   ├── dto/          # Data Transfer Objects
│   │   ├── entities/     # Entités TypeORM
│   │   ├── animals.service.ts
│   │   ├── animals.resolver.ts
│   │   └── animals.module.ts
│   └── owners/            # Gestion des propriétaires
│       ├── dto/          # Data Transfer Objects
│       ├── entities/     # Entités TypeORM
│       ├── owners.service.ts
│       ├── owners.resolver.ts
│       └── owners.module.ts
├── common/                # Utilitaires partagés
│   ├── components/       # Composants réutilisables
│   │   └── weight-analytics/  # Analytics de poids
│   ├── exceptions/       # Gestion d'erreurs
│   ├── filters/          # Filtres d'exceptions
│   ├── graphql/          # Schémas GraphQL
│   └── services/         # Services partagés
│       └── pagination.service.ts
├── app.module.ts          # Module racine
└── main.ts               # Point d'entrée
```

## 🛠️ Stack Technique

### 🚀 Framework & Core

- **NestJS** (11.x) - Framework Node.js progressif
- **TypeScript** (5.x) - Langage typé statiquement
- **Apollo Server** (4.x) - Serveur GraphQL
- **GraphQL** (16.x) - Langage de requête pour APIs

### 🗄️ Base de Données

- **TypeORM** (0.3.x) - ORM TypeScript/JavaScript
- **MySQL** (8.x) - Base de données relationnelle
- **mysql2** - Driver MySQL optimisé

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+
- MySQL 8.x
- npm ou yarn

### Installation

```bash
# Installer les dépendances
npm install

# Configurer la base de données MySQL
# Créer une base de données 'petkeeper' dans MySQL

# Démarrer en mode développement
npm run start:dev

# L'API GraphQL sera disponible sur http://localhost:4000/graphql
```

### Commandes Disponibles

```bash
# Développement
npm run start:dev          # Mode watch avec rechargement automatique
npm run start:debug        # Mode debug avec inspection

# Tests
npm run test               # Tests unitaires
npm run test:e2e           # Tests end-to-end
npm run test:cov           # Couverture de code

# Qualité de Code
npm run lint               # Linting avec correction automatique
npm run format             # Formatage avec Prettier
```

## 📊 API GraphQL

### 🔍 Requêtes Principales

```graphql
# Récupérer tous les animaux avec pagination
query GetAnimals($page: Int, $limit: Int) {
  animals(page: $page, limit: $limit) {
    items {
      id
      name
      species
      breed
      color
      weight
      dateOfBirth
      owner {
        id
        firstName
        lastName
      }
    }
    meta {
      totalItems
      totalPages
      currentPage
      itemsPerPage
    }
  }
}

# Récupérer tous les propriétaires
query GetOwners($page: Int, $limit: Int) {
  owners(page: $page, limit: $limit) {
    items {
      id
      firstName
      lastName
      email
      phoneNumber
      animals {
        id
        name
        species
      }
    }
    meta {
      totalItems
      totalPages
      currentPage
    }
  }
}
```

### 📈 Requêtes de Statistiques

```graphql
# Animal le plus âgé
query GetOldestAnimal {
  oldestAnimal {
    id
    name
    species
    dateOfBirth
    owner {
      firstName
      lastName
    }
  }
}

# Espèce la plus commune
query GetMostCommonSpecies {
  mostCommonSpecies {
    species
    count
  }
}

# Propriétaire avec le plus d'animaux
query GetOwnerWithMostAnimals {
  ownerWithMostAnimals {
    owner {
      id
      firstName
      lastName
    }
    animalCount
  }
}
```

### ✏️ Mutations

```graphql
# Créer un animal
mutation CreateAnimal($input: CreateAnimalInput!) {
  createAnimal(input: $input) {
    id
    name
    species
    breed
    color
    weight
    dateOfBirth
  }
}

# Créer un propriétaire
mutation CreateOwner($input: CreateOwnerInput!) {
  createOwner(input: $input) {
    id
    firstName
    lastName
    email
    phoneNumber
  }
}

# Mettre à jour un animal
mutation UpdateAnimal($id: Int!, $input: UpdateAnimalInput!) {
  updateAnimal(id: $id, input: $input) {
    id
    name
    species
    breed
    color
    weight
  }
}
```

## 🎯 Fonctionnalités Avancées

### 📊 Service de Pagination

```typescript
// Pagination réutilisable pour toutes les entités
const result = await PaginationService.paginate(
  repository,
  page,
  limit,
  ['relations'],
  { createdAt: 'DESC' },
);
```

### 🔍 Analytics de Poids

- **Animal le plus lourd** avec son propriétaire
- **Propriétaire avec le groupe d'animaux le plus lourd**
- **Statistiques pondérales** par espèce

### 🛡️ Gestion d'Erreurs

```typescript
// Système d'erreurs typées
throw ApiError.notFound('Animal', id);
throw ApiError.validationError('Invalid data', details);
throw ApiError.databaseError('Connection failed', error);
```

## 🔧 Configuration

### 📁 Variables d'Environnement

```env
# Base de données MySQL
DATABASE_TYPE=mysql
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=root
DATABASE_PASSWORD=your_password
DATABASE_NAME=petkeeper

# GraphQL
GRAPHQL_PLAYGROUND=true
GRAPHQL_DEBUG=true

# Application
PORT=4000
NODE_ENV=development
```

### 📁 Fichiers de Configuration

- `nest-cli.json` - Configuration NestJS CLI
- `tsconfig.json` - Configuration TypeScript
- `eslint.config.mjs` - Règles ESLint

## 🧪 Tests

### Structure des Tests

```
test/
├── app.e2e-spec.ts       # Tests end-to-end
└── jest-e2e.json         # Configuration Jest E2E

src/
├── **/*.spec.ts           # Tests unitaires
└── **/*.e2e-spec.ts      # Tests d'intégration
```

### Couverture de Code

```bash
npm run test:cov
# Génère un rapport de couverture dans coverage/
```

## 📦 Modules & Services

### 🐾 Module Animals

- **Service** : CRUD + analytics spécialisées
- **Resolver** : Endpoints GraphQL
- **Entities** : Modèle de données Animal
- **DTOs** : Validation des inputs

### 👥 Module Owners

- **Service** : Gestion des propriétaires
- **Resolver** : API GraphQL propriétaires
- **Entities** : Modèle de données Owner
- **Relations** : OneToMany avec Animals

### ⚙️ Module Common

- **Exceptions** : Gestion d'erreurs centralisée
- **Filters** : Filtres GraphQL
- **Services** : Utilitaires partagés (pagination)
- **Components** : Analytics réutilisables

## 🐛 Dépannage

### Problèmes Courants

1. **Connexion MySQL échouée**

   ```bash
   # Vérifier que MySQL est démarré
   sudo service mysql start
   # Vérifier les credentials dans les variables d'environnement
   ```

2. **Port déjà utilisé**

   ```bash
   # Changer le port dans main.ts ou utiliser une variable d'environnement
   PORT=4001 npm run start:dev
   ```

3. **Problèmes de TypeScript**
   ```bash
   # Nettoyer et rebuilder
   rm -rf dist node_modules
   npm install
   ```

### Mode Debug

```bash
# Debug avec inspection
npm run start:debug

# Logs détaillés
DEBUG=* npm run start:dev
```

## 🤝 Contribution

1. **Fork** le repository
2. **Créer** une branche feature (`git checkout -b feature/amazing-feature`)
3. **Commiter** les changements (`git commit -m 'Add amazing feature'`)
4. **Push** sur la branche (`git push origin feature/amazing-feature`)
5. **Ouvrir** une Pull Request

### Standards de Code

- Utiliser TypeScript strict
- Suivre les conventions NestJS
- Ajouter des tests pour les nouvelles fonctionnalités
- Documenter les APIs GraphQL
