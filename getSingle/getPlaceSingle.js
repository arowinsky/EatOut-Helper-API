const { db, admin } = require("../config/firebaseConfig");

const placeOnes = id =>
  new Promise((resolve, reject) => {
    db.collection("eatingPlaces")
      .doc(id)
      .get()
      .then(async place => {
        if (place.empty) {
          resolve("false");
        } else {
          Place = place.data();
          Place.id = id;
          //console.log(Place)
          const avatar = `https://storage.cloud.google.com/eatout/${
            place.data().info.owner
          }/${id}/avatar.jpg`;
          Place.avatar = avatar;
          const header = `https://storage.cloud.google.com/eatout/${
            place.data().info.owner
          }/${id}/header.jpg`;
          Place.header = header;
          const menu = `https://storage.cloud.google.com/eatout/${
            place.data().info.owner
          }/${id}/menu.jpg`;
          Place.menu = menu;
          resolve(Place);
        }
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });

module.exports = placeOnes;
