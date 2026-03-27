// controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js'; // Your Postgres connection

export const signup = async (req, res) => {
    const { fullName, email, username, phone, password } = req.body;

    // 1. Password Strength Check (Regex)
    const strongPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!strongPassword.test(password)) {
        return res.status(400).json({ message: "Password too weak!" });
    }

    // 2. Hash Password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const newUser = await pool.query(
            "INSERT INTO users (full_name, email, username, phone, password_hash) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [fullName, email, username, phone, hashedPassword]
        );
        res.status(201).json({ message: "User registered. Please verify email." });
    } catch (err) {
        res.status(500).json({ message: "Database error or user exists" });
    }
};