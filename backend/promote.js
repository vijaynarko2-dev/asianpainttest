const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/user.model');

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

const promoteUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');

        const emails = ['vansh@test.com', 'shirish@gmail.com', 'vanshj@hoshodigital.com'];
        const result = await User.updateMany(
            { email: { $in: emails } },
            { $set: { role: 'admin' } }
        );

        console.log(`${result.modifiedCount} users promoted to admin.`);

        await mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

promoteUsers();
