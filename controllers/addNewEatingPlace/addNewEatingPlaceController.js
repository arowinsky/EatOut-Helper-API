const express = require("express");
const router = express.Router();
const redis = require("redis");
const redisClient = redis.createClient();
const { db, admin, auth } = require("../../config/firebaseConfig");
const uploadImg = require("../../upload/upload");
const deleteImg = require("../../upload/deleteFile");
router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  let statusType = true;

  if (req.files.photo === null || req.files.photo === undefined) {
    statusType = false;
    res.json({
      noAllImagesSended: true
    });
  } else {
    let unavailable = {
      errorAvatar: false,
      errorHeader: false,
      errorMenu: false
    };

    for (let i = 0; i < req.files.photo.length; i++) {
      if (
        req.files.photo[i].mimetype === "image/jpeg" ||
        req.files.photo[i].mimetype === "image/png" ||
        req.files.photo[i].mimetype === "image/bmp"
      ) {
      } else {
        switch (i) {
          case 0:
            statusType = false;
            unavailable.errorAvatar = true;
            break;

          case 1:
            statusType = false;
            unavailable.errorHeader = true;
            break;

          case 2:
            statusType = false;
            unavailable.errorMenu = true;
            break;
        }
      }
    }
    if (statusType === true) {
      redisClient.get("sess:" + req.body.z, (err, user) => {
        user = JSON.parse(user);
        try {
          const txt = req.body.places;
          const data = JSON.parse(txt);
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
            restaurantBuildingNumber: data.restaurantBuildingNumber,
            restaurantCity: data.restaurantCity,
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
          const opportunity = {
            sniadanie: data.śniadanie,
            lunch: data.lunch,
            randka: data.randka,
            pub: data.pub
          };
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
          db.collection("eatingPlaces")
            .add({
              info,
              dishes,
              kitchen,
              opportunity,
              facilities
            })
            .then(async idPlace => {
              const avatar = req.files.photo[0];
              const header = req.files.photo[1];
              const menu = req.files.photo[2];

              const uploadAvatar = await uploadImg(
                avatar,
                "avatar.jpg",
                info.owner,
                idPlace.id
              );
              const uploadHeader = await uploadImg(
                header,
                "header.jpg",
                info.owner,
                idPlace.id
              );
              const uploadMenu = await uploadImg(
                menu,
                "menu.jpg",
                info.owner,
                idPlace.id
              );

              if (
                uploadAvatar === true &&
                uploadHeader === true &&
                uploadMenu === true
              ) {
                res.json({
                  addedEatingPlace: true
                });
              } else {
                let uploadFail = {
                  avatarFail: false,
                  headerFail: false,
                  menuFail: false
                };
                if (uploadAvatar === false) {
                  uploadFail.avatarFail = true;
                }
                if (uploadHeader === false) {
                  uploadFail.headerFail = true;
                }
                if (uploadMenu === false) {
                  uploadFail.menuFail = true;
                }

                db.collection("eatingPlaces")
                  .doc(idPlace.id)
                  .delete()
                  .then(async () => {
                    await deleteImg("avatar.jpg", info.owner, idPlace.id);
                    await deleteImg("header.jpg", info.owner, idPlace.id);
                    await deleteImg("menu.jpg", info.owner, idPlace.id);

                    res.json({
                      notAddedNewPlace: uploadFail
                    });
                  });
              }
            })
            .catch(err => {
              console.log("no added in catch before res", err);
              res.json({
                addedEatingPlace: false
              });
            });


        } catch (error) {
          res.json({
            error: "Error redis"
          });
        }
      });
    } else {
      res.json({
        invalidFormatFile: unavailable
      });
    }
  }
});
module.exports = router;
