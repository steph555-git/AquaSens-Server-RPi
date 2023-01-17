const express = require('express')
const router = express.Router()

// Require du paquet passport
const passport = require('passport')

const getSensorsList = require('../html/js/callSensors')

const Installation = require('../models/installation')


const bodyParser = require('body-parser')
const dotenv = require('dotenv'); dotenv.config()


router.use(Routers.json())
router.use(bodyParser.urlencoded({ extended: false }))

//Passport
router.use(passport.initialize())
router.use(passport.session())


router.route("/api/sensors")
    .get((req, res) => {
        (async () => {
            //date format DD/MM/YY
            //formatDate(new Date())
            const resp = await getSensorsList()
            console.log("Sensors List :: ", resp);
            res.send(resp)
        })()

    })


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        req.flash("error", "Espace protegé, merci de vous authentifier")
        res.sendFile(__dirname + "/Dashio/login.html")
    }
}

module.exports = router