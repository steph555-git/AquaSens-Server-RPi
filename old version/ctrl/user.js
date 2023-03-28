
const express = require('express')
const app = express()
app.use(express.json())

const passport = require('passport')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const randToken = require('rand-token')
const nodeMailer = require('nodemailer')
const ejs = require('ejs')

const dotenv = require('dotenv'); dotenv.config()
const passovh = process.env.PASSWORD_MAILOVH
const passMongodb = process.env.MONGODBPASS

//Initialisation connexion mongoDB via mongoose
//mongoose.connect("mongodb+srv://AquaUser:" + passMongodb + "@aquasensdb.valwi.mongodb.net/AquaSensDB?retryWrites=true&w=majority")
//    .then(() => console.log("Connexion à la base de donnée : OK"))
//    .catch(() => console.log("ERREUR : Probleme de connexion à la BDD"))

//Gestion model de données
const User = require("../models/user")
const Reset = require("../models/reset")

//Passport
app.use(passport.initialize())
app.use(passport.session())

//Initialisation de EJS 
app.set("view engine", "ejs")


exports.getRegister = (req, res, next) => {
    res.sendFile(__dirname + "/Dashio/register.html")
}
exports.postRegister = (req, res, next) => {

    const newUser = new User({
        username: req.body.username
    })
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            let date1 = new Date()
            let heures = date1.getHours()
            let minutes = date1.getMinutes()
            console.log("L'email existe déja. Merci d'en choisir un different :  il est " + heures + "h" + minutes)
            console.log(err)
            res.sendFile(__dirname + "/Dashio/register.html")

        } else {
            passport.authenticate("local")(req, res, () => {
                console.log("Utilisateur [" + req.body.username + "] créé avec succes")
                res.sendFile(__dirname + "/Dashio/login.html")
            })
        }
    })
}

exports.getLogin = (req, res, next) => {
    res.sendFile(__dirname + "/Dashio/login.html")
}
exports.postLogin = (req, res, next) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })

    req.login(user, (err) => {
        if (err) {
            res.status(401).send({ error: 'Probleme dauthorisation' })
            //console.log(err)
            console.log("Probleme d'authorisation")  //pourquoi ce console.g ne s'affiche pas ??
            //req.flash("error", "email ou mot de passe incorrect")
            //res.sendFile(__dirname + "/Dashio/login.html")
        } else {
            passport.authenticate("local")(req, res, () => {
                console.log("Utilisateur [" + req.body.username + "] authentifié")
                req.flash("success", "Connexion OK " + req.body.username)
                res.sendFile(__dirname + "/Dashio/index.html")
            })
        }
    })
}

exports.getLogout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err)
        }
        req.flash("success", "Merci, tu es à present deconnecté")
        res.sendFile(__dirname + "/Dashio/login.html")
        console.log("deconnection de l'utilisateur")
    })
}

// --------------- FORGOT PASSWORD ---------------
exports.postForgot = (req, res, next) => {
    User.findOne({ username: req.body.username }, (err, userFound) => {
        if (err) {
            console.log(err)
            res.sendFile(__dirname + "/Dashio/login.html")
        } else {
            const token = randToken.generate(64)
            Reset.create({
                username: userFound.username,
                resetPasswordToken: token,
                resetPasswordExpires: Date.now() + 3600000
            })
            const transporter = nodeMailer.createTransport({
                host: "ssl0.ovh.net",
                port: 465,
                secure: true,
                auth: {
                    user: 'horlogerie@alabonneheure.fr',
                    pass: passovh
                },
                tls: {
                    rejectUnauthorized: false,
                },
            })

            const mailOptions = {
                from: 'horlogerie@alabonneheure.fr',
                to: req.body.username,
                subject: "Reinitialisation de votre mot de passe AquaSens",
                text: 'Cliquez sur le lien ci-dessous pour reinitialiser votre mot de passe : http://127.0.0.1:3000/reset/' + token
            }
            console.log('le mail est pret à etre envoyé')
            transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Mail de RESET de mot de passe envoyé")
                    res.sendFile(__dirname + "/Dashio/login.html")
                }
            })
        }
    })
}

// ------------------ RESET PASSWORD --------------
exports.getResetPassword = (req, res, next) => {
    Reset.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
    }, (err, obj) => {
        if (err) {
            console.log("token expiré")
            res.sendFile(__dirname + "/Dashio/login.html")
        } else {
            res.render('reset', { token: req.params.token })
        }
    })
}
exports.postResetPassword = (req, res, next) => {
    Reset.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
    }, (err, obj) => {
        if (err) {
            console.log("token expiré")
            res.redirect("../login.html")
        } else {
            if (req.body.password == req.body.password2) {
                User.findOne({ username: obj.username }, (err, user) => {
                    if (err) {
                        console.log(err)
                        console.log("Les mots de passe ne sont pas identiques")
                    } else {
                        console.log("Utilisateur trouvé!  Pret pour reinitialisé le MDP")
                        user.setPassword(req.body.password, (err) => {
                            user.save()
                            console.log("MDP reinitalisé")
                            const updatedReset = {
                                resetPasswordToken: null,
                                resetPasswordExpires: null
                            }
                            Reset.findOneAndUpdate({ resetPasswordToken: req.params.token }, updatedReset, (err, obj1) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    res.redirect("../login.html")
                                }
                            })

                        })
                    }
                })
            }
        }
    })
}