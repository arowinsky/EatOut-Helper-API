const express = require("express");
const router = express.Router();
const redis = require("redis");
const redisClient = redis.createClient();
const { db, admin, auth } = require("../../config/firebaseConfig");

router.post("/", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const key = 'sess:' + req.body.z;

    redisClient(key, (error, data) => {
        data = JSON.parse(data);

        db.collection("users").doc(data.localId).collection('follow')
            .get()
            .then((follow) => {

                const followArray = follow.docs.map(follows => {
                    const {
                        placeId,
                        placeName,
                    } = follows.data()

                    const array = {
                        placeId: placeId,
                        placeName: placeName,
                    }
                    return array;
                })

                res.json({
                    follows: followArray
                })
            })
            .catch((error) => {
                console.log(error);
            })

    })


});

module.exports = router;


