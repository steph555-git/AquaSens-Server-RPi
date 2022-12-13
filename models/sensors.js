const mongoose = require('mongoose')
const passportLocalStrategy = require('passport-local-mongoose')

const sensorsSchema = new mongoose.Schema({
    name: String,
    description: String,
    idSensors: String,
    userId: Number
})

module.exports = mongoose.model("sensorsList", sensorsSchema)
