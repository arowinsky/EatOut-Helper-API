
const { db, admin, auth } = require('../../config/firebaseConfig')
const veryEamil = (oobCode) => {

    auth.applyActionCode(oobCode).then(resp => {
        console.log('emailVerti')

        return ('email true')
    })
        .catch(err => { console.log("error") })
}

module.exports = veryEamil;