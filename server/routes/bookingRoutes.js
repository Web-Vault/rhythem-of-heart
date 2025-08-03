import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
    createBooking,
    getBookings,
    getBookingById,
    getUserBookings,
    getEventBookings,
    cancelBooking
} from '../controllers/bookingController.js';

const router = express.Router();

// Protected routes
router.post('/', protect, createBooking);
router.get('/', protect, getBookings);
router.get('/user', protect, getUserBookings);
router.get('/:id', protect, getBookingById);
router.get('/event/:id', protect, getEventBookings);
router.delete('/:id', protect, cancelBooking);

export default router;