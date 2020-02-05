const express = require("express");
const router = express.Router();
const redis = require("redis");
const redisClient = redis.createClient();
const { db, admin, auth } = require("../../config/firebaseConfig");
router.post("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    console.log(req.body);
    const { z, placeId } = req.body

    const key = "sess:" + z;
    console.log(key);
    redisClient.get(key, (err, data) => {
        try {
            data = JSON.parse(data);

                db.collection('users').doc(data.localId).collection('follow').where('placeId','==',placeId).get()
                .then(follow=>{
                    if(follow.empty)
                    {
                        res.json({
                            userFollowing: false  
                        })
                    }
                    else{
                        res.json({
                            userFollowing: true
                        })
                    }
                })
        }
        catch (error) {
            res.json({
                error: "I don't reading data from redis"
            })
        }
    });
});

module.exports = router;
