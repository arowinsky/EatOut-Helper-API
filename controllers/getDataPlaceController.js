const express = require("express");
const router = express.Router();
const redis = require("redis");
const redisClient = redis.createClient();
const { db, admin } = require("../config/firebaseConfig");

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
      db.collection("eatingPlace")
        .where("info.owner", "==", dates.localId)
        .get()
        .then(snapshot => {
          if (snapshot.empty) {
            console.log("No matching documents.");
            return;
          }
          snapshot.forEach(doc => {
            const dishs = doc.data().dishs;
            const info = doc.data().info;
            const kitchen = doc.data().kitchen;
            const opportunity = doc.data().opportunity;
            const facilities = doc.data().facilities;
            const id = doc.id;
            res.json({
              dishs: dishs,
              info: info,
              kitchen: kitchen,
              opportunity: opportunity,
              facilities: facilities,
              id: id
            });
          });
        });
    });
  }
});
module.exports = router;
