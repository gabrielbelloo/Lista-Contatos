import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactsRoutes from './routes/contactsRoutes.js';

dotenv.config();
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use('/contacts', contactsRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});