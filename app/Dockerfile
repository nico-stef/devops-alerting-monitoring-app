# Folosim o imagine de baza oficiala de Node.js
FROM node:18-alpine

# Setam directorul de lucru in container
WORKDIR /usr/src/app

# Copiem definitia dependintelor
COPY package*.json ./

# Instalam dependintele
RUN npm install

# Copiem restul codului sursa
COPY . .

# Expunem portul 5000 (cel folosit de aplicatie)
EXPOSE 5000

# Comanda de pornire
CMD ["node", "index.js"]