const util = require('util')
const cloud = require('@google-cloud/storage');
const keys = require('./GoogleCloud.json')
const {Storage} = cloud;
const storage = new Storage(keys);
const bucket = storage.bucket('eatout');

const {format} = util;


const uploudImage = (file, name, idUser, idPlace) =>new Promise((resolve , reject) =>{
    const {buffer}= file

    console.log('funkcja', buffer)

const blob = bucket.file(`${idUser}/${idPlace}/${name}`)
const blobStream = blob.createWriteStream({
    resumble: false
})


blobStream.on('finish', ()=>{
    const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    )
    resolve(publicUrl)
})
.on('error', (error)=>{
    console.log(error)
    reject(`cos poszło nie tak`)
})
.end(buffer)
})

module.exports = uploudImage