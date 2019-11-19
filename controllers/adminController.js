const express = require("express");
const router = express.Router();
const {db, admin} = require('../config/firebaseConfig');

router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

const uid = req.body.uid;

    admin.auth().getUser(uid)
    .then(user =>{
        res.json({
            delete:'true'
        });
    })
    .catch(err =>{
        console.log(err)
    });
    


});
module.exports = router;