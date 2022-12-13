const mongoose = require('mongoose')
const passportLocalStrategy = require('passport-local-mongoose')

const installationSchema = new mongoose.Schema({
    longueurBassin: Number,
    largeurBassin: Number,
    profondeurBassin: Number,
    longueurFiltre: Number,
    largeurFiltre: Number,
    profondeurFiltre: Number,
    pompeEau: String,
    filtre: String,
    pompeAir: String,
    userId: String
})

module.exports = mongoose.model("installation", installationSchema)
