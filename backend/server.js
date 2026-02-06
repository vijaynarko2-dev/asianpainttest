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

// dotenv.config({ path: "./config/config.env" });
const connectdb = require("./db/conn")
const app = express();

const PORT = process.env.PORT;
app.use(cors({
    origin: 'http://localhost:5173',

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,

}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth/v1", router);
app.use("/api/payment/v1", paymentrouter);
app.use("/uploads", express.static("uploads"));

connectdb()
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});