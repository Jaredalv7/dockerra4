# Imagen base oficial de Node
FROM node:18-alpine

# Crear carpeta dentro del contenedor
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY app/ .

# Exponer el puerto (debe coincidir con index.js)
EXPOSE 8080

# Iniciar la aplicación
CMD ["node", "index.js"]
