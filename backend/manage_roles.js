const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/user.model');

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

const [, , email, role] = process.argv;

if (!email || !role) {
    console.log("Usage: node manage_roles.js <email> <role>");
    process.exit(1);
}

const manageRole = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');

        const user = await User.findOne({ email });

        if (!user) {
            console.log(`User not found: ${email}`);
        } else {
            user.role = role;
            await user.save();
            console.log(`Updated ${user.name} (${user.email}) to role: ${user.role}`);
        }

        await mongoose.connection.close();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

manageRole();
