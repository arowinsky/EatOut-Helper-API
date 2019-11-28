const express = require("express");
const router = express.Router();
const redis = require("redis");
const redisClient = redis.createClient();
const { db, admin, storage } = require("../config/firebaseConfig");

router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  console.log(req.body);
  const z = req.body.z;

  const key = "sess:" + z;
  console.log(key);
  redisClient.get(key, (error, red) => {
    const dates = JSON.parse(red);

    db.collection('eatingPlaces').where("info.owner", "==", dates.localId).get()
      .then((places) => {

        places.docs.map(doc => {
          const dishes = doc.data().dishes;
          const info = doc.data().info;
          const kitchen = doc.data().kitchen;
          const opportunity = doc.data().opportunity;
          const facilities = doc.data().facilities;
          const id = doc.id;
          const avatar = `https://storage.cloud.google.com/eatout/${dates.localId}/${id}/avatar.jpg`
          const header = `https://storage.cloud.google.com/eatout/${dates.localId}/${id}/header.jpg`
          const menu = `https://storage.cloud.google.com/eatout/${dates.localId}/${id}/menu.jpg`

          const opinione = db.collection('eatingPlaces').doc(id).collection('clientOpinions').get()
            .then(Opinion => {

              const opinion = Opinion.docs.map(docs => {

                const { author, clientOpinion, data } = docs.data()

                const sendOpinin = {
                  author: author,
                  opinion: clientOpinion,
                  date: data
                }
                return (sendOpinin)
              })

              const array = {
                id: id,
                dishes: dishes,
                info: info,
                kitchen: kitchen,
                opportunity: opportunity,
                facilities: facilities,
                avatar: avatar,
                header: header,
                menu: menu,
                clientOpinions: opinion,
              }
              res.json({
                places: array,
              })

            })
        });
      })
  });
});



module.exports = router;
