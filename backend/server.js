import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';  
import pool from './db.js'; 
import { signup, login, googleLogin } from './controllers/authController.js';

const app = express();

// 2. Define a General Limiter (e.g., 100 requests per 15 minutes)
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: { error: "Too many requests, please try again later." },
    standardHeaders: true, 
    legacyHeaders: false, 
});


const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10, 
    message: { error: "Too many login attempts. Please wait 15 minutes." },
    standardHeaders: true,
    legacyHeaders: false,
});

// --- Middleware ---
app.use(generalLimiter); // Apply general limit to all requests
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet()); 
app.use(express.json()); 

// --- ROUTES ---
// Apply the stricter authLimiter specifically to these routes
app.post('/api/signup', authLimiter, signup);
app.post('/api/login', authLimiter, login);
app.post('/api/google-login', authLimiter, googleLogin);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server interconnected on http://localhost:${PORT}`);
});