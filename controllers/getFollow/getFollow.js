const express = require("express");
const router = express.Router();
const redis = require("redis");
const redisClient = redis.createClient();
const { db, admin, auth } = require("../../config/firebaseConfig");
router.post("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    console.log(req.body);
    const z = req.body.z;

    const key = "sess:" + z;
    console.log(key);
    redisClient.get(key, (err, data) => {
        data = JSON.parse(data);

        db.collection("users").doc(data.localId).collection("follow").get()
            .then(follow => {
                const Follow = follow.docs.map(follows => {
                    const {
                        placeId,
                        placeName,
                    } = follows.data()

                    const array = {
                        placeId: placeId,
                        placeName: placeName
                    }

                    return (array)
                })
                res.json({
                    follow: Follow
                });

            })


    });
});

module.exports = router;
