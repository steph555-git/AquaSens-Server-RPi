const fs = require('fs')

const { MongoClient } = require("mongodb")

require('dotenv').config({ path: __dirname + '/.env' })
const { AQUASENSDB_USER, AQUASENSDB_PASSWORD } = process.env

const getTempAPI = require('./mw/getDataSensorsForDB')

const uri = `mongodb+srv://${AQUASENSDB_USER}:${AQUASENSDB_PASSWORD}@aquasensdb.valwi.mongodb.net/AquaSensDB?retryWrites=true&w=majority`
const dataTemperature = new MongoClient(uri)
const presentDate = () => {
    //Create date format DD-MM-YY HH:MM
    const fullDate = new Date()

    const day = fullDate.getDate().toString().padStart(2, '0')
    const month = (fullDate.getMonth() + 1).toString().padStart(2, '0')
    const year = fullDate.getFullYear().toString()
    const hour = fullDate.getHours().toString().padStart(2, '0')
    const minute = fullDate.getMinutes().toString().padStart(2, '0')

    return `${day}-${month}-${year} ${hour}:${minute}`
}

const getQueryFullName = async () => {
    try {
        const dataTemp = await getTempAPI()
        const database = dataTemperature.db("AquaSensDB");
        const captation = database.collection("captation")

        await captation.insertOne(dataTemp)
        fs.appendFile(__dirname + '/logs/log.txt', '\n' + presentDate() + ' Data temperature sent to database mongoDB', (err) => {
            if (err) throw err
        })
    }
    catch (e) {
        fs.appendFile(__dirname + '/logs/log.txt', '\n' + presentDate() + ' ' + e.message, (err) => {
            if (err) throw err
        })
        console.log('error')
    }
    finally {
        await dataTemperature.close()
    }
}

getQueryFullName()

