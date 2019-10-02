const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false});

const EmailloginController = require('../controlers/EmailLoginContorles');
const GoogleloginController = require('../controlers/GoogleLoginControles');
const FbloginController = require('../controlers/FbLoginControles');

router.post('/loginEmail',urlencodedParser, EmailloginController.LoginEmail);

router.post('/loginGoogle', GoogleloginController.LoginGoogle);
router.post('/loginFB', FbloginController.LoginFB);





module.exports = router;