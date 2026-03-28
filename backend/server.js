import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import pool from './db.js'; 
import { signup, login } from './controllers/authController.js';

const app = express();


app.use(cors({
    origin: 'http://localhost:5173', // Vite default port
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(helmet()); 
app.use(express.json()); 

// 2. ROUTES: Note the '/api' prefix
app.post('/api/signup', signup);
app.post('/api/login', login);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server interconnected on http://localhost:${PORT}`);
});