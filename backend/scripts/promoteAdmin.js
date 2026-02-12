const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');
const User = require('../models/user.model');

// Load env
dotenv.config({ path: path.join(__dirname, '..', 'config', 'config.env') });

const promoteToAdmin = async (email) => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB ✅');

        const user = await User.findOneAndUpdate(
            { email: email },
            { role: 'admin' },
            { new: true }
        );

        if (!user) {
            console.error(`User with email ${email} not found ❌`);
        } else {
            console.log(`User ${email} promoted to admin successfully! ✅`);
            console.log(user);
        }

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('Error promoting user:', error.message);
        process.exit(1);
    }
};

const email = 'test@gmail.com';
promoteToAdmin(email);
