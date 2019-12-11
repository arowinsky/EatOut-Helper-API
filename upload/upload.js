const util = require("util");
const cloud = require("@google-cloud/storage");
const keys = require("./GoogleCloud.json");
const { Storage } = cloud;
const storage = new Storage(keys);
const bucket = storage.bucket("eatout");
// const Blob = require("blob");
// const { format } = util;

const uploadImage = (file, name, idUser, idPlace) =>
  new Promise((resolve, reject) => {
    const { buffer } = file;
    console.log("check");
    const blob = bucket.file(`${idUser}/${idPlace}/${name}`);
    const blobStream = blob.createWriteStream({
      resumble: false
    });
    blobStream
      .on("finish", () => {
        console.log("upload complete");
        resolve(true);
      })
      .on("error", error => {
        console.log(error);
        resolve(false);
      })
      .end(buffer);
  });
module.exports = uploadImage;
