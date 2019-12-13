const express = require("express");
const router = express.Router();
const veryEamil = require('./veryEamil')
require("firebase/auth");
router.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const mode = req.query.mode;
    const oobCode = req.query.oobCode
    console.log(mode, oobCode)
    switch (mode) {

        case 'resetPassword':

            break;


        case 'verifyEmail':
            veryEamil(oobCode)
            break;
    }

});
module.exports = router;
