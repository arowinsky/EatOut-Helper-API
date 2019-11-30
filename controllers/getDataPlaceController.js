const express = require("express");
const router = express.Router();
const redis = require("redis");
const redisClient = redis.createClient();
const { db, admin} = require("../config/firebaseConfig");

router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  console.log(req.body);
  const z = req.body.z;

  const key = "sess:" + z;
  console.log(key);
  redisClient.get(key, (error, red) => {
    const dates = JSON.parse(red);
try{
    db.collection("eatingPlaces")
      .where("info.owner", "==", dates.localId)
      .get()
      .then(places => {
        if (places.empty) {
          res.json({
            places: false
          });
        } else {
          const Places = places.docs.map(doc => {
            const {
              dishes,
              info,
              kitchen,
              opportunity,
              facilities
            } = doc.data();

            const id = doc.id;
            const avatar = `https://storage.cloud.google.com/eatout/${dates.localId}/${id}/avatar.jpg`;
            const header = `https://storage.cloud.google.com/eatout/${dates.localId}/${id}/header.jpg`;
            const menu = `https://storage.cloud.google.com/eatout/${dates.localId}/${id}/menu.jpg`;

            const array = {
              id: id,
              dishes: dishes,
              info: info,
              kitchen: kitchen,
              opportunity: opportunity,
              facilities: facilities,
              avatar: avatar,
              header: header,
              menu: menu
            };
            return array;
          });

          res.json({
            places: Places
          });
        }
      });
    }
    catch(error)
    {
      res.json({
        error:"wrong_z"
      })
    }
  });
});

module.exports = router;
