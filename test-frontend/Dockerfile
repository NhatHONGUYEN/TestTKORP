# Dockerfile pour le développement local - Frontend Next.js
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le code source
COPY . .

# Exposer le port
EXPOSE 3000

# Commande pour le développement avec hot reload
CMD ["npm", "run", "dev"]