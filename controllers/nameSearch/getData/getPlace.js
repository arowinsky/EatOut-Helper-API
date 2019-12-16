const { db, admin, auth } = require("../../../config/firebaseConfig");

const place = (NamePlaces) => new Promise((resolve, reject) => {
  db.collection("eatingPlaces")
    .where("info.restaurantName", "==", NamePlaces)
    .get()
    .then(async (places) => {
      if (places.empty) {
        resolve('empty places')
      } else {
        const Places = await places.docs.map(doc => {
          const {
            dishes,
            info,
            kitchen,
            opportunity,
            facilities
          } = doc.data();

          const id = doc.id;
          const avatar = `https://storage.cloud.google.com/eatout/${info.owner}/${id}/avatar.jpg`;
          const header = `https://storage.cloud.google.com/eatout/${info.owner}/${id}/header.jpg`;
          const menu = `https://storage.cloud.google.com/eatout/${info.owner}/${id}/menu.jpg`;

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

          };
          return array;
        }
        )
        resolve(Places)
      }
    })
    .catch(err => {
      reject(err)
    })





})

module.exports = place
