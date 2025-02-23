const express = require("express");

const router = express.Router();

//importing the user controller

const { login, signup } = require("../controllers/Auth");

router.post("/login", login);
router.post("/signup", signup);

module.exports = router;
