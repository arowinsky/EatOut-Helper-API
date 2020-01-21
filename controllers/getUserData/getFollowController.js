const express = require("express");
const router = express.Router();
const redis = require("redis");
const redisClient = redis.createClient();
const { db, admin, auth } = require("../../config/firebaseConfig");

router.post("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const key = 'sess:' + req.body.z;

    redisClient.get(key, (error, data) => {
        data = JSON.parse(data);

        db.collection("users").doc(data.localId).collection('follow')
            .get()
            .then((follow) => {
                if(follow.empty){
                    res.json({
                        follows:false
                    })
                }
                else{
                const followArray = follow.docs.map(follows => {
                    const {
                        PlaceId,
                        PlaceName,
                    } = follows.data()
                    const array = {
                        placeId: PlaceId,
                        placeName: PlaceName,
                    }
                    return array;
                })
                res.json({
                    follows: followArray
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })

    })


});

module.exports = router;


