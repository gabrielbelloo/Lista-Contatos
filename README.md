
# Lista de Contatos

Aplicação web para gerenciamento de contatos corporativos, desenvolvida com JavaScript, Node.js, Express e PostgreSQL. A aplicação permite visualizar, filtrar, ordenar e interagir com os contatos armazenados no banco de dados.


## Funcionalidades

- Sidebar de Filtros: Permite buscar contatos por nome, setor, ramal, email e telefone.

- Ordenação: Os contatos podem ser ordenados por nome, setor, ramal, email e telefone.
  
- Exibição em cards: Abre um card com informações detalhadas sobre o contato.

- Integração com Email: Ao clicar no ícone de email, um novo email é aberto automaticamente para o contato selecionado.

- Integração com WhatsApp: Ao clicar no ícone do WhatsApp, a conversa com o contato é aberta diretamente no aplicativo.

- Banco de Dados PostgreSQL: Todos os contatos são armazenados e gerenciados em um banco de dados PostgreSQL.


## Stack utilizada

**Front-end:** HTML, CSS e JavaScript

**Back-end:** Node.js com Express

**Banco de Dados:** PostgreSQL


## Estrutura do Projeto

📁 Lista-Contatos
 ┣ 📂 backend
 ┃ ┣ 📂 config
 ┃ ┃ ┣ 📜 db.js
 ┃ ┣ 📂 controllers
 ┃ ┃ ┣ 📜 userController.js
 ┃ ┣ 📂 middlewares
 ┃ ┃ ┣ 📜 errorHandler.js
 ┃ ┣ 📂 models
 ┃ ┃ ┣ 📜 userModel.js
 ┃ ┣ 📂 routes
 ┃ ┃ ┣ 📜 userRoutes.js
 ┃ ┣ 📜 server.js
 ┃ ┗ 📜 package.json
 ┣ 📂 frontend
 ┃ ┣ 📜 admin.html
 ┃ ┣ 📜 admin.js
 ┃ ┣ 📜 index.html
 ┃ ┣ 📜 script.js
 ┃ ┣ 📜 style.css
 ┃ ┗ 📜 print.css
 ┣ 📂 sql
 ┃ ┗ 📜 schema.sql
 ┣ 📜 README.md
 ┗ 📜 conf.env


## Licença

[MIT](https://choosealicense.com/licenses/mit/)

