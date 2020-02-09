const express = require("express");
const router = express.Router();
const redis = require("redis");
const redisClient = redis.createClient();
const { db, admin, auth } = require("../../config/firebaseConfig");
router.delete("/:z", (req, res) => {

console.log('udało się')
  console.log("z teraz:", req.params.z);
  const { z } = req.params;

  const key = "sess:" + z;
  console.log(key);
  redisClient.get(key, (err, data) => {
    try {
      console.log("przeszło z ", z)
      // data = JSON.parse(data);

      // db.collection("users")
      //   .doc(data.localId)
      //   .collection("follow")
      //   .get()
      //   .then(follow => {
      //     follow.forEach(follows => {
      //       db.collection("users")
      //         .doc(data.localId)
      //         .collection("follow")
      //         .doc(follows.id)
      //         .delete();
      //     });
      //   });
      // db.collection("users")
      //   .doc(data.localId)
      //   .delete();
      // admin
      //   .auth()
      //   .deleteUser(data.localId)
      //   .then(() => {
      //     redisClient.del(key);
      //     res.json({
      //       clientDeleted: true
      //     });
      //   });
    } catch (error) {
      console.log(error);
    }
  });
});

module.exports = router;
