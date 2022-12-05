const express = require('express')

const bodyParser = require('body-parser')
//const ejs = require('ejs')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const session = require('express-session')
const passport = require('passport')
const passportLocalMongoose = require('passport-local-mongoose')

const methodOverride = require('method-override')
const flash = require('connect-flash')
//Gestion model de données
const User = require("./models/user")

const app = express()

app.use(session({
    secret: "mysecret",
    resave: false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())



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





//Mise en place des routes
app.get("/",(req,res) => {
    res.sendFile(__dirname + "/Dashio/login.html")
})
app.get("/register.html", (req,res) =>{
    res.sendFile(__dirname + "/Dashio/register.html")
})


app.post("/register.html", (req,res) =>{
    
    const newUser = new User({
        username: req.body.username
    })
    console.log(req.body.username)
    console.log(newUser)

    User.register(newUser, req.body.password, (err,user) =>{
        if(err){
            console.log(err)
            
        } else {
            passport.authenticate("local")(req,res, () => {
                res.sendFile("/")
            })
        }
    })
    })
     

app.post("/", (req,res) =>{
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })

    req.login(user, (err) =>{
        if(err){
            console.log(err)
        } else {
            passport.authenticate("local")(req,res,() => {
                console.log("Utilisateur [" + req.body.username + "] authentifié")
                res.sendFile(__dirname + "/Dashio/dashboard.html")
                
            })
        }
    })
})
//app.get("/dashboard", (req, res)=>{
//    res.render("dashboard")
//})

app.get("/logout", (req,res,next) =>{
    req.logout(function(err) {
        if (err) { 
          return next(err); 
          }
        res.redirect('/login');
      });
})

app.listen(3000, (req,res) => {
    console.log("Connexion au serveur sur le port 3000 : OK")
})
