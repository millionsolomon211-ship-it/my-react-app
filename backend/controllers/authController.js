import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library'; // NEW: Add this
import pool from '../db.js';

// Initialize the Google Client
const googleClient = new OAuth2Client("YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com");
const JWT_SECRET = 'YOUR_SECRET_KEY';

export const signup = async (req, res) => {
    const { username, email, phone, password } = req.body;
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        await pool.query(
            "INSERT INTO users (username, email, phone, password_hash) VALUES ($1, $2, $3, $4)",
            [username, email, phone, hashedPassword]
        );
        res.status(201).json({ message: "User Created Successfully!" });
    } catch (err) {
        res.status(500).json({ error: "User already exists or DB error" });
    }
};

export const login = async (req, res) => {
    const { identifier, password } = req.body;
    const user = await pool.query(
        "SELECT * FROM users WHERE username=$1 OR email=$1 OR phone=$1",
        [identifier]
    );

    if (user.rows.length === 0) return res.status(401).json({ error: "Invalid User" });

    const validPass = await bcrypt.compare(password, user.rows[0].password_hash);
    if (!validPass) return res.status(401).json({ error: "Wrong Password" });

    const token = jwt.sign({ id: user.rows[0].id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, message: "Logged in!" });
};

// --- NEW GOOGLE LOGIN LOGIC ---
export const googleLogin = async (req, res) => {
    const { token } = req.body;

    try {
        // 1. Verify the Google Token
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: "936523820793-ti1bf7vsj7hie5v6nnqs8paeicesetsu.apps.googleusercontent.com",
        });

        const payload = ticket.getPayload();
        const { email, name, sub: googleId } = payload;

        // 2. Check if user exists by email
        let userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        let userId;
        if (userResult.rows.length === 0) {
            // 3. Register user if they don't exist (First time using Google)
            // We use 'GOOGLE_USER' as a dummy password hash so they can't login with regular password
            const newUsername = name.replace(/\s+/g, '').toLowerCase() + Math.floor(Math.random() * 1000);
            const newUser = await pool.query(
                "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id",
                [newUsername, email, 'GOOGLE_AUTH_EXTERNAL']
            );
            userId = newUser.rows[0].id;
        } else {
            userId = userResult.rows[0].id;
        }




        
        // 4. Create your own App JWT
        const appToken = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '24h' });

        res.json({ token: appToken, message: "Google Login Successful!" });

    } catch (err) {
        console.error("Google verify error:", err);
        res.status(400).json({ error: "Google verification failed" });
    }
};