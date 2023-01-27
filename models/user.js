const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dateCrea: { type: String, required: true }

})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model("User", userSchema)



//function padTo2Digits(num) {

//  return num.toString().padStart(2, '0')
//}
//
//function formatDate(date) {

//  return [

//    padTo2Digits(date.getDate()),
//    padTo2Digits(date.getMonth() + 1),
//    date.getFullYear(),
//  ].join('/')
//}

// formatDate(new Date())
