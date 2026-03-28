import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import pool from '../db.js';

// Initialize the Google Client
//const googleClient = new OAuth2Client("936523820793-ti1bf7vsj7hie5v6nnqs8paeicesetsu.apps.googleusercontent.com");
const JWT_SECRET = 'YOUR_SECRET_KEY';

export const signup = async (req, res) => {
    const { full_name,username, email, phone, password } = req.body;

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

// --- GOOGLE LOGIN LOGIC ---
export const googleLogin = async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: "936523820793-ti1bf7vsj7hie5v6nnqs8paeicesetsu.apps.googleusercontent.com",
        });

        const payload = ticket.getPayload();
        const { email, name } = payload;

        let userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        let userId;
        if (userResult.rows.length === 0) {
            const newUsername = name.replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random() * 1000);
            const newUser = await pool.query(
                "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id",
                [newUsername, email, 'GOOGLE_AUTH_EXTERNAL']
            );
            userId = newUser.rows[0].id;
        } else {
            userId = userResult.rows[0].id;
        }

        const appToken = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '24h' });
        res.json({ token: appToken, message: "Google Login Successful!" });

    } catch (err) {
        console.error("Google verify error:", err);
        res.status(400).json({ error: "Google verification failed" });
    }
};