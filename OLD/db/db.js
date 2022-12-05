const {connect} = require('mongoose')

function dbConnexion (){

    connect("mongodb+srv://AquaUser:YaelSteph5@aquasensdb.valwi.mongodb.net/AquaSensDB?retryWrites=true&w=majority")
        .then(() => console.log("Connexion DB : OK"))
        .catch (error => console.log(error))
}

module.exports = dbConnexion

