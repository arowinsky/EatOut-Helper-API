const express = require("express");
const router = express.Router();
const redis = require("redis");
const redisClient = redis.createClient();
const { db, admin } = require("../config/firebaseConfig");

router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const data = JSON.parse(req.body.values);
  redisClient.get("sess:" + req.body.z, (err, user) => {
    user = JSON.parse(user);
    try{
    const info = {
      owner: user.localId,
      mondayOpenHour: data.mondayOpenHour,
      mondayCloseHour: data.mondayCloseHour,
      tuesdayOpenHour: data.tuesdayOpenHour,
      tuesdayCloseHour: data.tuesdayCloseHour,
      wednesdayOpenHour: data.wednesdayOpenHour,
      wednesdayCloseHour: data.wednesdayCloseHour,
      thursdayOpenHour: data.thursdayOpenHour,
      thursdayCloseHour: data.thursdayCloseHour,
      fridayOpenHour: data.fridayOpenHour,
      fridayCloseHour: data.fridayCloseHour,
      saturdayOpenHour: data.saturdayOpenHour,
      saturdayCloseHour: data.saturdayCloseHour,
      sundayOpenHour: data.sundayOpenHour,
      sundayCloseHour: data.sundayCloseHour,
      restaurantName:
        data.restaurantName.charAt(0).toUpperCase() +
        data.restaurantName.slice(1),
      restaurantStreet: data.restaurantStreet,
      restaurantEmail: data.restaurantEmail,
      restaurantPhoneNumber: data.restaurantPhoneNumber
    };
    const dishes = {
      pizza: data.pizza,
      sushi: data.sushi,
      ramen: data.ramen,
      kawa: data.kawa,
      makaron: data.makaron,
      kebab: data.kebab,
      stek: data.stek,
      ciastko: data.ciasto,
      burger: data.burger,
      zapiekanki: data.zapiekanki,
      obiad: data.obiad,
      alkohol: data.alkohol
    };

    const kitchen = {
      arabska: data.arabska,
      europejska: data.europejska,
      francuska: data.francuska,
      meksykanska: data.meksykańska,
      amerykanska: data.amerykańska,
      domowa: data.domowa,
      azjatycka: data.azjatycka,
      dietetyczna: data.dietetyczna,
      wloska: data.włoska,
      polska: data.polska,
      wege_wegan: data.wege_wegan
    };
    console.log(kitchen);
    const opportunity = {
      sniadanie: data.śniadanie,
      lunch: data.lunch,
      randka: data.randka,
      pub: data.pub
    };
    console.log(opportunity);
    const facilities = {
      wifi: data.wifi,
      przystosowanie_dla_osob_niepelnosprawnych:
        data.przystosowane_dla_osób_niepełnosprawnych,
      insta_friendly: data.insta_friendly,
      transmija_meczy: data.transmisja_meczy,
      pokoj_dla_matki_z_dzieckiem: data.pokój_dla_matki_z_dzieckiem,
      jezyk_migowy: data.język_migowy,
      ogrodek: data.ogródek,
      animal_friendly: data.animal_friendly
    };
    console.log(facilities);
    db.collection("eatingPlaces")
      .doc()
      .add({
        info,
        dishes,
        kitchen,
        opportunity,
        facilities
      })
      .then((idPlace) => {
        console.log("Sent");
        console.log(idPlace.id)
        res.json({
          added: true,
          idPlace:idPlace.id,
          idUser:user.localId
        });
      })
      .catch(err => {
        console.log("no added", err);
      });
    }
    catch(error){
      res.json({
        error:"Error redis"
      })
    }
  });
});
module.exports = router;
