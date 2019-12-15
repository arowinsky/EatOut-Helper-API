const express = require("express");
const router = express.Router();
const redis = require("redis");
const redisClient = redis.createClient();

router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const id = req.body.z;

  if (id === null || id === "undefined") {
    res.json({
      userLogOuted: false
    });
  } else {
    redisClient.DEL("sess:" + id);

    res.json({
      userLogOuted: true
    });
  }
});

module.exports = router;
