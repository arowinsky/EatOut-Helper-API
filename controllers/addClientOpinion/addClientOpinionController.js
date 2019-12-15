const express = require("express");
const router = express.Router();
const { db, admin, auth } = require("../../config/firebaseConfig");
const redis = require("redis");
const redisClient = redis.createClient();

router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const clientOpinion = req.body.clientOpinion;
  const z = "sess:" + req.body.z;
  const eatingPlaceId = req.body.eatingPlaceId;
  console.log(z);
  redisClient.get(z, (err, session) => {
    session = JSON.parse(session);
    try {
      const username = session.username;

      db.collection("eatingPlaces")
        .doc(eatingPlaceId)
        .collection("clientOpinions")
        .doc()
        .set({
          clientOpinion: clientOpinion,
          author: username,
          date: new Date()
        })
        .then(() => {
          db.collection("eatingPlaces")
            .doc(eatingPlaceId)
            .collection("clientOpinions")
            .orderBy("date", "desc")
            .get()
            .then(opinion => {
              if (opinion.empty) {
                console.log("empty");
              }
              const clientOpinion = opinion.docs.map(doc => {
                const { author, clientOpinion, date } = doc.data();

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
                  clientOpinion: clientOpinion,
                  date: sendDate
                };
                return array;
              });

              res.json({
                isAdded: true,
                opinionsForCurrentProfile: clientOpinion
              });
            });
        });
    } catch (error) {
      res.json({
        error: "wrong_z"
      });
    }
  });
});
module.exports = router;
