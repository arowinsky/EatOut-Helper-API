const express = require("express");
const router = express.Router();
const GoogleloginController = require("../controlers/GoogleLoginControles");
const FbloginController = require("../controlers/FbLoginControles");
const SessionLogin = require("../controlers/firebaseControles/sessionLogin");

router.post("/sessionLogin", SessionLogin.sessionLogin);
router.post("/loginGoogle", GoogleloginController.LoginGoogle);
router.post("/loginFB", FbloginController.LoginFB);

module.exports = router;
