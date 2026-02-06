const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
// const {ErrorHandler} = require('../middleware/error')


const isauthenticated = async (req, res, next) => {
    try {
        if (!req.cookies) {
            return res.status(401).json({ message: 'Cookies are missing. Please allow cookies or login again.' });
        }
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ message: 'Please login to access this resource' });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            req.user = await User.findById(decoded._id);
            console.log(req.user);
            next();
        } catch (jwtError) {
            if (jwtError.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Session expired. Please login again.' });
            }
            return res.status(401).json({ message: 'Invalid token. Please login again.' });
        }
    } catch (error) {
        return next(error);
    }
}
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Role: ${req.user.role} is not allowed to access this resource`
            });
        }
        next();
    }
}

module.exports = { isauthenticated, authorizeRoles }