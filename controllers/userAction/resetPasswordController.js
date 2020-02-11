const express = require("express");
const router = express.Router();
const { db, admin, auth } = require("../../config/firebaseConfig");
router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { oobCode, newPassword } = req.body;
  auth
    .verifyPasswordResetCode(oobCode)
    .then(email => {
      auth
        .confirmPasswordReset(oobCode, newPassword)
        .then(resp => {
          res.json({ resetPassword: true });
        })
        .catch(err => {
          console.log(err);
          res.json({ resetPassword: false });
        });
    })
    .catch(error => {
      console.log(error);
      res.json({ resetPassword: false });
    });
});
module.exports = router;
