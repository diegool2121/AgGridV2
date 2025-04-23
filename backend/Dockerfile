FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

# Instalar dependencias necesarias para Puppeteer y Chrome
RUN apt-get update && apt-get install -y \
  libcups2 \
  libnss3 \
  libatk1.0-0 \
  libatk-bridge2.0-0 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  libgbm1 \
  libpango1.0-0 \
  libcairo2 \
  fonts-liberation \
  libjpeg62-turbo \
  libxshmfence1 \
  libdbus-1-3 \
  libdrm2 \
  wget \
  --no-install-recommends && \
  apt-get clean && rm -rf /var/lib/apt/lists/*

COPY . .

EXPOSE 3000

CMD ["node", "src/app.js"]