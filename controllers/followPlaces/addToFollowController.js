const express = require("express");
const router = express.Router();
const { db, admin, auth } = require("../../config/firebaseConfig");
const redis = require("redis");
const redisClient = redis.createClient();

router.post("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const key = 'sess:' + req.body.z;


    redisClient.get(key, (err, data) => {

        const user = JSON.parse(data);
        const PlaceId = req.body.placeId;
        const PlaceName = req.body.placeName

        let followPlace = {
            placeId: PlaceId,
            placeName: PlaceName,
            uid: user.localId,
        }

        db.collection('users')
            .doc(user.localId)
            .collection('follow')
            .doc()
            .set(followPlace)
            .then(() => {
                res.json({
                    addFollow: true
                })
            })
            .catch(error => {
                console.log(error);
                res.json({
                    addFollow: false
                })
            })

    })

});
module.exports = router; 
