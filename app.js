const express = require("express");
const bodyParser = require("body-parser");
const cookieParse = require("cookie-parser");
const session = require("express-session");
const multer = require("multer");
const app = express();

const redis = require("redis");
const redisStore = require("connect-redis")(session);
const redisClient = redis.createClient();
const verificationEmail = require("./controllers/userAction/verificationEmailController");
const register = require("./controllers/register/registerController");
const send_mail_to_reset_password = require("./controllers/sendMailResetPassword/sendMailResetPasswordController");
const login = require("./controllers/emailLogin/emailLoginController");
const autoLogin = require("./controllers/autoLogin/autoLoginController");
const logOut = require("./controllers/logOut/logOutController");
const addNewEatingPlace = require("./controllers/addNewEatingPlace/addNewEatingPlaceController");
const getDataPlace = require("./controllers/getDataPlace/getDataPlaceController");
const deleteUser = require("./controllers/admin/adminController");
const addPosts = require("./controllers/addPostOwner/addPostOwnerController");
const generationCodeForClient = require("./controllers/generationCodeForClient/generationCodeForClientController");
const verificationClientCode = require("./controllers/verificationClientCode/verificationClientCodeController");
const addClientOpinion = require("./controllers/addClientOpinion/addClientOpinionController");
const upload = require("./controllers/uploadImages/uploadImagesController");
const resetPassword = require("./controllers/userAction/resetPasswordController");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParse());

redisClient.on("error", err => {
  console.log("Redis error: ", err);
});
app.use(
  session({
    secret: "mySessionCode",
    resave: false,
    store: new redisStore({
      host: "localhost",
      port: 6379,
      client: redisClient,
      ttl: 86400
    }),
    saveUninitialized: true,
    cookie: { secure: true }
  })
);

const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

// app.disable('x-powered-by')
app.use(
  multerMid.fields([
    { name: "photo", maxCount: 3 },
    { name: "places", maxCount: 1 },
    { name: "z", maxCount: 1 }
  ])
);
app.use("/upload-img", upload);
app.use("/register", register);
app.use("/send-mail-to-reset-password", send_mail_to_reset_password);
app.use("/loginEmail", login);
app.use("/autoLogin", autoLogin);
app.use("/logout", logOut);
app.use("/add-new-eating-place", addNewEatingPlace);
app.use("/get-data-place", getDataPlace);
app.use("/delete-user", deleteUser);
app.use("/add-owner-post", addPosts);
app.use("/generation-code-for-client", generationCodeForClient);
app.use("/verification-client-code", verificationClientCode);
app.use("/add-client-opinion", addClientOpinion);
app.use("/verification-email", verificationEmail);
app.use("/reset-password", resetPassword);
module.exports = app;
