const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
// const {ErrorHandler} = require('../middleware/error')


const isauthenticated = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ message: 'Please login to access this resource' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        req.user = await User.findById(decoded._id);
        console.log(req.user);
        next();
    } catch (error) {
        return next(error);
    }
}
module.exports = { isauthenticated } 