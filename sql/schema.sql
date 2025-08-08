-- ============================================
-- Banco de Dados: Lista de Contatos
-- Autor: Gabriel Bello
-- ============================================

-- Remove a tabela caso já exista
DROP TABLE IF EXISTS contatos;

-- Cria a tabela principal de contatos
CREATE TABLE contatos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    setor VARCHAR(50) NOT NULL,
    ramal VARCHAR(10),
    telefone VARCHAR(20),
    email VARCHAR(100)
);