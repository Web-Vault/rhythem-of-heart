import EventBooking from '../models/EventBooking.js';
import Event from '../models/Event.js';
import { v4 as uuidv4 } from 'uuid';

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req, res) => {
    try {
        const { 
            event, 
            username, 
            email, 
            mobileNumber, 
            numberOfSeats, 
            membersName, 
            isPerformer, 
            artType, 
            duration 
        } = req.body;
        
        // Check if event exists
        const eventData = await Event.findById(event);
        if (!eventData) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        
        // Check if enough seats are available
        if (eventData.bookedSeats + numberOfSeats > eventData.totalSeats) {
            return res.status(400).json({ success: false, message: 'Not enough seats available' });
        }
        
        // Calculate total amount
        const totalAmount = numberOfSeats * eventData.price;
        
        // Generate unique ticket ID
        const ticketId = `TKT-${uuidv4().substring(0, 8)}`;
        
        // Create booking
        const booking = await EventBooking.create({
            event,
            ticketId,
            username,
            email,
            mobileNumber,
            numberOfSeats,
            membersName: membersName || [],
            isPerformer: isPerformer || false,
            artType: isPerformer ? artType : undefined,
            duration: isPerformer ? duration : undefined,
            totalAmount,
            user: req.user._id
        });
        
        // Update event booked seats
        eventData.bookedSeats += numberOfSeats;
        await eventData.save();
        
        res.status(201).json({
            success: true,
            message: 'Booking created successfully',
            booking
        });
    } catch (error) {
        console.error('Create booking error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private (Admin only)
export const getBookings = async (req, res) => {
    try {
        const bookings = await EventBooking.find().populate('event', 'name dateTime venue');
        res.status(200).json({
            success: true,
            count: bookings.length,
            bookings
        });
    } catch (error) {
        console.error('Get bookings error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// @desc    Get user bookings
// @route   GET /api/bookings/user
// @access  Private
export const getUserBookings = async (req, res) => {
    try {
        const bookings = await EventBooking.find({ user: req.user._id })
            .populate('event', 'name dateTime venue image price');
        console.log('User Bookings:', bookings);
        res.status(200).json({
            success: true,
            count: bookings.length,
            bookings
        });
    } catch (error) {
        console.error('Get user bookings error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Private
export const getBookingById = async (req, res) => {
    try {
        const booking = await EventBooking.findById(req.params.id)
            .populate('event', 'name dateTime venue image price');
        
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        
        // Check if booking belongs to user
        if (booking.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized to access this booking' });
        }
        
        res.status(200).json({
            success: true,
            booking
        });
    } catch (error) {
        console.error('Get booking error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// @desc    Get bookings by event
// @route   GET /api/bookings/event/:id
// @access  Private (Event creators only)
export const getEventBookings = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        
        // Check if user is a performer in this event
        if (!event.performers.includes(req.user._id)) {
            return res.status(403).json({ success: false, message: 'Not authorized to view these bookings' });
        }
        
        const bookings = await EventBooking.find({ event: req.params.id });
        
        res.status(200).json({
            success: true,
            count: bookings.length,
            bookings
        });
    } catch (error) {
        console.error('Get event bookings error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};

// @desc    Cancel booking
// @route   DELETE /api/bookings/:id
// @access  Private
export const cancelBooking = async (req, res) => {
    try {
        const booking = await EventBooking.findById(req.params.id);
        
        if (!booking) {
            return res.status(404).json({ success: false, message: 'Booking not found' });
        }
        
        // Check if booking belongs to user
        if (booking.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized to cancel this booking' });
        }
        
        // Update event booked seats
        const event = await Event.findById(booking.event);
        if (event) {
            event.bookedSeats -= booking.numberOfSeats;
            await event.save();
        }
        
        await booking.remove();
        
        res.status(200).json({
            success: true,
            message: 'Booking cancelled successfully'
        });
    } catch (error) {
        console.error('Cancel booking error:', error);
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};