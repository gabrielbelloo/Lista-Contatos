DROP TABLE IF EXISTS contatos;

CREATE TABLE contatos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    setor VARCHAR(50) NOT NULL,
    ramal VARCHAR(10),
    telefone VARCHAR(20),
    email VARCHAR(100)
);