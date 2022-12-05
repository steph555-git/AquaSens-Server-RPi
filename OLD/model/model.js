const { date } = require('joi')
const mongoose = require('mongoose')
const muv = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    email: {type : String, required : true, unique : true},
    password: {type: String, required: true},
    date: {type: String, default : formatDate(new Date())}  
     
})

mongoose.plugin(muv)


module.exports = mongoose.model('user', userSchema)


function padTo2Digits(num) {
    return num.toString().padStart(2, '0')
}
  
function formatDate(date) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/')
}

  // formatDate(new Date())