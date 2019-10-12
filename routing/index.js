const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const GoogleloginController = require("../controlers/GoogleLoginControles");
const FbloginController = require("../controlers/FbLoginControles");
const SessionLogin = require("../controlers/firebaseControles/sessionLogin");

router.get("/", main.mailina);

router.post("/sessionLogin", SessionLogin.sessionLogin);

router.post("/loginGoogle", GoogleloginController.LoginGoogle);
router.post("/loginFB", FbloginController.LoginFB);

module.exports = router;
