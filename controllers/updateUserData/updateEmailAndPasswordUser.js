const express = require("express");
const router = express.Router();
const { db, admin, auth } = require("../../config/firebaseConfig");
const redis = require("redis");
const redisClient = redis.createClient();
router.post("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const key = 'sess:' + req.body.z
    redisClient.get(key, (error, data) => {
        data = JSON.parse(data)
        const uid = data.localId;
if(req.body.password === null)
{
    admin
    .auth()
    .updateUser(uid, {
        email: req.body.email,
    })
    .then(user => {
        console.log(user);
        res.json({
            updateEamil:true,
            users: user
        });
    })
    .catch(err => {
        console.log(err);
    });
} else if(req.body.email === null){
    admin
    .auth()
    .updateUser(uid, {
        password: req.body.password
    })
    .then(user => {
        console.log(user);
        res.json({
            updatePassword:true,
            users: user
        });
    })
    .catch(err => {
        console.log(err);
    });
}
else if(req.body.email != null && req.body.password != null){
    admin
    .auth()
    .updateUser(uid, {
        email: req.body.email,
        password: req.body.password
    })
    .then(user => {
        console.log(user);
        res.json({
            updateEamil:true,
            updatePassword:true,
            users: user
        });
    })
    .catch(err => {
        console.log(err);
    });
}

    })

});
module.exports = router;
