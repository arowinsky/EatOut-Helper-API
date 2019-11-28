const express = require("express");
const router = express.Router();
const { db, admin, storage } = require("../config/firebaseConfig");

router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const post = req.body.textOfPost;
  const nameLocal = req.body.eatingPlaceName;
  const local = req.body.eatingPlaceId;

  db.collection("eatingPlaces")
    .doc(local)
    .collection("posts_owner")
    .doc()
    .set({ post: post, author: nameLocal, date: new Date() })
    .then(() => {
      res.json({
        addedPost: true
      });
    });
});
module.exports = router;
