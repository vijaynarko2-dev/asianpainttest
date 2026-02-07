const Order = require("../models/order.model");
const User = require("../models/user.model");

// Create new order when user confirms investment
exports.createOrder = async (req, res) => {
    try {
        const { planName, planImage, duration, investmentAmount, dailyEarnings, totalGain } = req.body;

        // Check if user has sufficient balance
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.balance < investmentAmount) {
            return res.status(400).json({ success: false, message: "Insufficient balance" });
        }

        // Deduct investment amount from balance
        user.balance -= investmentAmount;
        user.totalInvested = (user.totalInvested || 0) + investmentAmount;
        await user.save();

        // Create order
        const order = await Order.create({
            userId: req.user._id,
            planName,
            planImage,
            duration,
            investmentAmount,
            dailyEarnings,
            totalGain
        });

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order,
            newBalance: user.balance
        });
    } catch (error) {
        console.error("Create Order Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all orders for logged-in user
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id })
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get dashboard statistics for user
exports.getUserStats = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const orders = await Order.find({ userId: req.user._id });

        const activeOrders = orders.filter(order => order.status === "active");
        const completedOrders = orders.filter(order => order.status === "completed");

        const stats = {
            balance: user.balance || 0,
            totalInvested: user.totalInvested || 0,
            totalEarnings: user.totalEarnings || 0,
            activeOrdersCount: activeOrders.length,
            completedOrdersCount: completedOrders.length,
            totalOrders: orders.length
        };

        res.status(200).json({ success: true, stats });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update order status (admin function)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        order.status = status;
        if (status === "completed") {
            order.completionDate = new Date();

            // Update user's total earnings
            const user = await User.findById(order.userId);
            if (user) {
                user.totalEarnings = (user.totalEarnings || 0) + order.totalGain;
                await user.save();
            }
        }
        await order.save();

        res.status(200).json({ success: true, message: "Order status updated", order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
