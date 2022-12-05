const express = require ('express')
const db = require('./db/db')
const routes = require('./routes/routes')
const bodyParser = require('body-parser')
require('./middlewares/auth')

const app = express()

app.use(express.json())
//Gestion de l'acces à PUBLIC folder
app.use(express.static("Dashio"))




//Initialisation Body-Parser
app.use(bodyParser.urlencoded({extended:false}))

db()


app.use(routes)

app.listen (3000, () => console.log("Connexion au serveur sur le port 3000 : OK"))