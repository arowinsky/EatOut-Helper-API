const express = require("express");
const router = express.Router();
const { db, admin, auth } = require("../../config/firebaseConfig");
const redis = require("redis");
const redisClient = redis.createClient();

router.post("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const key = 'sess:' + req.body.z


    redisClient.get(key, (error, data) => {
        data = JSON.parse(data);
        console.log(data)
        const userData = req.body.firstName+" "+req.body.lastName;
        db.collection('users').doc(data.localId).update({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userData: userData,
            username: req.body.username,
        }).then(()=>{

            data.userData = userData;
            data.username = req.body.username;
            data = JSON.stringify(data);
            redisClient.set(key, data)
            

            res.json({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userData: userData,
                username: req.body.username,
                updateBasicData: true
            })
        })

    })
});
module.exports = router;
