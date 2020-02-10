const express = require("express");
const router = express.Router();
const { db, admin, auth } = require("../../config/firebaseConfig");

router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { clientCode } = req.query;
  db.collection("codes")
    .where("code", "==", clientCode)
    .get()
    .then(docs => {
      if (docs.size == 1) {
        res.json({
          isVerified: "true"
        });
      } else {
        res.json({ isVerified: "false" });
      }
    })
    .catch(err => {
      console.log(err);
    });
});
module.exports = router;
