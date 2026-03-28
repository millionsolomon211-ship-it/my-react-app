import express from 'express';
// 1. Add googleLogin to your imports
import { signup, login, googleLogin } from '../controllers/authController.js';

const router = express.Router();

// Existing routes
router.post('/signup', signup);
router.post('/login', login);

// 2. ADD THIS NEW ROUTE HERE:
router.post('/google-login', googleLogin); 

export default router;