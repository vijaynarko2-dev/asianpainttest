
const express = require("express");
const { login, logout, register, getMe } = require("../controllers/user.controller");
const { isauthenticated } = require("../middleware/auth");
const router = express.Router();


router.get("/me", isauthenticated, getMe);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);


module.exports = router;