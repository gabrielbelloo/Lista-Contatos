
# Lista de Contatos

Aplicação web para gerenciamento de contatos corporativos, desenvolvida com JavaScript, Node.js, Express e PostgreSQL. A aplicação permite visualizar, filtrar, ordenar e interagir com os contatos armazenados no banco de dados.


## Funcionalidades

- Sidebar de Filtros: Permite buscar contatos por nome, setor, ramal, email e telefone.
- Ordenação: Os contatos podem ser ordenados por nome, setor, ramal, email e telefone.
- Exibição em cards: Abre um card com informações detalhadas sobre o contato.

## Stack utilizada

**Front-end:** HTML, CSS e JavaScript

**Back-end:** Node.js com Express

**Banco de Dados:** PostgreSQL


## Screenshots

![App Screenshot](https://lh3.googleusercontent.com/pw/AP1GczPX3vydZ2XJH8XCm63-x11ztnuFLOipKZj7h_PrSQ8oLf4nXvNEVO8C8KtLGXtWHTgTlfEzqR0rdW5jDswc32ekDN7gElnOKEmMRfWW9D7kFyYT4thYUr5FfQDbvihJ0FIME7ELxQxttA0bd4Yt8zEeYw=w1859-h966-s-no-gm?authuser=0)

![App Screenshot](https://lh3.googleusercontent.com/pw/AP1GczPML51gvYQsmx88PnhKa6pJBnclrAReBDFe-CVej1v6nRjkb7KAeDABrNaHjMYTxL7WwA50EvC4JN8ew3lewr7rYqmotGzT3AjREbzWs3_9NsNblqTCwFDTKuL2HKOUroFIjbCupUIyvSFaLvOP-igdww=w1869-h964-s-no-gm?authuser=0)


## Estrutura do Projeto

```
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
 
 ``` 
