const express = require("express");
const router = express.Router();
const { db, admin, auth } = require("../../config/firebaseConfig");
const redis = require("redis");
const redisClient = redis.createClient();
router.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const key = 'sess:' + req.body.z
    redisClient.get(key, (error, data) => {
        data = JSON.parse(data)
        const uid = data.localId;
        admin
            .auth()
            .updateUser(uid, {
                email: req.body.email,
                password: req.body.password
            })
            .then(user => {
                console.log(user);
                res.json({
                    users: user
                });
            })
            .catch(err => {
                console.log(err);
            });
    })

});
module.exports = router;
