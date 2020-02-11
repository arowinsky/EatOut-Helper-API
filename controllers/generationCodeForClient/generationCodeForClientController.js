const express = require("express");
const router = express.Router();
const { db, admin, auth } = require("../../config/firebaseConfig");
const randomstring = require("randomstring");

router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { eatingPlaceId } = req.body;

  const newCode = () => {
    const codei = randomstring.generate({
      length: 7,
      capitalization: "lowercase"
    });

    db.collection("codes")
      .where("code", "==", codei)
      .get()
      .then(docs => {
        if (docs.size >= 1) {
          newCode();
        } else {
          db.collection("codes")
            .doc()
            .set({
              code: codei,
              eatingPlaceId: eatingPlaceId
            })
            .then(() => {
              res.json({
                code: codei
              });
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  newCode();
});
module.exports = router;
