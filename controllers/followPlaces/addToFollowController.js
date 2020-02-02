const express = require("express");
const router = express.Router();
const { db, admin, auth } = require("../../config/firebaseConfig");
const redis = require("redis");
const redisClient = redis.createClient();

router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const key = "sess:" + req.body.z;

  redisClient.get(key, (err, data) => {
    const user = JSON.parse(data);
    const PlaceId = req.body.placeId;
    console.log("TCL: PlaceId", PlaceId);
    const PlaceName = req.body.placeName;
    console.log("TCL: PlaceName", PlaceName);

    let followPlace = {
      placeId: PlaceId,
      placeName: PlaceName,
      uid: user.localId
    };

    db.collection("users")
      .doc(user.localId)
      .collection("follow")
      .doc()
      .set(followPlace)
      .then(() => {
        res.json({
          userFollowing: true
        });
      })
      .catch(error => {
        console.log(error);
        res.json({
          userFollowing: false
        });
      });
  });
});
module.exports = router;
