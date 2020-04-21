# Projeto API-NODE-EXPRESS

NODE version v13.13.0

Author:
Everton Ferreira

## Conteúdo
- [Visão Geral do Projeto](#visão-geral-do-projeto)
  - [Tecnologias](#tecnologias)  
- [Informações Iniciais](#informações-iniciais)
  - [Clonando o Repositório](#clonando-o-repositório)
  - [Instalando as Dependências](#instalando-as-dependências)
  - [Instalando os bancos de dados](#instalando-os-bancos-de-dados)
  - [Arquivos de conexão com bancos](#arquivos-de-conexao-com-bancos)
  - [Gerar as tabelas no MYSQL](#gerar-tablas-no-mysql)
  - [ Gerar a documentação da API](#gerar-a-documentacao-da-api)
  - [Documentação API](#documentação-api)
- [Servidor de Desenvolvimento](#servidor-de-desenvolvimento)

## Visão Geral do Projeto
O principal objetivo do desafio é do desenvolvimento é de criar uma api escalável e de fácil manutenção, esta api utiliza os conceitos de test unitarios, validação de parâmetros de request (GET, POST,etc...) e a disponiilização da documentação dos recursos disponibilizados na api.

### Tecnologias
- NODEJS
    - [EXPRESS](http://expressjs.com/)
    - [EXPRESS-VALIDATOR](https://express-validator.github.io/docs/)
    - [SEQUELIZE](https://sequelize.org/)
    - [MONGOOSE](https://mongoosejs.com/)
    - [APIDOC](https://apidocjs.com/)

## Informações Iniciais
Para realizar as passos a seguir, será necessário que tenha instalado em seu computador o **git** e o **node.js**. Abaixo seguem os sites para realizar o download e efetuar a instalação:
- [Git](https://git-scm.com/downloads)
- [Node.js - Windows/Mac](https://nodejs.org/en/download/)
- [Node.js - Linux](https://nodejs.org/en/download/package-manager/)

### Clonando o Repositório
Primeiro é preciso que efetue a clonagem do repositório para o seu computador para assim efetuar alterações de código.
**clone or download** e copiar a URL do respositório.

Já abrindo o bash do Git para efetuar a clonagem será necessário que digite a seguinte linha de código e informe a URL copiada anteriormente:
git clone <url-do-repositorio>

### Instalando as Dependências
Para instalar as dependências do projeto basta abrir o **Prompt de Comando** (caso você esteja no linux, basta utilizar o terminal), acessar a pasta do repositório e inserir o seguinte comando:
npm install

### Instalando os bancos de dados
- [MONGODB - Windows/Mac/Linux](https://www.mongodb.com/download-center/community)
- [MYSQL](https://www.mysql.com/downloads/)

### Arquivos de conexão com bancos
- [MYSQL] Pasta /src/config/database.js
- [MONGODB] Pasta /src/app/mongodb/connect/connectdb.js

### Gerar as tabelas no MYSQL
Para gerar tabelas: de produção **npm sequelize**, de desenvolvimento **npm sequelize_dev** e de teste  **npm sequelize_test**

### Gerar a documentação da API
Instalar **npm install apidoc -g** na maquina, e para gerar a documentação executar **npm apidoc**

### Documentação API
A documentação da API está disponível em: [DOCUMENT](http://localhost:3000/document).

## Servidor de Desenvolvimento

Execute no **Prompt de Comando** (caso você esteja no linux, basta utilizar o terminal) `npm start` para rodar o projeto em dev. Navegue para `http://localhost:3000/api`.