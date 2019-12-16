const express = require("express");
const router = express.Router();
const { db, admin, auth } = require("../../config/firebaseConfig");
router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const map = null;
  const name = req.query.name.charAt(0).toUpperCase() + req.query.name.slice(1);
  console.log(name);
  db.collection("eatingPlaces")
    .where("info.restaurantName", "==", name)
    .get()
    .then(query => {
      if (query.empty) {
        console.log("No matching documents.");
        return;
      }
      const array = query.docs.map(doc => {
        const values = { id: doc.id, ...doc.data() };

        return values;
      });
      res.json({ searchedData: array });
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
});

module.exports = router;
