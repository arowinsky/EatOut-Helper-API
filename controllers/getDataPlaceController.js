const express = require("express");
const router = express.Router();
const redis = require("redis");
const redisClient = redis.createClient();
const {db} = require("../config/firebaseConfig");

router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log(req.body);
  const z = req.body.z;
  if (z != "null") {
    const key = "sess:" + z;
    console.log(key);
    redisClient.get(key, (error, red) => {
      const dates = JSON.parse(red);
      console.log(dates);
      console.log("local ", dates.localId);
      db.collection("restaurants")
        .where("info.owner", "==", dates.localId)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log("No matching documents.");
            return;
          }
          snapshot.forEach(doc => {
            console.log(doc.id, "=>", doc.data().info);
            const eatingPlace = { ...doc.data().data, ...doc.data().info };
            res.json({
              eatingPlace: eatingPlace
            });
          });
        });
    });
  }
});
module.exports = router;
