const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  const id = req.body.sid;
  const reSend = req.body.pleaseReSend;
  console.log(req.body);
  if (id != "null") {
    store.get(id, (err, session) => {
      if (id != "undefined" && reSend) {
        console.log("Resend" + session.userData);
        res.json({
          userInfo: session.userData
        });
      }
      if (err) {
        console.log("error");
        res.json({
          session: "TimeOut"
        });
      }
    });
  } else {
    console.log("lack of sid");
    res.json({
      session: "TimeOut"
    });
  }
});
module.exports = router;
