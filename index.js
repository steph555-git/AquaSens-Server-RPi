const express = require ('express')

const routes = require('./Routes/routes')
require('./middlewares/auth')

const app = express()

app.use(express.json())
app.use(routes)
app.listen (8080, () => console.log("Je tourne sur 8080"))

const db = require('./db/db')

db();
