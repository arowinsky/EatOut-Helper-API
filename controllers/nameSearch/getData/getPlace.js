const { db, admin, auth } = require("../../../config/firebaseConfig");

const place = (NamePlaces) => new Promise((resolve, reject) => {
  let length = NamePlaces.length;
  db.collection("eatingPlaces")
    .get()
    .then(async (places) => {
      if (places.empty) {
        resolve('empty places')
      } else {

        const Places = places.docs.map(doc => {
          if (doc.data().info.restaurantName.substring(0, length) == NamePlaces) {
            console.log(length)
            const {
              dishes,
              info,
              kitchen,
              opportunity,
              facilities
            } = doc.data();
            // let searchingNamePlace = info.restaurantName.substring(0, length);


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
        })
        const newArray = Places.filter(checFunction)
        //   console.log(newArray)
        resolve(newArray)
      }
    })
    .catch(err => {
      reject(err)
    })





})


const checFunction = (value) => {

  return value != null
}

module.exports = place
