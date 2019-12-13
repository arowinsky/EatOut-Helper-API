const express = require("express");
const router = express.Router();

const { db, admin, auth } = require('../../config/firebaseConfig')
router.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const mode = req.query.mode;
    const oobCode = req.query.oobCode

    auth.applyActionCode(oobCode).then(resp => {
        console.log('emailVerti')

       res.json({
           status:true
       })
    })
        .catch(err => { console.log("error")
  
        console.log('bład',err)
        res.json({status:false})
        
    })
});
module.exports = router;
