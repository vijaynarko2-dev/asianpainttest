const mongoose = require("mongoose");

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected ✅");
    } catch (error) {
        console.error("MongoDB connection failed ❌");
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectdb;
