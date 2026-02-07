const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
// const {ErrorHandler} = require('../middleware/error')
exports.register = async (req, res, next) => {
    try {
        console.log('Incoming register:', req.body)
        const { name, email, password, phone } = req.body;
        if (!name || !email || !password || !phone) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
        user = await User.create({ name, email, password, phone });

        const token = user.generateToken();
        const options = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        };

        res.status(201).cookie('token', token, options).json({
            success: true,
            message: "User registered successfully",
            user,
            token
        })

    } catch (error) {
        return next(error);

    }

}
exports.login = async (req, res, next) => {
    try {
        console.log('Incoming login:', req.body)
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        let user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = user.generateToken();
        const options = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        };

        res.status(200).cookie('token', token, options).json({
            success: true,
            message: "User logged in successfully",
            user,
            token
        })
    } catch (error) {
        return next(error);
    }
}
exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        return next(error);
    }
}
exports.logout = async (req, res, next) => {
    try {
        res.status(200).cookie('token', null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            samesite: 'none',
            secure: true,
        })
            .json({
                success: true,
                message: "User logged out successfully"
            })


    } catch (error) {
        return next(error);
    }
}