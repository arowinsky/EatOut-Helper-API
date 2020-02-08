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
const addPosts = require("./controllers/addPostOwner/addPostOwnerController");
const generationCodeForClient = require("./controllers/generationCodeForClient/generationCodeForClientController");
const verificationClientCode = require("./controllers/verificationClientCode/verificationClientCodeController");
const addClientOpinion = require("./controllers/addClientOpinion/addClientOpinionController");
const upload = require("./controllers/uploadImages/uploadImagesController");
const resetPassword = require("./controllers/userAction/resetPasswordController");
const nameSearch = require("./controllers/nameSearch/nameSearchController");
const deleteOwnerAccount = require("./controllers/deleteOwnerAccount/deleteOnwerAccountController");
const getDataPlaceSingle = require("./controllers/getDataPlaceSingle/getDataPlaceSingleController");
const loginSocialMedia = require("./controllers/loginFbAndGooleController/loginFbAndGoogleController");
const getUserData = require("./controllers/getUserData/getUserDataController");
const deleteClientAccount = require("./controllers/deleteClientAccount/deleteClientAccountController");
const updateFirebaseUserData = require("./controllers/updateUserData/updateUserData");
const updateDataLogin = require("./controllers/updateUserData/updateEmailAndPasswordUser");
const removeSinglePlace = require("./controllers/removeSinglePlace/removeSingePlaceController");
const removeAllPlaceOwner = require("./controllers/removeAllPlaceOwner/removeAllPlaceOwnerController");
const addFollow = require("./controllers/followPlaces/addToFollowController");
const removeFollow = require("./controllers/followPlaces/removeFromFollowController");
const getFollowingPlaces = require("./controllers/getFollowingPlaces/getFollowingPlaces");
const checkFollowingPlaces = require("./controllers/checkFollowingPlaces/checkFollowingPlacesController");
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
app.use("/add-owner-post", addPosts);
app.use("/generation-code-for-client", generationCodeForClient);
app.use("/verification-client-code", verificationClientCode);
app.use("/add-client-opinion", addClientOpinion);
app.use("/verification-email", verificationEmail);
app.use("/reset-password", resetPassword);
app.use("/name-search", nameSearch);
app.use("/delete-owner-account", deleteOwnerAccount);
app.use("/get-data-place-single", getDataPlaceSingle);
app.use("/login-social-media", loginSocialMedia);
app.use("/get-user-data", getUserData);
app.use("/delete-client-account", deleteClientAccount);
app.use("/update-firebase-user-data", updateFirebaseUserData);
app.use("/update-login-user-data", updateDataLogin);
app.use("/remove-single-place", removeSinglePlace);
app.use("/remove-all-place-owner", removeAllPlaceOwner);
app.use("/add-follow", addFollow);
app.use("/remove-follow", removeFollow);
app.use("/get-following-places", getFollowingPlaces);
app.use("/check-following-places", checkFollowingPlaces);
module.exports = app;
