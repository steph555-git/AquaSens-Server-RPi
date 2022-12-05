const mongoose = require('mongoose')
const passportLocalStrategy = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    password: String
   
})

userSchema.plugin(passportLocalStrategy)

module.exports = mongoose.model("User", userSchema)



//function padTo2Digits(num) {
//    return num.toString().padStart(2, '0')
//}
//  
//function formatDate(date) {
//    return [
//      padTo2Digits(date.getDate()),
//      padTo2Digits(date.getMonth() + 1),
//      date.getFullYear(),
//    ].join('/')
//}

  // formatDate(new Date())