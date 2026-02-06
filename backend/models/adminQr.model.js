const mongoose = require("mongoose");

const adminQrSchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    upiId: {
        type: String,
        default: ""
    }
}, { timestamps: true });

module.exports = mongoose.model("AdminQr", adminQrSchema);
