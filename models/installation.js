const mongoose = require('mongoose')
const passportLocalStrategy = require('passport-local-mongoose')

const installationSchema = new mongoose.Schema({
    tailleBassin: {
        longueurBassin: Number,
        largeurBassin: Number,
        profondeurBassin: Number
    },
    filtrationBio: {
        longueurFiltre: Number,
        largeurFiltre: Number,
        profondeurFiltre: Number
    },
    Materiel: {
        pompeEau: String,
        filtre: String,
        pompeAir: String
    }
})

module.exports = mongoose.model("Installation", installationSchema)
