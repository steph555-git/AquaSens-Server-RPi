const Router = require('express')
const router = Router.Router()
const passport = require('passport')

const Installation = require('../models/installation')
const bodyParser = require('body-parser')
const dotenv = require('dotenv'); dotenv.config()

router.use(Router.json())
router.use(bodyParser.urlencoded({ extended: false }))

//Passport
router.use(passport.initialize())
router.use(passport.session())


//router.route("/api/sensors")
//    .get((req, res) => {
//        console.log("COUCOU")
//        res.send("access OK")
//    })

//console.log(installation)
//res.status(201).json({message : 'Installation enregistrée'})
//installation.save()
//    .then(() => res.status(201).json({message : 'Installation enregistrée'}))
//    .catch((error) => res.status(400).json({error}))

//router.get("/profile.html",isLoggedIn,(req,res) => {
//    console.log("test")
//})


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        req.flash("error", "Espace protegé, merci de vous authentifier")
        res.sendFile(__dirname + "/Dashio/login.html")
    }
}

module.exports = router