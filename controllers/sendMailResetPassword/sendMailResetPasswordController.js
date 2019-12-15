const express = require("express");
const router = express.Router();
const axios = require("axios");
router.post("/", (req, res) => {
  console.log(req.body.email);
  res.setHeader("Access-Control-Allow-Origin", "*");
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
      res.json({ mailSent: true });
    })
    .catch(err => {
      console.log("Not sent", err.response.data.error);
      res.status(201);
      res.json({ mailSent: false });
    });
});
module.exports = router;
