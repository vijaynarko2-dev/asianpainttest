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
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:5176',
      'http://localhost:5177',
      'http://localhost:5178',
      'http://localhost:5179',
      'http://localhost:5180',
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,

}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// health check
app.get('/health', (req, res) => res.json({ ok: true }))

app.use("/api/auth/v1", router);
connectdb()
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});