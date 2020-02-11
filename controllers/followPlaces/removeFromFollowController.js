const express = require("express");
const router = express.Router();
const { db, admin, auth } = require("../../config/firebaseConfig");
const redis = require("redis");
const redisClient = redis.createClient();

router.delete("/:z/:placeId", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { z, placeId } = req.params;
  const key = "sess:" + z;

  redisClient.get(key, (err, data) => {
    const user = JSON.parse(data);

    db.collection("users")
      .doc(user.localId)
      .collection("follow")
      .where("placeId", "==", placeId)
      .get()
      .then(docs => {
        if (docs.empty) {
          res.json({
            deleteFollow: "error"
          });
        } else {
          docs.forEach(doc => {
            db.collection("users")
              .doc(user.localId)
              .collection("follow")
              .doc(doc.id)
              .delete()
              .then(() => {
                res.json({ deleteFollow: true });
              })
              .catch(error => {
                console.log(error);
                res.json({ deleteFollow: false });
              });
          });
        }
      })
      .catch(error => {
        console.log(error);
        res.json({
          deleteFollow: false
        });
      });
  });
});
module.exports = router;
