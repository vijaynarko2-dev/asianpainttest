const PaymentRequest = require("../models/paymentRequest.model");
const AdminQr = require("../models/adminQr.model");
const User = require("../models/user.model");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// Configure Cloudinary (User should provide env vars)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Admin: Upload QR Code & Update UPI ID
exports.uploadQr = async (req, res) => {
    try {
        const { upiId } = req.body;
        const qrUrl = req.file ? req.file.path : null;

        if (!qrUrl && !upiId) {
            return res.status(400).json({ success: false, message: "Nothing to update" });
        }

        // Update or Create the single Admin QR record
        let adminQr = await AdminQr.findOne();
        if (adminQr) {
            if (qrUrl) adminQr.imageUrl = qrUrl;
            if (upiId !== undefined) adminQr.upiId = upiId;
            await adminQr.save();
        } else {
            adminQr = await AdminQr.create({
                imageUrl: qrUrl || "uploads/default.png",
                upiId: upiId || ""
            });
        }

        res.status(200).json({ success: true, message: "Payment details updated", qr: adminQr });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Public: Get QR Code
exports.getQr = async (req, res) => {
    try {
        const adminQr = await AdminQr.findOne();
        if (!adminQr) {
            return res.status(404).json({ success: false, message: "No QR Code available" });
        }
        res.status(200).json({ success: true, qr: adminQr });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// User: Submit Payment Request
exports.submitPayment = async (req, res) => {
    try {
        const { amount, utr, userId } = req.body; // userId usually from req.user

        // Check duplication
        const existing = await PaymentRequest.findOne({ utr });
        if (existing) {
            return res.status(400).json({ success: false, message: "UTR already submitted" });
        }

        const request = await PaymentRequest.create({
            userId: req.user._id,
            amount,
            utr,
            status: "pending"
        });

        res.status(201).json({ success: true, message: "Payment submitted for verification", request });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Admin: Get All Payment Requests
exports.getPaymentRequests = async (req, res) => {
    try {
        const requests = await PaymentRequest.find().sort({ createdAt: -1 }).populate("userId", "name email");
        res.status(200).json({ success: true, requests });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Admin: Update Payment Status
exports.updatePaymentStatus = async (req, res) => {
    try {
        const { id, status } = req.body; // status: 'approved' or 'rejected'

        const request = await PaymentRequest.findById(id);
        if (!request) {
            return res.status(404).json({ success: false, message: "Request not found" });
        }

        request.status = status;
        await request.save();

        if (status === 'approved') {
            if (request.userId) {
                try {
                    const user = await User.findById(request.userId);
                    if (user) {
                        user.balance = (user.balance || 0) + Number(request.amount);
                        await user.save();
                    } else {
                        console.warn(`User not found for request ${id}`);
                    }
                } catch (err) {
                    console.error("Error updating user balance:", err);
                    // We might not want to 500 here if the status update itself is okay, 
                    // but usually, approval MUST result in balance. 
                    // Let's at least log it.
                }
            } else {
                console.warn(`No userId associated with request ${id}`);
            }
        }

        res.status(200).json({ success: true, message: `Payment ${status}`, request });
    } catch (error) {
        console.error("Update Status Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
