exports.sessionLogin = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log(req.cookie);
  res.json({ data: "sended" });
};
