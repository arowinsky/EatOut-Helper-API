const express = require("express");
const router = express.Router();
const redis = require("redis");
const redisClient = redis.createClient();
const db = require("../config/firebaseConfig");

router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log(req.body);
  const localId = req.body.localId;
  if (localId != "null") {
    //   redisClient.get(key, (err,) => {

    //   })
    db.collection("restaurants")
      .where("info.owner", "==", localId)
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          return;
        }
        snapshot.forEach(doc => {
          console.log(doc.id, "=>", doc.data().info);
          const info = JSON.stringify(doc.data().info);

          // res.console.log("msg");
          res.json({
            eatingPlace: info
          });
        });
      });
  }
});
module.exports = router;
