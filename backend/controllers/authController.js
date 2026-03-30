import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// Removed OAuth2Client import
import pool from '../db.js';

const JWT_SECRET = 'YOUR_SECRET_KEY';

// --- SIGNUP LOGIC ---
export const signup = async (req, res) => {
    const { full_name, username, email, phone, password } = req.body;

    try {
        // 1. Password Strength Check
        const strongPass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        if (!strongPass.test(password)) {
            return res.status(400).json({ 
                field: "password", 
                message: "Need 8+ chars, 1 number, 1 symbol FOR PASSORD ." 
            });
        }

        // 2. Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Insert into Database
        await pool.query(
            "INSERT INTO users (full_name, username, email, phone, password_hash) VALUES ($1, $2, $3, $4)",
            [full_name, username, email, phone, hashedPassword]
        );

        res.status(201).json({ message: "User Created Successfully!" });

    } catch (err) {
        console.error("Signup Error:", err);
        // Check for unique constraint violation (Postgres error code 23505)
        if (err.code === '23505') {
            return res.status(400).json({ error: "Username, Email, or Phone already exists" });
        }
        res.status(500).json({ error: "Database error occurred" });
    }
};

// --- LOGIN LOGIC ---
export const login = async (req, res) => {
    const { identifier, password } = req.body;
    
    try {
        const user = await pool.query(
            "SELECT * FROM users WHERE username=$1 OR email=$1 OR phone=$1",
            [identifier]
        );

        if (user.rows.length === 0) {
            return res.status(401).json({ error: "Invalid User" });
        }

        const validPass = await bcrypt.compare(password, user.rows[0].password_hash);
        if (!validPass) {
            return res.status(401).json({ error: "Wrong Password" });
        }

        const token = jwt.sign({ id: user.rows[0].id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, message: "Logged in!" });
    } catch (err) {
        res.status(500).json({ error: "Login error" });
    }
};