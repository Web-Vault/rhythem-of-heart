import express from 'express';
import { register, login, getUserProfile, getAllPerformers, getUserById, updateUserProfile, artistOnboarding } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Get user profile route (protected)
router.get('/profile', protect, getUserProfile);

// Update user profile route (protected)
router.put('/profile', protect, updateUserProfile);

// Get all performers route
router.get('/performers', getAllPerformers);

// Get user by ID route
router.get('/users/:id', getUserById);

// Artist onboarding route (protected)
router.post('/artist-onboarding', protect, artistOnboarding);

export default router;