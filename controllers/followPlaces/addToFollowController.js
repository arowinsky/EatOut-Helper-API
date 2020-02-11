const express = require("express");
const router = express.Router();
const { db, admin, auth } = require("../../config/firebaseConfig");
const redis = require("redis");
const redisClient = redis.createClient();

router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { z } = req.body;
  const key = "sess:" + z;

  redisClient.get(key, (err, data) => {
    try {
      const user = JSON.parse(data);
      const { placeId, placeName } = req.body;

      db.collection("eatingPlaces")
        .doc(placeId)
        .get()
        .then(place => {
          const owner = place.data().info.owner;
          let followPlace = {
            placeId: placeId,
            placeName: placeName,
            uid: user.localId,
            avatar: `https://storage.cloud.google.com/eatout/${owner}/${placeId}/avatar.jpg`
          };
          db.collection("users")
            .doc(user.localId)
            .collection("follow")
            .doc()
            .set(followPlace)
            .then(() => {
              res.json({
                userFollowing: true,
                followingPlaceId: followPlace.placeId
              });
            })
            .catch(error => {
              console.log(error);
              res.json({
                userFollowing: false
              });
            });
        });
    } catch (error) {
      console.log("wrong z");
    }
  });
});
module.exports = router;
