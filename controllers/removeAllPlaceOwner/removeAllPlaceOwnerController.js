const express = require("express");
const router = express.Router();
const redis = require("redis");
const redisClient = redis.createClient();
const { db, admin, auth } = require("../../config/firebaseConfig");
const deleteImages = require("./deleteImg");
router.delete("/:z", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { z } = req.params;
  const key = "sess:" + z;
  redisClient.get(key, (err, red) => {
    red = JSON.parse(red);
    db.collection("eatingPlaces")
      .where("info.owner", "==", red.localId)
      .get()
      .then(docs => {
        if (docs.empty) {
          console.log("docs are empty");
          res.json({
            removeAllPlace: false,
            message: "0 docs"
          });
        } else {
          docs.forEach(doc => {
            db.collection("eatingPlaces")
              .doc(doc.id)
              .delete()
              .then(async () => {
                await deleteImages("avatar.jpg", red.localId, doc.id);
                await deleteImages("header.jpg", red.localId, doc.id);
                await deleteImages("menu.jpg", red.localId, doc.id);
              });
          });
          res.json({
            removeAllPlace: true,
            ownerPlaces: null
          });
        }
      })
      .catch(error => {
        console.log(error);
        res.json({ removeAllPlace: false });
      });
  });
});

module.exports = router;
