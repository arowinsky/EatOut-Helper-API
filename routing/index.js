const express = require("express");
const router = express.Router();
const SessionLogin = require("../controllers/firebaseControllers/sessionLogin");

router.post("/sessionLogin", SessionLogin.sessionLogin);

module.exports = router;
