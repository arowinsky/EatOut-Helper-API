const express = require("express");
const router = express.Router();

const { db, admin, auth } = require('../../config/firebaseConfig')
router.post("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");


    const oobCode = req.body.oobCode
    const newPassword = req.body.newPassword
    auth.verifyPasswordResetCode(oobCode)
    .then((email)=>{
        console.log(email);

        auth.confirmPasswordReset(oobCode, newPassword).then( (resp)=>{

            console.log('reset password complete')

            res.json({resetPassword:true})
        })
        .catch(err=>{
            console.log(err)
            res.json({resetPassword:false})
        })

    })
    .catch(error=>{
        console.log(error)
        res.json({resetPassword:false})
    })

});
module.exports = router;
