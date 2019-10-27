const express = require("express");
const router = express.Router();
const axios = require("axios");
router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  axios({
    method: "POST",
    requestType: "PASSWORD_RESET",
    url:
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAaJRfgtMU3LqvV07NyiaGfqUj_XGpkoNo",
    data: {
      requestType: "PASSWORD_RESET",
      email: req.body.email
    }
  })
    .then(response => {
      console.log("Sent");
      res.json({ resetedPassword: true });
    })
    .catch(err => {
      console.log("Not sent", err.response.data.error);
      res.status(201);
      res.json({ resetedPassword: false });
    });
});
module.exports = router;
