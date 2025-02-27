import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import errorHandling from './middlewares/errorHandler.js';

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/contatos', userRoutes);

app.use(errorHandling);

app.listen(port, () => {
    console.log(`Servidor rodando em http://10.1.2.248:${port}`);
});