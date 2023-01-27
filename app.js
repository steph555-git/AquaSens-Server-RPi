const http = require('http')
const express = require('express')
const app = express()
app.use(express.json())

const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const randToken = require('rand-token')
const nodeMailer = require('nodemailer')

const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')

const dotenv = require('dotenv'); dotenv.config()
const passovh = process.env.PASSWORD_MAILOVH
const passMongodb = process.env.MONGODBPASS

const methodOverride = require('method-override')
const flash = require('connect-flash')
//initialisation de flash
app.use(flash())

//Gestion model de données
const User = require("./models/user")
const Reset = require("./models/reset")
const Installation = require("./models/installation")
const UserProfil = require("./models/userprofile")

//Gestion de toutes les routes (Non authentification)
const routes = require('./routes/routes')
//app.use(routes)
// Lien vers liste des capteurs
const getSensorsList = require('../html/js/callSensors')

// Gestion des sessions
app.use(session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false
}))
//Passport
app.use(passport.initialize())
app.use(passport.session())

//Initialisation de EJS 
app.set("view engine", "ejs")

//Gestion de l'acces à PUBLIC folder
app.use(express.static("Dashio"))

//Initialisation Body-Parser
app.use(bodyParser.urlencoded({ extended: false }))

//Initialisation connexion mongoDB via mongoose
mongoose.connect("mongodb+srv://AquaUser:" + passMongodb + "@aquasensdb.valwi.mongodb.net/AquaSensDB?retryWrites=true&w=majority")
    .then(() => console.log("Connexion à la base de donnée : OK"))
    .catch(() => console.log("ERREUR : Probleme de connexion à la BDD"))


// Initiliser la strategie - PASSPORT LOCAL MONGOOSE
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//declaration de flash
app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next()
})


//---------------------- LES ROUTES  -------------------
app.get("/",)

app.post("/",)

app.get("/register",)


app.post("/register.html",)

app.get("/dashboard", isLoggedIn, (req, res) => {
    res.sendFile(__dirname + "/Dashio/dashboard.html")
})

app.get("/logout",)

// --------------- MDP OUBLIÉ ---------------
app.post("/forgot.html",)

app.get('/reset/:token',)

app.post('/reset/:token',)

//app.route("/api/sensors")
//    .get((req, res) => {
//        (async () => {
//            //date format DD/MM/YY
//            //formatDate(new Date())
//            const resp = await getSensorsList()
//            console.log("Sensors List :: ", resp);
//            res.send(resp)
//        })()
//
//    })
app.route("/api/install")
    .post((req, res) => {
        const newInstallation = new Installation({
            tailleBassin: {
                longueurBassin: req.body.longueurBassin,
                largeurBassin: req.body.largeurBassin,
                profondeurBassin: req.body.profondeurBassin
            },
            filtrationBio: {
                longueurFiltre: req.body.longueurFiltre,
                largeurFiltre: req.body.largeurFiltre,
                profondeurFiltre: req.body.profondeurFiltre
            },
            Materiel: {
                pompeEau: req.body.pompeEau,
                filtre: req.body.filtre,
                pompeAir: req.body.pompeAir
            }
        })
        newInstallation.save((err) => {
            if (err) {
                console.log("Probleme lors de l'enregistrement de l'installation")
                console.log(err)
            } else {
                console.log("Installation sauvgardée avec succès")
                res.redirect("../profile.html")

            }

        })

    })
app.route("/api/userprofil")
    .post((req, res) => {
        const newUserProfil = new UserProfil({
            dateEntree: req.body.dateEntree,
            name: req.body.name,
            firstname: req.body.firstname,
            adress: req.body.adress,
            poBox: req.body.poBox,
            city: req.body.city,
            country: req.body.country,
            phone: req.body.phone,
            email: req.body.email,
            descriptionUserProfile: req.body.descriptionUserProfile
        })
        newUserProfil.save((err) => {
            if (err) {
                console.log("Probleme lors de l'enregistrement du profil utilisateur")
                console.log(err)
            } else {
                console.log("Le profile utilisateur a été sauvgardé avec succès")
                res.redirect("../profile.html")

            }
        })
    })

//app.route("/profile.html")
//    .get((req, res) => {
//        //Verifier s'il y a un enregistement pour l'installation
//        //Verifier s'il y a un enregistrement pour le profil (nom, prenom, etc)
//    })

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        req.flash("error", "Espace protegé, merci de vous authentifier")
        res.sendFile(__dirname + "/Dashio/login.html")
    }
}


app.listen(3000, (req, res) => {
    console.log("Connexion au serveur sur le port 3000 : OK")
})

