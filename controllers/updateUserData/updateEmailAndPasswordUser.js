const express = require("express");
const router = express.Router();
const { db, admin, auth } = require("../../config/firebaseConfig");
const redis = require("redis");
const redisClient = redis.createClient();
router.post("/", (req, res) => {
    console.log("weszło")
    res.setHeader("Access-Control-Allow-Origin", "*");
    const key = 'sess:' + req.body.z
    redisClient.get(key, (error, data) => {
        try{
        data = JSON.parse(data)
        console.log(data)
        const uid = data.localId;
        console.log(req.body.password)
            if(req.body.password === undefined ||req.body.password === null){
                admin
                .auth()
                .updateUser(uid, {
                email: req.body.email,
                })
                .then(user => {
                    console.log("1",user);
                    data.email=req.body.email;
                    data = JSON.stringify(data);
                    redisClient.set(key, data)
                    res.json({
                        updateEamil:true,
                        users: user
                    });
                })
                .catch(err => {
                    console.log(err);
                });
            } 
            else if(req.body.email === null || req.body.email ===undefined ){
                admin
                .auth()
                .updateUser(uid, {
                password: req.body.password
                })
                .then(user => {
                console.log("2",user);
                res.json({
                    updatePassword:true,
                    users: user
                    });
                })
                .catch(err => {
                    console.log(err);
                });
            }
            else if(req.body.email != null && req.body.password != null &&req.body.email != undefined && req.body.password != undefined){
                admin
                .auth()
                .updateUser(uid, {
                email: req.body.email,
                password: req.body.password
                })
                .then(user => {
                    console.log("3",user);
                    data.email=req.body.email;
                    data = JSON.stringify(data);
                    redisClient.set(key, data)
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
        }
        catch(error){
            console.log("local id is null")
        }
    })
});
module.exports = router;
