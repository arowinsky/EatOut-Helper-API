const express = require("express");
const router = express.Router();
const { db, admin, auth } = require("../../config/firebaseConfig");
router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const { mode, oobCode } = req.query;

  auth
    .applyActionCode(oobCode)
    .then(resp => {

      res.json({
        status: true
      });
    })
    .catch(err => {
      console.log("error", err);
      res.json({ status: false });
    });
});
module.exports = router;
