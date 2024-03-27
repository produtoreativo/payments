FROM node:16.3.0

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código do aplicativo
COPY . .

# Exponha a porta do aplicativo
EXPOSE 3000

# Inicie o aplicativo com o nodemon
CMD ["npm", "run", "start:dev"]