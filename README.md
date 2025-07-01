# 🐾 PetKeeper - Pet Management Platform

A modern full-stack web application for managing pets and their owners, built with **Next.js**, **NestJS**, and **GraphQL**.

![PetKeeper Interface](test-frontend/public/images/HeroPicture.png)

## 🚀 Features

### 🎯 Core Features

- **Pet Management**: Create, view, update, and delete pet profiles
- **Owner Management**: Manage pet owner information and contacts
- **Relationship Tracking**: Link pets to their owners with full relationship management
- **Advanced Search & Filtering**: Find pets and owners quickly
- **Responsive Design**: Beautiful UI that works on all devices

### 📊 Analytics & Statistics

- **Oldest Pet**: Find the oldest pet in the database
- **Most Common Species**: Discover the most popular pet species
- **Owner with Most Pets**: Identify owners with the largest number of pets
- **Heaviest Pet Analytics**: Track weight statistics and heaviest pets
- **Cat Owner Statistics**: Specialized analytics for cat owners

### 🔧 Technical Features

- **GraphQL API**: Modern, efficient data fetching
- **Pagination**: Handle large datasets efficiently
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Comprehensive error management
- **Docker Support**: Containerized deployment
- **Modern UI Components**: Built with Tailwind CSS and shadcn/ui

## 🏗️ Architecture

### Frontend (Next.js 15)

```
test-frontend/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── animals/           # Pet management pages
│   │   ├── owners/            # Owner management pages
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── common/           # Common components
│   │   └── layout/           # Layout components
│   ├── features/             # Feature-specific components
│   │   ├── animals/          # Pet-related components
│   │   ├── owners/           # Owner-related components
│   │   └── home/             # Homepage components
│   ├── graphql/              # GraphQL queries
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions
│   └── types/                # TypeScript type definitions
```

### Backend (NestJS)

```
test-backend/
├── src/
│   ├── modules/              # Feature modules
│   │   ├── animals/          # Pet management
│   │   └── owners/           # Owner management
│   ├── common/               # Shared utilities
│   │   ├── components/       # Shared components
│   │   ├── exceptions/       # Error handling
│   │   ├── filters/          # Exception filters
│   │   ├── graphql/          # GraphQL schemas
│   │   └── services/         # Shared services
│   └── main.ts               # Application entry point
```

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **GraphQL Client**: Apollo Client
- **Icons**: Lucide React
- **Date Handling**: date-fns

### Backend

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: SQLite (with TypeORM)
- **API**: GraphQL
- **Validation**: class-validator
- **Documentation**: Auto-generated GraphQL schema

### DevOps

- **Containerization**: Docker & Docker Compose
- **Linting**: ESLint
- **Package Manager**: npm

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose (optional)

### Option 1: Docker (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd TestTKORP

# Start the application
docker-compose up -d

# Access the applications
# Frontend: http://localhost:3000
# Backend GraphQL Playground: http://localhost:4000/graphql
```

### Option 2: Manual Setup

#### Backend Setup

```bash
cd test-backend

# Install dependencies
npm install

# Start the development server
npm run start:dev

# The GraphQL API will be available at http://localhost:4000/graphql
```

#### Frontend Setup

```bash
cd test-frontend

# Install dependencies
npm install

# Start the development server
npm run dev

# The application will be available at http://localhost:3000
```

## 📊 GraphQL API

### Key Queries

```graphql
# Get all animals with pagination
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
    }
  }
}

# Get all owners with their animals
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

### Statistics Queries

```graphql
# Get the oldest animal
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

# Get the most common species
query GetMostCommonSpecies {
  mostCommonSpecies {
    species
    count
  }
}
```

### Mutations

```graphql
# Create a new animal
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

# Create a new owner
mutation CreateOwner($input: CreateOwnerInput!) {
  createOwner(input: $input) {
    id
    firstName
    lastName
    email
    phoneNumber
  }
}
```

## 🎨 UI Components

### Design System

- **Colors**: Custom orange theme with consistent color palette
- **Typography**: Modern font stack with Geist font family
- **Components**: Reusable components built with Tailwind CSS
- **Animations**: Smooth transitions and hover effects
- **Responsive**: Mobile-first design approach

### Key Components

- **Animal Cards**: Display pet information with avatars
- **Owner Cards**: Show owner details with pet counts
- **Detail Pages**: Comprehensive information views
- **Navigation**: Responsive header with mobile menu
- **Pagination**: Efficient data navigation
- **Loading States**: Skeleton components for better UX

## 🔍 Key Features Deep Dive

### Pet Management

- Complete CRUD operations for pets
- Dynamic avatar generation based on pet ID
- Detailed pet profiles with owner information
- Species and breed tracking
- Weight and age management

### Owner Management

- Full owner profile management
- Contact information tracking
- Relationship with multiple pets
- Owner-specific analytics

### Analytics Dashboard

- Real-time statistics calculation
- Advanced database queries for insights
- Weight-based analytics
- Species distribution analysis

## 🧪 Testing

```bash
# Backend tests
cd test-backend
npm run test
npm run test:e2e

# Frontend tests
cd test-frontend
npm run test
```

## 📦 Deployment

### Production Build

```bash
# Backend
cd test-backend
npm run build
npm run start:prod

# Frontend
cd test-frontend
npm run build
npm start
```

### Docker Production

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js** team for the amazing React framework
- **NestJS** team for the powerful Node.js framework
- **shadcn/ui** for the beautiful UI components
- **Tailwind CSS** for the utility-first CSS framework
- **Apollo GraphQL** for the excellent GraphQL implementation

---

**Built with ❤️ for pet lovers everywhere** 🐕🐱🐹
