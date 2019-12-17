const app = require("./app");
const test = require('./controllers/serchPlacesForRedis/SerchPlacesForRedisController');
app.set("port", process.env.PORT || 8080);

const server = app.listen(app.get("port"), () => {
 test()
  console.log(`Listen ${server.address().port}`);
});
