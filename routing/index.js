const express = require("express");
const router = express.Router();
const GoogleloginController = require("../controllers/GoogleLoginController");
const FbloginController = require("../controllers/FbLoginController");
const SessionLogin = require("../controllers/firebaseControllers/sessionLogin");

router.post("/sessionLogin", SessionLogin.sessionLogin);
router.post("/loginGoogle", GoogleloginController.LoginGoogle);
router.post("/loginFB", FbloginController.LoginFB);

module.exports = router;
