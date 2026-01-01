import { verify } from 'jsonwebtoken';
import { findById } from '../models/User';

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, error: 'Not authorized, token missing' });
    }

    try {
        const decoded = verify(token, process.env.JWT_SECRET || 'secretkey');
        const user = await findById(decoded.id).select('-password');
        if (!user) {
            return res.status(401).json({ success: false, error: 'Not authorized, user not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error('Auth middleware error:', error.message);
        return res.status(401).json({ success: false, error: 'Not authorized, token invalid' });
    }
};

export default protect;
