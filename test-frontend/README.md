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
│   ├── common/           # Composants communs
│   ├── layout/           # Composants de layout
│   └── ui/               # Composants de base (shadcn/ui)
├── features/             # Composants spécifiques aux fonctionnalités
│   ├── animals/          # Composants liés aux animaux
│   │   └── components/
│   │       ├── animal-detail/   # Composants pour les pages de détail d'animaux
│   │       └── animals/         # Composants pour la liste d'animaux
│   ├── owners/           # Composants liés aux propriétaires
│   │   └── components/
│   └── home/             # Composants de la page d'accueil
│       └── components/
│           └── hero/       # Composants pour la section hero de la page d'accueil
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
- **Générateur de thème**: [ui.jln.dev](https://ui.jln.dev/) - Générateur de couleurs pour shadcn/ui

### Couleurs générées

- **Primary**: `hsl(22.93, 92.59%, 52.35%)` - Orange principal
- **Secondary**: `hsl(34.05, 100%, 85.49%)` - Orange clair
- **Destructive**: `hsl(10.16, 77.87%, 53.92%)` - Rouge d'erreur
- **Ring**: `hsl(24.8, 79.79%, 63.14%)` - Focus ring

### Composants

#### 🎨 Composants UI (shadcn/ui)

- **Base Components**: Button, Card, Input, Badge, Skeleton
- **Navigation**: Navigation-menu, Popover pour les menus
- **Feedback**: Composants pour les états de succès/erreur

#### 🔧 Composants Communs

- **BackButton**: Bouton de retour avec icône et navigation
- **CircleBackground**: Fond décoratif avec cercles animés
- **Pagination**: Navigation entre les pages avec métadonnées

#### 🏠 Layout & Navigation

- **Header**: Navigation responsive avec logo et menu hamburger
- **Footer**: Pied de page avec informations de copyright
- **Mobile Navigation**: Menu mobile avec animations

#### 🐾 Composants Animaux

- **AnimalCard**: Cartes d'animaux avec avatars et informations clés
- **AnimalDetailHeader**: En-tête des pages de détail d'animaux
- **AnimalDetailInfoCard**: Cartes d'information (couleur, poids, etc.)
- **AnimalOwnerInfoCard**: Informations du propriétaire

#### 👥 Composants Propriétaires

- **OwnerCard**: Cartes de propriétaires avec nombre d'animaux
- **OwnerDetailHeader**: En-tête des pages de détail de propriétaires
- **OwnerAnimalsSection**: Section listant les animaux du propriétaire

#### 🏡 Composants Accueil

- **Hero**: Section principale avec call-to-action et image
- **Boutons d'action**: Navigation vers animaux et propriétaires

#### ⚡ États & Interactions

- **Loading States**: Composants skeleton pour le chargement
- **Error Handling**: Pages 404 personnalisées
- **Hover Effects**: Animations et transitions fluides
- **Responsive Design**: Adaptation mobile/desktop

## 🔌 Intégration GraphQL

### Configuration Apollo Client

```typescript
// src/config/ApolloProvider.tsx
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

// Provider wrapper pour l'application
export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
```

### Structure de Configuration

## 📱 Fonctionnalités Principales

### 🐾 Gestion des Animaux

- **Liste Paginée**: Affichage avec pagination et navigation fluide
- **Détails Complets**: Pages individuelles avec toutes les informations
- **Cartes Interactives**: Design moderne avec avatars générés dynamiquement
- **Informations Clés**: Espèce, race, couleur, poids, date de naissance
- **Lien Propriétaire**: Navigation directe vers le profil du propriétaire

### 👥 Gestion des Propriétaires

- **Annuaire Complet**: Liste paginée de tous les propriétaires
- **Profils Détaillés**: Informations personnelles et liste des animaux
- **Contact Multi-canal**: Email et téléphone avec liens directs
- **Statistiques**: Nombre d'animaux possédés par propriétaire
- **Relations Visuelles**: Cartes d'animaux intégrées dans le profil

### 🧭 Navigation & UX

- **App Router Next.js**: Routage moderne avec chargement optimisé
- **Routes Dynamiques**: `/animals/[id]` et `/owners/[id]` avec paramètres
- **États de Chargement**: Composants skeleton pendant les requêtes GraphQL
- **Gestion d'Erreurs**: Pages 404 personnalisées par section
- **Boutons de Retour**: Navigation contextuelle avec historique
- **Responsive Design**: Adaptation mobile/tablette/desktop

### 🏠 Page d'Accueil

- **Hero Section**: Présentation avec call-to-action
- **Navigation Rapide**: Accès direct aux sections principales
- **Design Immersif**: Fond décoratif avec cercles animés

## 🎯 Optimisations de Performance

### ⚡ Frontend

- **Next.js Image**: Optimisation automatique des images avec lazy loading
- **Font Optimization**: Chargement optimisé des polices Geist
- **Code Splitting**: Division automatique avec App Router
- **Static Generation**: Pages statiques quand possible

### 🔄 GraphQL & Cache

- **Apollo Client Cache**: Mise en cache intelligente des requêtes
- **Optimistic Updates**: Mises à jour optimistes pour la réactivité
- **Query Deduplication**: Évite les requêtes en double
- **Error Boundaries**: Gestion gracieuse des erreurs GraphQL

### 🎨 UI & Animations

- **Tailwind JIT**: Compilation just-in-time pour un CSS optimisé
- **Hover Effects**: Transitions fluides sur les interactions
- **Loading States**: Skeleton components pour un feedback immédiat
- **Mobile First**: Design responsive optimisé mobile d'abord

## 🔧 Fichiers de Configuration

### 📁 Configuration Principale

- `next.config.ts` - Configuration Next.js et optimisations
- `tailwind.config.ts` - Thème personnalisé et classes utilitaires
- `components.json` - Configuration shadcn/ui et chemins
- `tsconfig.json` - Configuration TypeScript stricte
- `eslint.config.mjs` - Règles de linting et formatage

### 📁 Configuration Apollo

- `src/config/ApolloProvider.tsx` - Client GraphQL et cache

## 🤝 Directives de Développement

### 📋 Structure du Code

- **TypeScript First**: Tous les composants typés strictement
- **App Router**: Suivre les conventions Next.js 13+
- **Error Boundaries**: Gestion d'erreurs à tous les niveaux
- **Custom Hooks**: Abstraire la logique API dans des hooks réutilisables
- **Feature-Based**: Organisation par fonctionnalité, pas par type de fichier

### 🎨 Standards de Style

- **Tailwind Utilities**: Privilégier les classes utilitaires
- **Consistent Spacing**: Utiliser l'échelle de spacing Tailwind
- **Mobile First**: Développer d'abord pour mobile
- **shadcn/ui**: Utiliser les composants de base quand possible
- **Design Tokens**: Respecter les variables CSS du design system

### 🔄 Gestion d'État

- **Apollo Client**: État global pour les données GraphQL
- **React Hooks**: État local avec useState/useEffect
- **Loading States**: Gérer loading/error/success explicitement
- **Optimistic UI**: Mises à jour immédiates avec rollback

### 📝 Conventions de Code

- **Naming**: PascalCase pour composants, camelCase pour fonctions
- **Imports**: Imports absolus avec alias `@/`
- **Props Interface**: Typer toutes les props des composants
- **Comments**: JSDoc pour les fonctions complexes

## 📦 Dépendances

### 🚀 Stack Principal

- `next` (15.x) - Framework React avec App Router
- `react` & `react-dom` (18.x) - Bibliothèque UI
- `typescript` (5.x) - Langage typé
- `tailwindcss` (3.x) - Framework CSS utility-first

### 🔌 GraphQL & API

- `@apollo/client` - Client GraphQL avec cache
- `graphql` - Implémentation GraphQL
- `date-fns` - Manipulation des dates

### 🎨 UI & Icons

- `lucide-react` - Bibliothèque d'icônes moderne
- `@radix-ui/*` - Primitives UI accessibles (via shadcn/ui)
- `class-variance-authority` - Gestion des variants de composants

### 🛠️ Développement

- `eslint` - Linting et qualité de code
- `@types/*` - Définitions TypeScript
- `autoprefixer` - Préfixes CSS automatiques

## 🐛 Dépannage

### ❌ Problèmes Courants

1. **Connexion GraphQL Failed**

   ```bash
   # Vérifier que le backend est démarré
   cd test-backend && npm run start:dev
   # Vérifier l'URL: http://localhost:4000/graphql
   ```

2. **Erreurs de Build TypeScript**

   ```bash
   # Vérifier les types
   npm run type-check
   # Nettoyer le cache Next.js
   rm -rf .next && npm run dev
   ```

3. **Styles Tailwind non appliqués**

   ```bash
   # Vérifier la configuration
   npx tailwindcss --init
   # Redémarrer le serveur de dev
   ```

4. **Images non chargées**
   - Vérifier les chemins dans `public/`
   - Utiliser le composant `next/image`

### 🔍 Mode Debug

```bash
# Logs détaillés Apollo
APOLLO_CLIENT_DEBUG=true npm run dev

# Debug Next.js
DEBUG=* npm run dev

# Analyse du bundle
npm run build && npm run analyze
```

### 📊 Performance Monitoring

```bash
# Lighthouse audit
npm run lighthouse

# Bundle analyzer
npm run build:analyze
```

### Hooks Personnalisés

```typescript
// Exemple: hook useGetAnimals
const { data, loading, error } = useGetAnimals(page, limit);

// Exemple: hook useGetOwners
const { data, loading, error } = useGetOwners(page, limit);
```

### Intégration dans l'App

- **Provider**: Wrappé au niveau racine dans `layout.tsx`
- **Cache**: InMemoryCache pour optimiser les performances
- **Endpoint**: Connexion au backend NestJS sur port 4000
- **Type Safety**: Hooks typés avec TypeScript
