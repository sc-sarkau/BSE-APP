const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

const { handleRegisterNewUser } = require("../controllers/userRegisteration");
const {
  handleCredentialsValidity,
} = require("../controllers/credentialsValidity");

router.post("/register", auth, handleRegisterNewUser);

router.post("/", handleCredentialsValidity);

module.exports = router;
