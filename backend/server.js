const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const router = require("./routes/router");
const cookieParser = require('cookie-parser');
dotenv.config({
    path: path.join(__dirname, "config", "config.env")
});
// dotenv.config({ path: "./config/config.env" });
const connectdb = require("./db/conn")
const app = express();

const PORT = process.env.PORT;
app.use(cors({
    origin: 'http://localhost:5173',

    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,

}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth/v1", router);
connectdb()
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});