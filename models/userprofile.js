const mongoose = require('mongoose')


const userProfileSchema = new mongoose.Schema({
        dateEntree: Date,
        name: String,
        firstname: String,
        adress: String,
        poBox:Number,
        city: String,
        country: String,
        phone: Number,
        email: String,
        descriptionUserProfile: String
})

module.exports = mongoose.model("UserProfile", userProfileSchema)
