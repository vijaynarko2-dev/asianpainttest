const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/user.model');

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

const promoteUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');

        const emails = ['ashianpaint@gmail.com', 'vinayak@gmail.com', 'Vijaynarko2@gmail.com'];
        // Find existing users first to show who was found
        const existing = await User.find({ email: { $in: emails } });
        console.log(`Found ${existing.length} matching users to promote.`);

        const result = await User.updateMany(
            { email: { $in: emails } },
            { $set: { role: 'admin' } }
        );

        console.log(`${result.modifiedCount} users have been promoted/confirmed as admin.`);

        await mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

promoteUsers();
