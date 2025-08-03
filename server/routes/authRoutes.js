import express from 'express';
import { register, login, getUserProfile, getAllPerformers, getUserById } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Get user profile route (protected)
router.get('/profile', protect, getUserProfile);

// Get all performers route
router.get('/performers', getAllPerformers);

// Get user by ID route
router.get('/users/:id', getUserById);

export default router;