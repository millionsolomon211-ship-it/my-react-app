import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // REQUIRED to read req.cookies
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from './db.js'; // FIX: Changed '../db.js' to './db.js' assuming they are in the same folder

const app = express();
const JWT_SECRET = 'YOUR_SECRET_KEY';

// --- MIDDLEWARE ---
app.use(express.json());
app.use(cookieParser()); // REQUIRED: Parses cookies from the request headers

app.use(cors({
  origin: 'http://localhost:5173', // Matches your Vite/React port
  credentials: true                // REQUIRED: Allows cookies to pass through CORS
}));

// --- HELPER: SET COOKIE ---
const setAuthCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true, // Prevents JavaScript access (XSS protection)
    secure: false,  // Set to true only in production (HTTPS)
    sameSite: 'lax', // 'lax' is best for local development redirects
    maxAge: 3600000  // 1 hour
  });
};

// --- ROUTES ---

// SIGNUP
export const signup = async (req, res) => {
  const { full_Name, username, email, phone, password } = req.body;

  try {
    const strongPass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!strongPass.test(password)) {
      return res.status(400).json({ message: "Password too weak." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await pool.query(
      "INSERT INTO users (full_name, username, email, phone, password_hash) VALUES ($1, $2, $3, $4, $5)",
      [full_Name, username, email, phone, hashedPassword]
    );

    res.status(201).json({ message: "User Created Successfully!" });
  } catch (err) {
    if (err.code === '23505') return res.status(400).json({ error: "User already exists" });
    res.status(500).json({ error: "Database error" });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { identifier, password } = req.body;
  try {
    const user = await pool.query(
      "SELECT * FROM users WHERE username=$1 OR email=$1 OR phone=$1", 
      [identifier]
    );
    
    if (user.rows.length === 0) return res.status(401).json({ error: "Invalid User" });

    const validPass = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!validPass) return res.status(401).json({ error: "Wrong Password" });

    const token = jwt.sign({ id: user.rows[0].id }, JWT_SECRET, { expiresIn: '1h' });
    
    setAuthCookie(res, token);
    res.json({ message: "Logged in!" });
  } catch (err) {
    res.status(500).json({ error: "Login error" });
  }
};

// CHECK AUTH STATUS
export const checkAuth = async (req, res) => {
  // req.cookies is only available because of cookie-parser
  const token = req.cookies.token; 
  
  if (!token) return res.status(401).json({ authenticated: false });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ authenticated: true, userId: decoded.id });
  } catch (err) {
    res.status(401).json({ authenticated: false });
  }
};

// Start Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));