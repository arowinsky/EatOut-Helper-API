const express = require("express");
const router = express.Router();
const { db, admin, auth } = require("../../config/firebaseConfig");
const redis = require("redis");
const redisClient = redis.createClient();

router.post("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const key = 'sess:' + req.body.z;


    redisClient.get(key, (err, data) => {
try{
        const user = JSON.parse(data);
        const PlaceId = req.body.placeId;
        const PlaceName = req.body.placeName

 

        db.collection('eatingPlaces').doc(PlaceId).get()
        .then(place=>{

            const owner = place.data().info.owner
            let followPlace = {
                placeId: PlaceId,
                placeName: PlaceName,
                uid: user.localId,
                avatar: `https://storage.cloud.google.com/eatout/${owner}/${PlaceId}/avatar.jpg`
            }
        db.collection('users')
            .doc(user.localId)
            .collection('follow')
            .doc()
            .set(followPlace)
            .then(() => {
                res.json({
                    userFollowing:true
                })
            })
            .catch(error => {
                console.log(error);
                res.json({
                    userFollowing:false
                })
            })
        })
    }
    catch(error){
        console.log('wrong z')
    }
    })

});
module.exports = router; 
