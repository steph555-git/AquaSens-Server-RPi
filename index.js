const express = require('express')
const app = express()
app.use(express.json())

const mongoose = require('mongoose')

// Importation des routes
const userRoutes = require('./routes/user')
const sensorsRoutes = require('./routes/sensor')

// Variables d'environnement
const dotenv = require('dotenv'); dotenv.config()
const passovh = process.env.PASSWORD_MAILOVH
const passMongodb = process.env.MONGODBPASS

//Gestion de l'acces à PUBLIC folder
app.use(express.static("Dashio"))

//Initialisation connexion mongoDB via mongoose
mongoose.connect("mongodb+srv://AquaUser:" + passMongodb + "@aquasensdb.valwi.mongodb.net/AquaSensDB?retryWrites=true&w=majority")
    .then(() => console.log("Connexion à la base de donnée : OK"))
    .catch(() => console.log("ERREUR : Probleme de connexion à la BDD"))



//Declaration des routes
app.use('/auth', userRoutes)
app.use('/api/sensors', sensorsRoutes)


app.listen(3000, console.log("Connexion au serveur sur le port 3000 : OK"))

module.exports = app
