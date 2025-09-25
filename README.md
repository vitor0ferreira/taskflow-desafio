# TaskFlow - Gerenciador de Tarefas

TaskFlow é um projeto full-stack de um gerenciador de tarefas (To-Do list). Ele permite que usuários se cadastrem, façam login e gerenciem suas próprias tarefas pessoais.

O projeto foi construído com as seguintes tecnologias:

* **Frontend:** Next.js, React, TypeScript, Tailwind CSS
* **Backend:** Node.js, Express, TypeScript, Sequelize (ORM)
* **Banco de Dados:** MySQL
* **Autenticação:** Baseada em JSON Web Tokens (JWT)
* **Containerização:** Docker (para o banco de dados)

## Funcionalidades

* ✅ Cadastro e Login de usuários.
* ✅ Autenticação segura com JWT.
* ✅ Criação, Leitura, Atualização e Exclusão (CRUD) de tarefas.
* ✅ As tarefas são vinculadas a cada usuário específico.
* ✅ Interface reativa e moderna.

## Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas em sua máquina:

* [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
* [Docker](https://www.docker.com/products/docker-desktop/) e Docker Compose

## Como Rodar o Projeto Localmente

Siga os passos abaixo para configurar e executar a aplicação.

### 1. Clonar o Repositório

Primeiro, clone este repositório para sua máquina local:

```bash
git clone [https://github.com/vitor0ferreira/taskflow-desafio.git](https://github.com/vitor0ferreira/taskflow-desafio.git)
cd taskflow-desafio
```

### 2. Configurar o Banco de Dados com Docker

O projeto utiliza Docker para rodar uma instância do MySQL de forma isolada, sem a necessidade de instalar o MySQL diretamente na sua máquina.

Na raiz do projeto, execute o seguinte comando para iniciar o container do banco de dados:

```bash
docker-compose up -d
```

Este comando irá baixar a imagem do MySQL e criar um container com a base de dados `tasksdb`, pronta para ser usada pelo backend.

### 3. Configurar e Rodar o Backend

Agora, vamos configurar e iniciar a API do backend.

```bash
# 1. Navegue até a pasta do backend
cd back

# 2. Instale as dependências
npm install

# 3. (Opcional) Crie um arquivo .env para variáveis de ambiente
# Você pode criar um arquivo .env na pasta 'back' para guardar sua chave secreta do JWT
# (eu usei uma fixa ali já que é apenas um projeto teste e apesar de eu dificultar umas coisas eu simplifiquei algumas, vai entender kk)
# Exemplo de .env:
# JWT_SECRET=sua_chave_secreta_aqui

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

O servidor do backend estará rodando em `http://localhost:4000`.

### 4. Configurar e Rodar o Frontend

Finalmente, vamos configurar e iniciar a aplicação Next.js.

```bash
# 1. Abra um novo terminal e navegue até a pasta do frontend
cd front

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação frontend estará disponível em `http://localhost:3000`.

### 5. Acessando a Aplicação

Abra seu navegador e acesse `http://localhost:3000`. Você poderá criar uma conta, fazer login e começar a gerenciar suas tarefas!