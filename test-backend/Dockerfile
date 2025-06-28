# Dockerfile pour le développement local - Backend NestJS
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci

# Copier le code source
COPY . .

# Exposer le port
EXPOSE 4000

# Utiliser la commande start:dev avec les options Node.js
CMD ["npm", "run", "start:dev"]