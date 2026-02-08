const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const { isauthenticated } = require("../middleware/auth");

// User routes (protected)
router.post("/create", isauthenticated, orderController.createOrder);
router.get("/my-orders", isauthenticated, orderController.getUserOrders);
router.get("/stats", isauthenticated, orderController.getUserStats);

// Admin routes (protected + admin check would go here)
router.put("/update/:id", isauthenticated, orderController.updateOrderStatus);

module.exports = router;
