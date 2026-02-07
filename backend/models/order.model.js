const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    planName: {
        type: String,
        required: true
    },
    planImage: {
        type: String,
        default: ""
    },
    duration: {
        type: String,
        required: true
    },
    investmentAmount: {
        type: Number,
        required: true
    },
    dailyEarnings: {
        type: Number,
        required: true
    },
    totalGain: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "completed", "cancelled"],
        default: "active"
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    completionDate: {
        type: Date,
        default: null
    },
    daysRemaining: {
        type: Number,
        default: function () {
            // Extract number from duration string (e.g., "58 Days" -> 58)
            const match = this.duration.match(/\d+/);
            return match ? parseInt(match[0]) : 0;
        }
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
