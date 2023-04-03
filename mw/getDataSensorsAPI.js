const ds18b20 = require('ds18b20')

const getSensorsList = () => {
    try {
        return new Promise((resolve, reject) => {
            ds18b20.sensors((err, ids) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(ids)
                }
            })
        })
    }
    catch (error) {
        console.log(error)
    }
}

const getDataSensorsAPI = async (req, res) => {
    try {
        const listDs18b20Sensors = await getSensorsList()

        let sensorsList = listDs18b20Sensors.map((id, i) => {
            return {
                "id": id,
                "name": "capteur " + i,
                "temperature": ds18b20.temperatureSync(id)
            }
        })
        res.status(200).send(sensorsList)
        console.log('API Called - data sent')
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

}

module.exports = getDataSensorsAPI
