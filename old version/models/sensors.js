const mongoose = require('mongoose')
const passportLocalStrategy = require('passport-local-mongoose')

const sensorsSchema = new mongoose.Schema({
    idSensors: String,
    date: String,
    name: String,
    description: String,
    userId: Number
})

module.exports = mongoose.model("sensorsList", sensorsSchema)
