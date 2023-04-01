const initDbConnection = require('./db/db')
const getTempAPI = require('./mw/getDataSensorsForDB')

const db = new initDbConnection()

const getQueryFullName = async () => {
    try {
        const dataTemp = await getTempAPI()
        const captationCollection = db.db.collection('captations')
        await captationCollection.insertOne(dataTemp)
    }
    catch (e) {
        console.log(e)
    }
}

getQueryFullName()
