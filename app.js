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

const methodOverride = require('method-override')
const flash = require('connect-flash')
//initialisation de flash
app.use(flash())

//Gestion model de données
const User = require("./models/user")
const Reset = require("./models/reset")

//Gestion de toutes les routes (Non authentification)
const routes = require('./routes/routes')
app.use(routes)


// Gestion des sessions
app.use(session({
    secret: "mysecret",
    resave: false,
    saveUninitialized:false
}))
//Passport
app.use(passport.initialize())
app.use(passport.session())

//Initialisation de EJS 
app.set("view engine", "ejs")

//Gestion de l'acces à PUBLIC folder
app.use(express.static("Dashio"))

//Initialisation Body-Parser
app.use(bodyParser.urlencoded({extended:false}))

//Initialisation connexion mongoDB via mongoose
mongoose.connect("mongodb+srv://AquaUser:YaelSteph5@aquasensdb.valwi.mongodb.net/AquaSensDB?retryWrites=true&w=majority")
    .then (()=> {
        console.log("Connexion à la base de donnée : OK")
    })
    .catch (()=> {
        console.log("ERREUR : Probleme de connexion à la BDD")
    })
// Initiliser la strategie - PASSPORT LOCAL MONGOOSE
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

//declaration de flash
app.use((req, res, next)=> {
    res.locals.currentUser = req.user
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
  next()  
})


//---------------------- LES ROUTES  -------------------
app.get("/",(req,res) => {
    res.sendFile(__dirname + "/Dashio/login.html")
})

app.post("/", (req,res) =>{
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })
 
    req.login(user, (err) =>{
        if(err){
            res.status(401).send({ error: 'Probleme dauthorisation' })
            //console.log(err)
            //console.log("Probleme d'authorisation")  //pourquoi ce console.g ne s'affiche pas ??
            //req.flash("error", "email ou mot de passe incorrect")
            //res.sendFile(__dirname + "/Dashio/login.html")
        } else {
            passport.authenticate("local")(req,res,() => {
                console.log("Utilisateur [" + req.body.username + "] authentifié")
                req.flash("success", "Connexion OK "+ req.body.username)
                res.sendFile(__dirname + "/Dashio/dashboard.html")
                
            })
        }
    })
})
   
app.get("/register", (req,res) =>{
    res.sendFile(__dirname + "/Dashio/register.html")
})


app.post("/register.html", (req,res) =>{
    
    const newUser = new User({
        username: req.body.username
    })
    User.register(newUser, req.body.password, (err,user) =>{
        if(err){
            let date1 = new Date()
            let heures = date1.getHours()
            let minutes = date1.getMinutes()
            console.log("L'email existe déja. Merci d'en choisir un different :  il est "+ heures+"h"+minutes)
            //console.log(err)
            res.sendFile(__dirname + "/Dashio/register.html")
            
        } else {
            passport.authenticate("local")(req,res, () => {
                console.log("Utilisateur ["+req.body.username+"] créé avec succes")
                res.sendFile(__dirname + "/Dashio/login.html")
            })
        }
    })
})

app.get("/dashboard", isLoggedIn, (req, res)=>{
    res.sendFile(__dirname + "/Dashio/dashboard.html")
})

app.get("/logout", (req,res,next) =>{
    req.logout(function(err) {
        if (err) { 
          return next(err)
          }
          req.flash("success","Merci, tu es à present deconnecté")
          res.sendFile(__dirname + "/Dashio/login.html")
        console.log("deconnection de l'utilisateur")
      });
})

// --------------- MDP OUBLIÉ ---------------
app.post("/forgot.html", (req,res)=>{
    User.findOne({username : req.body.username}, (err,userFound) => {
        if(err){
            console.log(err)
            res.sendFile(__dirname + "/Dashio/login.html")
        }else{
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
                    user:'horlogerie@alabonneheure.fr',
                    pass: 'AdamTali5'},
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
            transporter.sendMail(mailOptions, (err,response) =>{
                if(err){
                    console.log(err)
                } else {
                    console.log("Mail de RESET de mot de passe envoyé")
                    res.sendFile(__dirname + "/Dashio/login.html")
                }
            })
        }
    })
})

app.get('/reset/:token', (req,res) => {
    Reset.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {$gt: Date.now()}
    }, (err,obj) =>{
        if (err){
            console.log("token expiré")
            res.sendFile(__dirname + "/Dashio/login.html")
        } else {
            res.render('reset', {token: req.params.token})
        }
    })
})

app.post('/reset/:token', (req,res) =>{
    Reset.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {$gt: Date.now()}
    }, (err,obj) => {
        if (err){
            console.log("token expiré")
            res.redirect("../login.html")
        } else {
           if(req.body.password == req.body.password2) {
            User.findOne({username: obj.username}, (err,user) => {
                if(err){
                    console.log(err)
                    console.log("Les mots de passe ne sont pas identiques")
                } else {
                    console.log("Utilisateur trouvé!  Pret pour reinitialisé le MDP")
                    user.setPassword(req.body.password,(err) => {
                            user.save()
                            console.log("MDP reinitalisé")
                            const updatedReset =  {
                                resetPasswordToken: null,
                                resetPasswordExpires: null
                            }
                            Reset.findOneAndUpdate({resetPasswordToken: req.params.token}, updatedReset, (err,obj1) => {
                                if(err){
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
})




function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }else{
        req.flash("error", "Espace protegé, merci de vous authentifier")
        res.sendFile(__dirname + "/Dashio/login.html")
    }
}


app.listen(3000, (req,res) => {
    console.log("Connexion au serveur sur le port 3000 : OK")
})