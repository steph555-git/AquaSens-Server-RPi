require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const { AQUASENSDB_USER, AQUASENSDB_PASSWORD } = process.env

class initDbConnection {
    constructor() {
        const uri = `mongodb+srv://${AQUASENSDB_USER}:${AQUASENSDB_PASSWORD}@aquasensdb.valwi.mongodb.net/AquaSensDB?retryWrites=true&w=majority`
        const dbName = 'AquaSensDB'
        const maxAttempts = 3
        let attemptCount = 0

        if (!initDbConnection.instance) {
            initDbConnection.instance = this
        }
        while (attemptCount < maxAttempts) {
            try {
                this.dbClient = new MongoClient(uri)
                this.dbClient.connect()
                this.db = this.dbClient.db(dbName)
                break
            } catch (error) {
                console.log(error)
                attemptCount++
                new Promise(resolve => setTimeout(resolve, 2000))
            }
        }
        return initDbConnection.instance
    }
}

module.exports = initDbConnection