const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config({ path: './config.env'});

const app = express();
const port = 3000;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.use(cors());
app.use(express.json());

app.get('/contatos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM contatos');
        res.json(result.rows);
    } catch (err) {
        console.error('Erro ao buscar contatos:', err);
        res.status(500).json({ error: 'Erro ao buscar contatos.' });
    }
});

app.get('/contatos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('SELECT * FROM contatos WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Contato não encontrado.' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao buscar contato:', err);
        res.status(500).json({ error: 'Erro ao buscar contato.' });
    }
});

app.post('/contatos', async (req, res) => {
    const { nome, setor, ramal, email, telefone } = req.body;

    if (!nome || !setor || !ramal || !email || !telefone) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        const emailExists = await pool.query(
            'SELECT * FROM contatos WHERE email = $1',
            [email]
        );

        if (emailExists.rows.length > 0) {
            return res.status(400).json({ error: 'Este e-mail já está cadastrado.' });
        }

        const result = await pool.query(
            'INSERT INTO contatos (nome, setor, ramal, email, telefone) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nome, setor, ramal, email, telefone]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao adicionar contato:', err);
        res.status(500).json({ error: 'Erro ao adicionar contato.' });
    }
});

app.put('/contatos/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, setor, ramal, email, telefone } = req.body;

    if (!nome || !setor || !ramal || !email || !telefone) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        const emailExists = await pool.query(
            'SELECT * FROM contatos WHERE email = $1 AND id != $2',
            [email, id]
        );

        if (emailExists.rows.length > 0) {
            return res.status(400).json({ error: 'Este e-mail já está cadastrado.' });
        }

        const result = await pool.query(
            'UPDATE contatos SET nome = $1, setor = $2, ramal = $3, email = $4, telefone = $5 WHERE id = $6 RETURNING *',
            [nome, setor, ramal, email, telefone, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Contato não encontrado.' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Erro ao editar contato:', err);
        res.status(500).json({ error: 'Erro ao editar contato.' });
    }
});

app.delete('/contatos/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('DELETE FROM contatos WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Contato não encontrado.' });
        }

        res.status(204).send();
    } catch (err) {
        console.error('Erro ao excluir contato:', err);
        res.status(500).json({ error: 'Erro ao excluir contato.' });
    }
});

app.use((req, res, next) => {
    res.status(404).json({ error: 'Rota não encontrada.' });
});

app.use((err, req, res, next) => {
    console.error('Erro no servidor:', err);
    res.status(500).json({ error: 'Erro no servidor.' });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://10.1.2.248:${port}`);
});