const mongoose = require('mongoose')
const muv = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    email: {type : String, required : true, unique : true},
    password: {type: String, required: true},
    date: {type: Date, default : Date.now}  
     
})

mongoose.plugin(muv)


module.exports = mongoose.model('user', userSchema)
