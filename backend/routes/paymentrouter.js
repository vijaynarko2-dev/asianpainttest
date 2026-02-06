const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getQr, uploadQr, submitPayment, getPaymentRequests, updatePaymentStatus } = require('../controllers/payment.controller');

// Multer config for local storage (uploads folder)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Ensure 'uploads' directory exists or use a temp one. 
        // For now, let's put it in public/uploads if we were robust, 
        // but let's stick to root/uploads
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) // Append extension
    }
})
const upload = multer({ storage: storage });

const { isauthenticated, authorizeRoles } = require('../middleware/auth');

// Public Routes
router.get('/qr', getQr);
router.post('/submit', isauthenticated, submitPayment);

// Admin Routes (Security removed as per request)
router.post('/admin/upload-qr', upload.single('qrImage'), uploadQr);
router.get('/admin/requests', getPaymentRequests);
router.patch('/admin/request-status', updatePaymentStatus);

// Create uploads directory if not exists (Hack for this script)
const fs = require('fs');
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

module.exports = router;