import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Protect routes middleware
export const protect = async (req, res, next) => {
    let token;

    // Check if token exists in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key_for_development');

            // Get user from token
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error('Auth middleware error:', error);
            res.status(401).json({ success: false, message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ success: false, message: 'Not authorized, no token' });
    }
};

// Admin middleware
export const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ success: false, message: 'Not authorized as admin' });
    }
};

// Performer middleware
export const performer = (req, res, next) => {
    if (req.user && req.user.isPerformer) {
        next();
    } else {
        res.status(403).json({ success: false, message: 'Not authorized as performer' });
    }
};