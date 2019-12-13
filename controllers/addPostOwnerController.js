const express = require("express");
const router = express.Router();
const { db, admin, auth } = require("../config/firebaseConfig");

router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const post = req.body.textOfPost;
  const nameLocal = req.body.eatingPlaceName;
  const local = req.body.eatingPlaceId;

  db.collection("eatingPlaces")
    .doc(local)
    .collection("postsOwner")
    .doc()
    .set({ post: post, author: nameLocal, date: new Date() })
    .then(doc => {
      db.collection("eatingPlaces")
        .doc(local)
        .collection("postsOwner")
        .orderBy("date", "desc")
        .get()
        .then(posts => {
          const postsOwner = posts.docs.map(doc => {
            const { author, post, date } = doc.data();

            const newDate = date.toDate();
            const DateString = newDate.toISOString();
            const year = DateString.substr(0, 4);
            const month = DateString.substr(5, 2);
            const day = DateString.substr(8, 2);
            let hour = DateString.substr(11, 2);
            hour = parseInt(hour, 10);
            hour++;
            hour.toString();
            const minute = DateString.substr(14, 2);
            const sendDate =
              day + "." + month + "." + year + " " + hour + ":" + minute;

            const array = {
              author: author,
              post: post,
              date: sendDate
            };
            return array;
          });

          res.json({
            addedPost: true,
            postsForCurrentProfile: postsOwner
          });
        });
    })
    .catch(error => {
      res.json({
        error: error
      });
    });
});
module.exports = router;
