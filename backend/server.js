const express = require("express");
const dotenv = require("dotenv");

const path = require("path");
dotenv.config({
    path: path.join(__dirname, "config", "config.env")
});
const cors = require("cors");
const router = require("./routes/router");
const cookieParser = require('cookie-parser');
const paymentrouter = require("./routes/paymentrouter");
const orderrouter = require("./routes/orderrouter");

// dotenv.config({ path: "./config/config.env" });
const connectdb = require("./db/conn")
const app = express();

const PORT = process.env.PORT;
app.use(cors({
    origin: true,

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,

}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth/v1", router);
app.use("/api/payment/v1", paymentrouter);
app.use("/api/orders", orderrouter);

// Debug: Log 404s for API routes
app.use('/api', (req, res) => {
    console.log(`404 - Not Found: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found on server` });
});

app.use("/uploads", express.static("uploads"));

connectdb()
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
