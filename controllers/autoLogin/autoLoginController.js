const express = require("express");
const router = express.Router();
const redis = require("redis");
const redisClient = redis.createClient();

router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const id = req.body.sid;
  const reSend = req.body.pleaseReSend;
  console.log(req.body);
  if (id != "null") {
    if (id != "undefined" && reSend) {
      const key = "sess:" + id;
      redisClient.get(key, (err, date) => {
        try {
          const dates = JSON.parse(date);
          const userData = dates.userData;
          if (err === null) {
            console.log("Resend" + userData);
            res.json({
              rule: dates.rule,
              userInfo: userData,
              userId: dates.localId
            });
          }
          if (err != null) {
            console.log("error");
            res.json({
              session: "TimeOut"
            });
          }
        } catch (e) {
          console.log("bład");
          res.json({
            session: "wrong_Z"
          });
        }
      });
    } else {
      res.json({
        session: "TimeOut"
      });
    }
  } else {
    console.log("lack of sid");
    res.json({
      session: "TimeOut"
    });
  }
});
module.exports = router;
