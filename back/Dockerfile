FROM node:18.17

# Atualize os pacotes e instale as dependências necessárias
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

EXPOSE 5432

# Configure o ambiente Node.js
USER node
WORKDIR /home/node/app

# Copie os arquivos de configuração do aplicativo
COPY package*.json ./
#remove arquivo evitando problemas
RUN rm -rf package-lock.json
RUN rm -rf node_modules

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do aplicativo
COPY . .

# Exponha a porta do aplicativo Node.js
EXPOSE 3000

# Adicione a execução do script SQL na inicialização
COPY init.sql /docker-entrypoint-initdb.d/


CMD ["node", "index.js"]