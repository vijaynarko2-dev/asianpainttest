const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/user.model');

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

const listUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');

        const users = await User.find({}, 'name email role balance totalInvested totalEarnings');
        console.log('Users in database:');
        console.log(JSON.stringify(users, null, 2));

        await mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

listUsers();
