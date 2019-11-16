const express = require("express");
const router = express.Router();
const redis = require("redis");
const redisClient = redis.createClient();
const db = require("../config/firebaseConfig");

router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const data = JSON.parse(req.body.values);
  console.log(data);
  redisClient.get("sess:" + req.body.z, (err, user) => {
    user = JSON.parse(user);
    console.log(user);
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
      restaurantName: data.restaurantName,
      restaurantStreet: data.restaurantStreet,
      restaurantEmail: data.restaurantEmail,
      restaurantPhoneNumber: data.restaurantPhoneNumber
    };
    delete data.restaurantStreet;
    delete data.mondayOpenHour;
    delete data.mondayCloseHour;
    delete data.tuesdayOpenHour,
      delete data.tuesdayCloseHour,
      delete data.wednesdayOpenHour,
      delete data.wednesdayCloseHour,
      delete data.thursdayOpenHour,
      delete data.thursdayCloseHour,
      delete data.fridayOpenHour;
    delete data.fridayCloseHour;
    delete data.saturdayOpenHour;
    delete data.saturdayCloseHour;
    delete data.sundayOpenHour;
    delete data.sundayCloseHour;
    delete data.restaurantAvatar;
    delete data.restaurantHeader;
    delete data.restaurantMenu;
    delete data.restaurantName;
    db.collection("restaurants")
      .doc()
      .set({
        info,
        data
      })
      .then(() => {
        console.log("Sent");
        res.json({
          added: true
        });
      })
      .catch(err => {
        console.log("Error", err);
      });
  });
});
module.exports = router;
