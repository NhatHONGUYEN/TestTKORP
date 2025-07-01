# 🐾 PetKeeper Frontend

Interface React moderne pour la plateforme de gestion d'animaux PetKeeper, construite avec **Next.js 15** et **TypeScript**.

## 🚀 Stack Technique

- **Framework**: Next.js 15 (App Router)
- **Langage**: TypeScript
- **Styles**: Tailwind CSS
- **Composants UI**: shadcn/ui
- **Client GraphQL**: Apollo Client
- **Icônes**: Lucide React
- **Gestion des dates**: date-fns
- **Polices**: Famille de polices Geist

## 🏗️ Structure du Projet

```
src/
├── app/                    # Next.js App Router
│   ├── animals/           # Pages de gestion des animaux
│   │   ├── [id]/         # Pages d'animaux individuels
│   │   ├── loading.tsx   # Interface de chargement
│   │   ├── not-found.tsx # Page 404
│   │   └── page.tsx      # Page liste des animaux
│   ├── owners/           # Pages de gestion des propriétaires
│   │   ├── [id]/         # Pages de propriétaires individuels
│   │   ├── loading.tsx   # Interface de chargement
│   │   ├── not-found.tsx # Page 404
│   │   └── page.tsx      # Page liste des propriétaires
│   ├── globals.css       # Styles globaux
│   ├── layout.tsx        # Layout racine
│   ├── not-found.tsx     # 404 global
│   └── page.tsx          # Page d'accueil
├── components/            # Composants UI réutilisables
│   ├── ui/               # Composants de base shadcn/ui
│   ├── common/           # Composants communs
│   │   ├── BackButton.tsx
│   │   ├── CircleBackground.tsx
│   │   └── Pagination.tsx
│   └── layout/           # Composants de layout
│       ├── Footer.tsx
│       └── header/       # Composants du header
├── features/             # Composants spécifiques aux fonctionnalités
│   ├── animals/          # Composants liés aux animaux
│   │   └── components/
│   ├── owners/           # Composants liés aux propriétaires
│   │   └── components/
│   └── home/             # Composants de la page d'accueil
├── graphql/              # Requêtes GraphQL
│   └── queries/
├── hooks/                # Hooks React personnalisés
│   └── api/              # Hooks API
├── lib/                  # Fonctions utilitaires
│   ├── avatars.ts        # Génération d'avatars
│   └── utils.ts          # Utilitaires généraux
└── types/                # Définitions TypeScript
```

## 🚀 Démarrage

### Prérequis

- Node.js 18+
- npm, yarn, pnpm, ou bun

### Installation

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev

# Ouvrir http://localhost:3000
```

### Autres Commandes

```bash
# Exécuter le linting
npm run lint

# Vérification des types
npm run type-check
```

## 🎨 Système de Design

### Thème

- **Couleur Principale**: Orange (#f97316)
- **Typographie**: Famille de polices Geist
- **Design**: Moderne, épuré, responsive

### Composants

- **Cartes**: Cartes d'information pour animaux et propriétaires
- **Navigation**: Header responsive avec menu mobile
- **Boutons**: Styles de boutons cohérents avec effets de survol
- **Formulaires**: Composants d'input avec validation
- **Chargement**: Composants skeleton pour une meilleure UX

## 🔌 Intégration GraphQL

### Configuration Apollo Client

```typescript
// src/config/ApolloProvider.tsx
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
```

### Hooks Personnalisés

```typescript
// Exemple: hook useGetAnimals
const { data, loading, error } = useGetAnimals(page, limit);
```

## 📱 Fonctionnalités Principales

### Gestion des Animaux

- **Liste des Animaux**: Liste paginée avec recherche et filtrage
- **Détails des Animaux**: Pages d'informations complètes sur les animaux
- **Cartes d'Animaux**: Belles cartes avec avatars et informations clés
- **Design Responsive**: Fonctionne sur toutes les tailles d'écran

### Gestion des Propriétaires

- **Liste des Propriétaires**: Annuaire paginé des propriétaires
- **Détails des Propriétaires**: Profils complets avec listes d'animaux
- **Informations de Contact**: Affichage email et téléphone
- **Suivi des Relations**: Lien entre propriétaires et animaux

### Navigation

- **App Router**: Routage moderne Next.js
- **Routes Dynamiques**: `/animals/[id]` et `/owners/[id]`
- **États de Chargement**: Composants skeleton pendant le chargement des données
- **Gestion d'Erreurs**: Pages 404 et d'erreur personnalisées

## 🎯 Optimisations de Performance

- **Optimisation d'Images**: Composant Image de Next.js
- **Optimisation de Polices**: Chargement automatique des polices
- **Division de Code**: Automatique avec Next.js App Router
- **Cache**: Gestion du cache Apollo Client
- **Chargement Paresseux**: Composants chargés à la demande

## 🔧 Fichiers de Configuration

- `next.config.ts` - Configuration Next.js
- `tailwind.config.ts` - Configuration Tailwind CSS
- `components.json` - Configuration shadcn/ui
- `tsconfig.json` - Configuration TypeScript
- `eslint.config.mjs` - Configuration ESLint

## 🤝 Directives de Développement

### Structure du Code

- Utiliser TypeScript pour tous les composants
- Suivre les conventions Next.js App Router
- Implémenter des limites d'erreur appropriées
- Utiliser des hooks personnalisés pour les appels API

### Styles

- Utiliser les classes utilitaires Tailwind CSS
- Suivre un espacement et un dimensionnement cohérents
- Implémenter des modèles de design responsive
- Utiliser les composants shadcn/ui quand possible

### Gestion d'État

- Apollo Client pour l'état GraphQL
- Hooks React pour l'état local
- États de chargement et d'erreur appropriés

## 📦 Dépendances

### Dépendances Principales

- `next` - Framework React
- `react` & `react-dom` - Bibliothèque React
- `@apollo/client` - Client GraphQL
- `graphql` - Implémentation GraphQL
- `tailwindcss` - Framework CSS
- `lucide-react` - Bibliothèque d'icônes
- `date-fns` - Utilitaires de date

### Dépendances de Développement

- `typescript` - Vérification de types
- `eslint` - Linting du code
- `@types/*` - Définitions de types

## 🐛 Dépannage

### Problèmes Courants

1. **Connexion GraphQL**: S'assurer que le backend fonctionne sur le port 4000
2. **Erreurs de Build**: Vérifier les types TypeScript et les imports
3. **Problèmes de Style**: Vérifier la configuration Tailwind CSS

### Mode Debug

```bash
# Activer les logs de debug
DEBUG=* npm run dev
```

---

**Partie du projet PetKeeper** 🐾
